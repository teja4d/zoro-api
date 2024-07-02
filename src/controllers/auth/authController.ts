import { Body, Controller, Post, Route, Response, Res } from "tsoa";
import { isEmptyOrNull } from "../../helpers/isEmpty";
import { UserLoginRequest } from "../../models/requests/UserRequests";
import { UserLoginResponse } from "../../models/responses/UserResponses";
import { ApiErrorResponse, ApiSuccessResponse, createErrorResponse, createSuccessResponse } from "../../utils/responseUtils";
import { IUserService } from "../../models/user/IUserService";
import { UserService } from "../../services/userservices/userService";
import { FakeUserService } from "../../services/fakeservices/fakeUserService";

export interface AuthControllerDependencies {
    userService?: IUserService;
}

@Route('auth')
export class AuthController extends Controller {
    private readonly userService: IUserService;
    constructor({ userService }: AuthControllerDependencies = {}) {
        super();
        this.userService = userService || new UserService();
    }

    @Response(200, 'Success', 'Login successful')
    @Response(401, 'Unauthorized')
    @Response(401, 'Authentication failed')
    @Post('login')
    public async login(@Body() req: UserLoginRequest): Promise<ApiErrorResponse | ApiSuccessResponse<UserLoginResponse>> {
        const { username, password } = req;

        if (!isEmptyOrNull(username, password)) {
            this.setStatus(401);
            return createErrorResponse('Unauthorized');
        }
        if (await this.userService.authenticateUser(username, password)) {
            this.setStatus(200);
            return createSuccessResponse({
                message: 'Login successful',
                token: "this is a test token"
            });
        } else {
            this.setStatus(401);
            return createErrorResponse('Authentication failed');
        }
    }
}