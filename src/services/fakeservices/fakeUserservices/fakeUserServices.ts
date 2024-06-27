import { IUser, IUserService, UserDocument } from "../../../models/userModel";

const fakeUsers: UserDocument[] = [];

export class FakeUserService implements IUserService {
    public async authenticateUser(username: string, password: string): Promise<boolean> {
        const user = await this.getUserByUsername(username);
        if (!user) return false;
        if (user.password === password) {
            return true;
        }
        return false;
    }

    public async getUserByUsername(username: string): Promise<UserDocument | null> {
        return fakeUsers.find((user) => user.username === username) || null;
    }

    public async createUser(email: string, username: string, password: string): Promise<UserDocument> {
        const user = { email, username, password };
        fakeUsers.push(user as UserDocument);
        return user as UserDocument;
    }

    public async deleteUser(username: string): Promise<void> {
        const index = fakeUsers.findIndex((user) => user.username === username);
        if (index !== -1) {
            console.log(fakeUsers)
            fakeUsers.splice(index, 1);
        }
    }

    public async updateUser(username: string, password: string): Promise<UserDocument | null> {
        const userIndex = fakeUsers.findIndex((user) => user.username === username);
        if (userIndex !== -1) {
            fakeUsers[userIndex].password = password;
            return fakeUsers[userIndex];
        }
        return null;
    }
}
