export default interface DecodedUser {
    id: string;
    email: string;
    admin: boolean;
    role: string;
    iat: number;
    exp: number;
}
