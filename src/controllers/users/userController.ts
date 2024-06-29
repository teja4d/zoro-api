import { Controller, Post, Route, Response, Body, Get, Path, Inject } from 'tsoa';
import { createSuccessResponse, createErrorResponse, ApiErrorResponse, ApiSuccessResponse } from '../../utils/responseUtils';
import { isEmptyOrNull } from '../../helpers/isEmpty';
import { UserDto } from '../../models/user/UserDto';
import { IUserService } from '../../models/user/IUserService';
import { UserService } from '../../services/userservices/userService';
import { UserRegisterRequest } from '../../models/requests/UserRequests';
import { UserRegisterResponse } from '../../models/responses/UserResponses';

export interface UserControllerDependencies {
    userService?: IUserService;
}

@Route('user')
export class UserController extends Controller {
    private readonly userService: IUserService;
    constructor({ userService }: UserControllerDependencies = {}) {
        super();
        this.userService = userService || new UserService();
    }

    @Post('register')
    @Response(201, 'Success', 'User registered successfully')
    @Response(400, 'Bad Request')
    public async register(@Body() req: UserRegisterRequest): Promise<ApiErrorResponse | ApiSuccessResponse<UserRegisterResponse>> {
        const { email, username, password } = req;

        if (!isEmptyOrNull(email, username, password)) {
            this.setStatus(400);
            return createErrorResponse('Bad Request');
        };

        const existingUser = await this.userService.getUserByUsername(username);
        if (existingUser) {
            this.setStatus(400);
            return createErrorResponse('Username already taken');
        }

        const user = await this.userService.createUser(email, username, password);
        if (user) {
            this.setStatus(201);
            return createSuccessResponse({ message: 'User registered successfully' });
        }
        this.setStatus(400);
        return createErrorResponse('Bad Request');
    }

    @Get('/{username}')
    @Response(200, 'Success')
    @Response(401, 'Unauthorized')
    public async userDetails(@Path() username: string): Promise<ApiSuccessResponse<UserDto> | ApiErrorResponse> {
        if (!isEmptyOrNull(username)) {
            this.setStatus(401);
            return createErrorResponse('Please enter a valid username');
        };

        const user = await this.userService.getUserByUsername(username);
        if (user) {
            const userDto: UserDto = {
                username: user.username,
                email: user.email
            }
            this.setStatus(200);
            return createSuccessResponse(userDto);
        }
        this.setStatus(401);
        return createErrorResponse('User not found');
    }
}

