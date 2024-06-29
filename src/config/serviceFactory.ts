import { IUser } from "../models/user/IUser";
import { IUserService } from "../models/user/IUserService";
import { FakeUserService } from "../services/fakeservices/fakeUserService";
import { UserService } from "../services/userservices/userService";

export default function getUserService(): IUserService {
    const useFake = process.env.USE_FAKE_SERVICES === "true";
    if (useFake) {
        return new FakeUserService();
    } else {
        return new UserService();
    }
}