import mongoose, { Document, Schema } from 'mongoose';

export interface IUser {
    email: string;
    username: string;
    password: string;
}

export interface IUserService {
    authenticateUser(username: string, password: string): Promise<boolean>;
    getUserByUsername(username: string): Promise<UserDocument | null>;
    createUser(email: string, username: string, password: string): Promise<UserDocument>;
    deleteUser(username: string): Promise<void>;
    updateUser(username: string, password: string): Promise<UserDocument | null>;
}


export interface UserLoginRequest {
    username: string;
    password: string;

}

export interface UserRegisterRequest {
    email: string;
    username: string;
    password: string;
}

export interface UserLoginResponse {
    token: string;
    message:string;
}
export interface UserDocument extends IUser, Document { };

const userSchema: Schema = new Schema({
    email: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
