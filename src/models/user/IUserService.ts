import { IUser } from "./IUser";

export interface IUserService {
    authenticateUser(username: string, password: string): Promise<boolean>;
    getUserByUsername(username: string): Promise<IUser | null>;
    createUser(email: string, username: string, password: string): Promise<IUser>;
    deleteUser(username: string): Promise<void>;
    updateUser(username: string, password: string): Promise<IUser | null>;
}
