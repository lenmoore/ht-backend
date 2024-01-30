import { JwtPayload } from 'jsonwebtoken';
import { decodeToken, generateToken, verifyToken } from '../jwt';
import { SESSION_TOKEN_SECRET } from '../../../../../config/env';

export function generateSessionToken(payload: object | string = {}, expired: string): string {
    return generateToken(payload, SESSION_TOKEN_SECRET, expired);
}

export function verifySessionToken(token: string): Promise<object | string | undefined> {
    return verifyToken(token, SESSION_TOKEN_SECRET);
}

export function getSessionPayload(token: string): JwtPayload | null | any {
    return decodeToken(token);
}

export function getSessionId(token: string): string | null {
    return getSessionPayload(token)?.sessionId;
}
