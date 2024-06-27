import * as bcrypt from 'bcrypt';
import User from '../../models/user/User';
import { IUserService } from '../../models/user/IUserService';
import { IUser } from '../../models/user/IUser';

const SALT_ROUNDS = 10;
export class UserService implements IUserService {
    private mapUserToIUser(user: IUser): IUser {
        return {
            email: user.email,
            username: user.username,
            password: user.password
        };
    }
    public authenticateUser = async (username: string, password: string) => {
        const user = await this.getUserByUsername(username);
        if (!user) return false;
        const isValidPassword = await bcrypt.compare(password, user.password);
        return isValidPassword ? true : false;
    }
    public getUserByUsername = async (username: string): Promise<IUser | null> => {
        try {
           //check if available and return else false
            const user = await User.findOne({ username });
            return user ? this.mapUserToIUser(user) : null;
        }
        catch (err) {
            console.error(err);
            return null;
        }
    };

    public createUser = async (email: string, username: string, password: string): Promise<IUser> => {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const user = new User({ email, username, password: hashedPassword });
        const savedUser = await user.save();
        return this.mapUserToIUser(savedUser);
    };

    public deleteUser = async (username: string): Promise<void> => {
        await User
            .findOneAndDelete({ username });
    }

    public updateUser = async (username: string, password: string): Promise<IUser | null> => {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        try {
            const updatedUser = await User.findOneAndUpdate({ username }, { password: hashedPassword }, { new: true })
            return updatedUser ? this.mapUserToIUser(updatedUser) : null;
        }
        catch (err) {
            console.error(err);
            return null;
        }


    }

}