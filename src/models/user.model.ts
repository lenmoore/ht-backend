import mongoose from 'mongoose';

export interface UserInput {
    email: string;
    name: string;
    password: string;
    admin: boolean;
    actor: boolean;
    actor_color: string;
}

// role: 'admin', 'actor', 'user'
export interface UserDocument extends UserInput, mongoose.Document {
    email: string;
    name: string;
    password: string;
    admin: boolean;
    actor: boolean;
    actor_color: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true },
        name: { type: String, required: true },
        password: { type: String, required: true },
        actor_color: { type: String, default: '' },
        admin: { type: Boolean, default: false },
        actor: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    },
);


const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;