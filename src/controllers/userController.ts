import { Controller, Post, Route, Response, Body, Get, Path } from 'tsoa';
import { createSuccessResponse, createErrorResponse, ApiErrorResponse, ApiSuccessResponse } from '../utils/responseUtils';
import { isEmptyOrNull } from '../helpers/isEmpty';
import { getUserService } from '../config/serviceFactory';
import { UserLoginRequest, UserRegisterRequest } from '../models/requests/UserRequests';
import { UserLoginResponse, UserRegisterResponse } from '../models/responses/UserResponses';
import { UserDto } from '../models/user/UserDto';

const userService = getUserService();

@Route('user')
export class UserController extends Controller {

    @Post('login')
    @Response(200, 'Success')
    @Response(401, 'Unauthorized')
    public async login(@Body() req: UserLoginRequest): Promise<ApiErrorResponse | ApiSuccessResponse<UserLoginResponse>> {
        const { username, password } = req;

        if (!isEmptyOrNull(username, password)) {
            this.setStatus(401);
            return createErrorResponse('Unauthorized');
        }
        if (await userService.authenticateUser(username, password)) {
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

    @Post('register')
    @Response(201, 'Success', 'User registered successfully')
    @Response(400, 'Bad Request')
    public async register(@Body() req: UserRegisterRequest): Promise<ApiErrorResponse | ApiSuccessResponse<UserRegisterResponse>> {
        const { email, username, password } = req;

        if (!isEmptyOrNull(email, username, password)) {
            this.setStatus(400);
            return createErrorResponse('Bad Request');
        };

        const existingUser = await userService.getUserByUsername(username);
        if (existingUser) {
            this.setStatus(400);
            return createErrorResponse('Username already taken');
        }

        const user = await userService.createUser(email, username, password);
        if (user) {
            this.setStatus(201);
            return createSuccessResponse({ message: 'User registered successfully'});
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

        const user = await userService.getUserByUsername(username);
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

