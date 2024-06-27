import { IUserService, UserDocument } from "../models/userModel";
import { FakeUserService } from "../services/fakeservices/fakeUserservices/fakeUserServices";
import { UserService } from "../services/userservices/userService";

export function getUserService(): IUserService {
    const useFake = process.env.USE_FAKE_SERVICES === "true";
    const fakesData = [{username:"testuser",password:"testpassword",email:"test@gmail.com"}] as UserDocument[]
    if (useFake) {
        return new FakeUserService(fakesData);
    } else {
        return new UserService(); // Assuming RealUserService is your actual service implementation
    }
}