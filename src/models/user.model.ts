import mongoose from 'mongoose';

export interface UserInput {
    email: string;
    name: string;
    password: string;
    admin: boolean;
    actor: boolean;
    group_name: string;
}


// role: 'admin', 'actor', 'user'
// if is admin then group_name will be empty
// if is actor then group_name will be the name of the group: stalker, maakler, korraldaja, esoteerik
// if is not admin or actor => is visitor then group_name will be the name of the group/actor but TEAM NAME will be color
export interface UserDocument extends UserInput, mongoose.Document {
    email: string;
    name: string;
    hex: string;
    password: string;

    admin: boolean;
    actor: boolean;

    group_name: string;
    team_name: string;

    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true },
        name: { type: String, required: false },
        password: { type: String, required: true },
        hex: { type: String, required: false },

        admin: { type: Boolean, default: false },
        actor: { type: Boolean, default: false },

        group_name: { type: String, default: '' },
        team_name: { type: String, default: '' },
    },
    {
        timestamps: true,
    },
);


const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;