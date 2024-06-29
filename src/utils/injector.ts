import { UserControllerDependencies } from "../controllers/userController";
import { IUserService } from "../models/user/IUserService";
import { UserService } from "../services/userservices/userService";
export function inject(dependencyName: string): any {
    switch (dependencyName) {
        case 'UserControllerDependencies':
            return {
                userService: new UserService() as IUserService,
                // Add other dependencies as needed
            } as UserControllerDependencies;
        default:
            throw new Error(`Dependency '${dependencyName}' not found.`);
    }
}
