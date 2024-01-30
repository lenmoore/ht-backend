import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { generateAccessToken } from '../extras/middlewares/jwt/helpers/access-token.helper';
import { generateRefreshToken, verifyRefreshToken } from '../extras/middlewares/jwt/helpers/refresh-token.helper';
import {
    generateSessionToken,
    getSessionId,
    verifySessionToken,
} from '../extras/middlewares/jwt/helpers/session-token.helper';
import { compare, hash, resFailed, resSuccess } from '../extras/helpers';
import SessionService from '../services/session.service';
import UserService from '../services/user.service';
import { logger } from '../logger';
import { UserDocument } from '../mongo/models/user.model';

async function register(req: Request, res: Response): Promise<Response> {
    try {
        console.log(req.body);
        const { name, email, password } = req.body;
        const user: UserDocument | null = await UserService.getOneUser({ email });

        if (user) {
            const message = 'Email already registered';
            return resFailed(res, 400, message);
        }

        const hashPassword = await hash(password);
        const data = { name, email, password: hashPassword };
        const newUser: UserDocument = await UserService.createUser(data);
        const getNewUserWithoutPassword: UserDocument | null = await UserService.getOneUser({ email: newUser.email });

        const message = 'Register success';
        return resSuccess(res, 201, message, { user: getNewUserWithoutPassword });
    } catch (error: any) {
        logger.error(register.name, error.message);
        return resFailed(res, 500, error.message);
    }
}

async function login(req: Request, res: Response): Promise<Response> {
    try {
        const { loginType, password } = req.body;
        const filter: mongoose.FilterQuery<UserDocument> = { $or: [{ email: loginType }, { phoneNumber: loginType }] };
        const user: UserDocument | null = await UserService.getOneUser(filter, {}, false);

        if (!user) {
            const message = 'User not found';
            return resFailed(res, 404, message);
        }

        const isPasswordMatch = await compare(password, user.password);

        if (!isPasswordMatch) {
            const message = 'Password is incorrect';
            return resFailed(res, 400, message);
        } else {
            console.log('password matched!');
        }

        const JWTPayload = { id: user._id, email: user.email, role: user.role };
        const accessToken = generateAccessToken(JWTPayload, '5h');
        const refreshToken = generateRefreshToken(JWTPayload, '5d');

        const date = new Date();
        const sessionObj = { refreshToken, userId: user._id, expiresAt: date.setDate(date.getDate() + 5) };
        const newSession = await SessionService.createSession(sessionObj);

        await UserService.updateOneUserById(user._id, { $push: { sessions: newSession } });

        const encryptSessionId = generateSessionToken({ sessionId: newSession._id.toString() }, '5d');

        res.cookie('session-backend', encryptSessionId, {
            httpOnly: true,
            maxAge: 5 * 24 * 60 * 60 * 1000,
        });

        const message = 'Login success';
        return resSuccess(res, 200, message, { accessToken, refreshToken });
    } catch (error: any) {
        logger.error(login.name, error.message);
        return resFailed(res, 500, error.message);
    }
}

async function refreshToken(req: Request, res: Response): Promise<Response> {
    try {
        const tokenSessionId = req.cookies['session-backend'];

        if (!tokenSessionId) {
            const message = 'Session not found';
            return resFailed(res, 404, message);
        }

        const sessionId = getSessionId(tokenSessionId);

        const existsSession = await SessionService.getOneSessionById(sessionId as string);

        if (!existsSession) {
            const message = 'Session not found';
            return resFailed(res, 404, message);
        }

        try {
            await verifySessionToken(tokenSessionId);
        } catch (error: any) {
            res.clearCookie('session-backend');
            await SessionService.revokeSession(existsSession?._id as mongoose.Types.ObjectId);

            const message = 'Session not valid, please login again';
            return resFailed(res, 403, message);
        }

        try {
            await verifyRefreshToken(existsSession.refreshToken as string);
        } catch (error: any) {
            res.clearCookie('session-backend');
            await SessionService.revokeSession(existsSession._id as mongoose.Types.ObjectId);

            const message = 'Your session is expired';
            return resFailed(res, 403, message);
        }

        const user: UserDocument | null = await UserService.getOneUser({ _id: existsSession.userId });

        if (!user) {
            const message = 'User not found';
            return resFailed(res, 404, message);
        }

        const JWTPayload = { id: user._id, email: user.email, role: user.role };
        const accessToken = generateAccessToken(JWTPayload, '5h');
        const refreshToken = generateRefreshToken(JWTPayload, '5d');

        const newSession = await SessionService.updateOneSessionById(existsSession._id, { refreshToken });
        const encryptSessionId = generateSessionToken({ sessionId: newSession?._id.toString() }, '5d');

        res.clearCookie('session-backend');
        res.cookie('session-backend', encryptSessionId, {
            httpOnly: true,
            maxAge: 5 * 24 * 60 * 60 * 1000,
        });

        const message = 'Refresh the token success';
        return resSuccess(res, 200, message, { accessToken, refreshToken });
    } catch (error: any) {
        logger.error(refreshToken.name, error.message);
        return resFailed(res, 500, error.message);
    }
}

async function logout(req: Request, res: Response): Promise<Response> {
    try {
        const tokenSessionId = req.cookies['session-backend'];

        if (!tokenSessionId) {
            const message = 'Session not found';
            return resFailed(res, 404, message);
        }

        try {
            await verifySessionToken(tokenSessionId);
        } catch (error: any) {
            const message = 'Session not valid';
            return resFailed(res, 403, message);
        }

        const sessionId = getSessionId(tokenSessionId);
        const existsSession = await SessionService.getOneSessionById(sessionId as string);

        if (!existsSession) {
            const message = 'Session not found';
            return resFailed(res, 404, message);
        }

        try {
            await verifyRefreshToken(existsSession.refreshToken as string);
        } catch (error: any) {
            const message = 'Refresh token not valid';
            return resFailed(res, 403, message);
        }

        const user: UserDocument | null = await UserService.getOneUser({ _id: existsSession.userId });

        if (!user) {
            const message = 'User not found';
            return resFailed(res, 404, message);
        }

        await UserService.updateOneUserById(user._id, { $pull: { sessions: existsSession._id } });
        await SessionService.deleteOneSessionById(existsSession._id);

        res.clearCookie('session-backend');

        const message = 'Logout success';
        return resSuccess(res, 200, message);
    } catch (error: any) {
        logger.error(logout.name, error.message);
        return resFailed(res, 500, error.message);
    }
}

export default { register, login, refreshToken, logout };
