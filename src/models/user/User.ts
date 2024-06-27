import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './IUser';

const userSchema: Schema = new Schema({
    email: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
