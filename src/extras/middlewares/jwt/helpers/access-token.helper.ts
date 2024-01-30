import { JwtPayload } from 'jsonwebtoken';
import { decodeToken, generateToken, verifyToken } from '../jwt';
import { ACCESS_TOKEN_SECRET } from '../../../../../config/env';

export function generateAccessToken(payload: object | string = {}, expired: string = '10h'): string {
    return generateToken(payload, ACCESS_TOKEN_SECRET, expired);
}

export function verifyAccessToken(token: string): Promise<object | string | undefined> {
    return verifyToken(token, ACCESS_TOKEN_SECRET);
}

export function getUserPayloadFromAccessToken(token: string): JwtPayload | string | null {
    return decodeToken(token);
}
