import * as bcrypt from 'bcrypt';
import User from '../../models/userModel';
import { UserService } from './userService';

const userService = new UserService();
jest.mock('../../models/userModel');
jest.mock('bcrypt');
describe('userService', () => {
    describe('authenticateUser', () => {
        const username = 'testuser';
        const password = 'testpassword';
        beforeEach(() => {
            jest.restoreAllMocks(); // Restore all mocks before each test
        });
        it('should return the user if the password is valid', async () => {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ username, password: hashedPassword });

            (User.findOne as jest.Mock).mockResolvedValueOnce(user);
            (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true);
            const result = await userService.authenticateUser(username, password);
            expect(result).toBeTruthy();
            expect(User.findOne).toHaveBeenCalledWith({ username });
            expect(bcrypt.compare).toHaveBeenCalledWith(password, user.password);
        });

        it('should return null if the user does not exist', async () => {
            (User.findOne as jest.Mock).mockResolvedValueOnce(null);
            const result = await userService.authenticateUser(username, password);
            expect(result).toBeFalsy();
        });

        it('should return null if the password is invalid', async () => {
            const username = 'testuser';
            const password = 'testpassword';
            const hashedPassword = await bcrypt.hash('wrongpassword', 10);
            const user = new User({ username, password: hashedPassword });

            (User.findOne as jest.Mock).mockResolvedValueOnce(user);
            (bcrypt.compare as jest.Mock).mockResolvedValueOnce(false);

            const result = await userService.authenticateUser(username, password);

            expect(result).toBeFalsy();
            expect(User.findOne).toHaveBeenCalledWith({ username });
            expect(bcrypt.compare).toHaveBeenCalledWith(password, user.password);
        });
    });

    describe('getUserByUsername', () => {
        it('should return the user if found', async () => {
            const username = 'testuser';
            const user = new User({ username });

            (User.findOne as jest.Mock).mockResolvedValueOnce(user);

            const result = await userService.getUserByUsername(username);

            expect(result).toEqual(user);
            expect(User.findOne).toHaveBeenCalledWith({ username });
        });

        it('should return null if the user is not found', async () => {
            const username = 'testuser';

            (User.findOne as jest.Mock).mockResolvedValueOnce(null);

            const result = await userService.getUserByUsername(username);

            expect(result).toBeNull();
            expect(User.findOne).toHaveBeenCalledWith({ username });
        });
    });

    describe('createUser', () => {
        it('should create a new user', async () => {
            const email = 'test@example.com';
            const username = 'testuser';
            const password = 'testpassword';
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ email, username, password: hashedPassword });

            User.prototype.save.mockResolvedValueOnce(user);

            const result = await userService.createUser(email, username, password);

            expect(result).toEqual(user);
            expect(User).toHaveBeenCalledWith({ email, username, password: hashedPassword });
            expect(User.prototype.save).toHaveBeenCalled();
        });
    });

    describe('deleteUser', () => {
        it('should delete the user', async () => {
            const username = 'testuser';
            await userService.deleteUser(username);

            expect(User.findOneAndDelete).toHaveBeenCalledWith({ username });
        });
    });

    describe('updateUser', () => {
        it('should update the user password', async () => {
            const username = 'testuser';
            const password = 'newpassword';
            const hashedPassword = await bcrypt.hash(password, 10);
            const updatedUser = new User({ username, password: hashedPassword });

            (User.findOneAndUpdate as jest.Mock).mockResolvedValueOnce(updatedUser);

            const result = await userService.updateUser(username, password);

            expect(result).toEqual(updatedUser);
            expect(User.findOneAndUpdate).toHaveBeenCalledWith(
                { username },
                { password: hashedPassword },
                { new: true }
            );
        });
    });
});