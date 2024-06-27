import * as bcrypt from 'bcrypt';
import User, { IUserService, UserDocument } from '../../models/userModel';

const SALT_ROUNDS = 10;
export class UserService implements IUserService {
    public authenticateUser = async (username: string, password: string) => {
        const user = await this.getUserByUsername(username);
        if (!user) return false;
        const isValidPassword = await bcrypt.compare(password, user.password);
        return isValidPassword ? true : false;
    }
    public getUserByUsername = async (username: string): Promise<UserDocument | null> => {
        return User.findOne({ username });
    };

    public createUser = async (email: string, username: string, password: string): Promise<UserDocument> => {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const user = new User({ email, username, password: hashedPassword });
        return user.save();
    };

    public deleteUser = async (username: string): Promise<void> => {
        await User
            .findOneAndDelete({ username });
    }

    public updateUser = async (username: string, password: string): Promise<UserDocument | null> => {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        return User
            .findOneAndUpdate({ username }, { password: hashedPassword }, { new: true })
    }

}