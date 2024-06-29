import { FakeUserService } from '../../services/fakeservices/fakeUserService';
import { createErrorResponse, createSuccessResponse } from '../../utils/responseUtils';
import { UserController } from './userController';

jest.mock('../../utils/responseUtils.ts', () => ({
  createSuccessResponse: jest.fn(),
  createErrorResponse: jest.fn(),
}));
describe('UserController', () => {
  describe('UserController', () => {
    let userController: UserController;
    let userService: FakeUserService;

    beforeEach(() => {
      jest.clearAllMocks();
      userService = new FakeUserService();
      userController = new UserController({ userService });
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    describe('register', () => {
      const req = {
        email: 'test@example.com',
        username: 'testuser',
        password: 'testpassword',
      };

      it('should return success response if user is registered successfully', async () => {
        (createSuccessResponse as jest.Mock).mockReturnValueOnce({
          message: 'User registered successfully',
        });

        const result = await userController.register(req);

        expect(result).toEqual({ message: 'User registered successfully' });
        expect(userController.getStatus()).toBe(201);
      });

      it('should return bad request error response if username is already taken', async () => {
        await userService.createUser('test@example.com', req.username, req.password);
        (createErrorResponse as jest.Mock).mockReturnValueOnce('Username already taken');

        const result = await userController.register(req);

        expect(result).toEqual('Username already taken');
        expect(userController.getStatus()).toBe(400);
      });

      it('should return bad request error response if any field is empty', async () => {
        (createErrorResponse as jest.Mock).mockReturnValueOnce('Bad Request');
        const result = await userController.register({ email: '', username: '', password: '' });

        expect(result).toEqual('Bad Request');
        expect(userController.getStatus()).toBe(400);
      });

      it('should return bad request error response if user creation fails', async () => {
        userService.createUser = jest.fn().mockResolvedValueOnce(null);
        (createErrorResponse as jest.Mock).mockReturnValueOnce('Bad Request');
        const result = await userController.register(req);
        expect(result).toEqual('Bad Request');
        expect(userController.getStatus()).toBe(400);
      });
    });

    describe('userDetails', () => {
      const username = 'testuser';

      it('should return success response with user details if user is found', async () => {
        await userService.createUser('test@example.com', username, 'password');
        const userDto = { username: 'testuser', email: 'test@example.com' };
        (createSuccessResponse as jest.Mock).mockReturnValueOnce(userDto);

        const result = await userController.userDetails(username);

        expect(result).toEqual(userDto);
        expect(userController.getStatus()).toBe(200);
      });

      it('should return unauthorized error response if username is empty', async () => {
        (createErrorResponse as jest.Mock).mockReturnValueOnce('Please enter a valid username');

        const result = await userController.userDetails('');

        expect(result).toEqual('Please enter a valid username');
        expect(userController.getStatus()).toBe(401);
      });

      it('should return unauthorized error response if user is not found', async () => {
        (createErrorResponse as jest.Mock).mockReturnValueOnce('User not found');

        const result = await userController.userDetails(username);

        expect(result).toEqual('User not found');
        expect(userController.getStatus()).toBe(401);
      });
    });
  });
});