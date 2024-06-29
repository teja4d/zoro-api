import { FakeUserService } from "../../services/fakeservices/fakeUserService";
import { createSuccessResponse, createErrorResponse } from "../../utils/responseUtils";
import { AuthController } from "./authController";

jest.mock('../../utils/responseUtils', () => ({
    createSuccessResponse: jest.fn(),
    createErrorResponse: jest.fn(),
}));
describe('authController', () => {
    describe('authController', () => {
        let authController: AuthController;
        let userService: FakeUserService;

        beforeEach(() => {
            jest.clearAllMocks();
            userService = new FakeUserService();
            authController = new AuthController({ userService });
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });

        describe('login', () => {
            const req = {
                username: 'testuser',
                password: 'testpassword',
            };

            it('should return success response if authentication is successful', async () => {
                await userService.createUser('test@example.com', req.username, req.password);
                (createSuccessResponse as jest.Mock).mockReturnValueOnce({
                    message: 'Login successful',
                    token: 'this is a test token',
                });

                const result = await authController.login(req);
                expect(result).toEqual({
                    message: 'Login successful',
                    token: 'this is a test token',
                });
                expect(authController.getStatus()).toBe(200);
            });

            it('should return unauthorized error response if authentication fails', async () => {
                (createErrorResponse as jest.Mock).mockReturnValueOnce('Authentication failed');
                const result = await authController.login(req);
                expect(result).toEqual('Authentication failed');
                expect(authController.getStatus()).toBe(401);
            });

            it('should return unauthorized error response if username or password is empty', async () => {
                (createErrorResponse as jest.Mock).mockReturnValueOnce('Unauthorized');
                const result = await authController.login({ username: '', password: '' });
                expect(result).toEqual('Unauthorized');
                expect(authController.getStatus()).toBe(401);
            });
        });
    });
});
