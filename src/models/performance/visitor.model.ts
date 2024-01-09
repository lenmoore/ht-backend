import mongoose from 'mongoose';
import {customAlphabet} from 'nanoid';
import {UserDocument} from '../user.model';
import {PerformanceDocument} from './performance.model';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

export interface VisitorInput {
    user: UserDocument['_id'];
    performance: PerformanceDocument['_id'];
    username: string;
    humanity_values: object;
    archived: boolean;
    wardrobe_number: number;
    wants_newsletter: boolean;
    confirmed_humanity_value: string;
}

export interface VisitorDocument extends VisitorInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
    accessToken: string;
}

const visitorSchema = new mongoose.Schema(
    {
        visitorId: {
            type: String,
            required: true,
            unique: true,
            default: () => `visitor_${nanoid()}`,
        },
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        humanity_values: {
            lime: Number,
            fuchsia: Number,
            silver: Number,
            turq: Number,
        },
        archived: {type: Boolean, default: false},
        performance: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Performance',
        },
        username: {type: String, required: false},
        wardrobe_number: {type: Number, required: true},
        wants_newsletter: {type: Boolean, required: true},

        accessToken: {type: String, default: ''},
    },
    {
        timestamps: true,
    }
);
const VisitorModel = mongoose.model<VisitorDocument>('Visitor', visitorSchema);

export default VisitorModel;
