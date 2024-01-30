import { JwtPayload } from 'jsonwebtoken';
import { decodeToken, generateToken, verifyToken } from '../jwt';
import { REFRESH_TOKEN_SECRET } from '../../../../../config/env';

export function generateRefreshToken(payload: object | string = {}, expired: string = '10h'): string {
    return generateToken(payload, REFRESH_TOKEN_SECRET, expired);
}

export function verifyRefreshToken(token: string): Promise<object | string | undefined> {
    return verifyToken(token, REFRESH_TOKEN_SECRET);
}

export function getUserPayloadFromRefreshToken(token: string): JwtPayload | string | null {
    return decodeToken(token);
}
