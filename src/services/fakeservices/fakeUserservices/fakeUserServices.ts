import { IUser } from "../../../models/user/IUser";
import { IUserService } from "../../../models/user/IUserService";
export class FakeUserService implements IUserService {
    private fakeUsers: IUser[];
    constructor(fakeUsers: IUser[] = []) {
        this.fakeUsers = fakeUsers;
    }
    public async authenticateUser(username: string, password: string): Promise<boolean> {
        const user = await this.getUserByUsername(username);
        if (!user) return false;
        if (user.password === password) {
            return true;
        }
        return false;
    }

    public async getUserByUsername(username: string): Promise<IUser | null> {
        return this.fakeUsers.find((user) => user.username === username) || null;
    }

    public async createUser(email: string, username: string, password: string): Promise<IUser> {
        const user = { email, username, password };
        this.fakeUsers.push(user as IUser);
        return user as IUser;
    }

    public async deleteUser(username: string): Promise<void> {
        const index = this.fakeUsers.findIndex((user) => user.username === username);
        if (index !== -1) {
            this.fakeUsers.splice(index, 1);
        }
    }

    public async updateUser(username: string, password: string): Promise<IUser | null> {
        const userIndex = this.fakeUsers.findIndex((user) => user.username === username);
        if (userIndex !== -1) {
            this.fakeUsers[userIndex].password = password;
            return this.fakeUsers[userIndex];
        }
        return null;
    }
}
