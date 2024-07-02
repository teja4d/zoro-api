import { IUserService } from '../../models/user/IUserService';
import { IUser } from '../../models/user/IUser';

const SALT_ROUNDS = 10;

export class FakeUserService implements IUserService {
    private users: IUser[] = [{
        email: 'test1@gmail.com',
        username: 'testusers',
        password: '123456' // password: testpassword
    }];

    private findUserByUsername(username: string): IUser | undefined {
        return this.users.find(user => user.username === username);
    }

    private mapUserToIUser(user: IUser): IUser {
        return {
            email: user.email,
            username: user.username,
            password: user.password
        };
    }

    public authenticateUser = async (username: string, password: string): Promise<boolean> => {
        console.log('username', username);
        const user = this.findUserByUsername(username);
        if (!user) return false;
        const isValidPassword = password === user.password;
        return isValidPassword;
    };

    public getUserByUsername = async (username: string): Promise<IUser | null> => {
        const user = this.findUserByUsername(username);
        return user ? this.mapUserToIUser(user) : null;
    };

    public getAllUsers = async (): Promise<IUser[]> => {
        return this.users.map(user => this.mapUserToIUser(user));
    };

    public createUser = async (email: string, username: string, password: string): Promise<IUser | null> => {
        //empty users array
        this.users = [];
        const hashedPassword = password;//await bcrypt.hash(password, SALT_ROUNDS);
        try {
            const user: IUser = {
                email,
                username,
                password: hashedPassword
            };
            this.users.push(user);
            return this.mapUserToIUser(user);
        }
        catch (err) {
            console.error(err);
            return null;
        }
    };

    public deleteUser = async (username: string): Promise<void> => {
        this.users = this.users.filter(user => user.username !== username);
    };

    public updateUser = async (username: string, password: string): Promise<IUser | null> => {
        const user = this.findUserByUsername(username);
        if (!user) return null;

        const hashedPassword = password;//await bcrypt.hash(password, SALT_ROUNDS);
        user.password = hashedPassword;

        return this.mapUserToIUser(user);
    };
}
