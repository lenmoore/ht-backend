import { Request } from 'express';
import DecodedUser from './decoded-user';

export default interface IRequest extends Request {
    user?: DecodedUser;
}
