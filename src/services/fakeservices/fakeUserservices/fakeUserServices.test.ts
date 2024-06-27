import { FakeUserService } from "./fakeUserServices";

describe('FakeUserService', () => {
    let userService: FakeUserService;

    beforeEach(() => {
        userService = new FakeUserService();
    });

    it('should create a user', async () => {
        const newUser = await userService.createUser('test@example.com', 'testuser', 'testpassword');
        expect(newUser)?.toBeDefined();
        expect(newUser.username).toBe('testuser');
    });

    it('should authenticate a user', async () => {
        await userService.createUser('test@example.com', 'testuser', 'testpassword');
        const authenticatedUser = await userService.authenticateUser('testuser', 'testpassword');
        expect(authenticatedUser).toBeDefined();
        expect(authenticatedUser?.username).toBe('testuser');
    });

    it('should not authenticate with incorrect password', async () => {
        await userService.createUser('test@example.com', 'testuser', 'testpassword');
        const authenticatedUser = await userService.authenticateUser('testuser', 'wrongpassword');
        expect(authenticatedUser).toBeNull();
    });

    it('should update user password', async () => {
        await userService.createUser('test@example.com', 'testuser', 'testpassword');
        const updatedUser = await userService.updateUser('testuser', 'newpassword');
        expect(updatedUser).toBeDefined();
        expect(updatedUser?.password).toBe('newpassword');
    });

    it('should delete a user', async () => {
        await userService.createUser('test@example.com', 'testuser1', 'testpassword');
        await userService.deleteUser('testuser1');
        const deletedUser = await userService.getUserByUsername('testuser1');
        expect(deletedUser).toBeNull();
    });
});
