// Interfaces
import IUser from './IUser';

interface IUserStore {
    /**
     * Creates a new user on the database
     * @param user Data of the user
     */
    create(user: IUser): Promise<IUser>;

    /**
     * Checks if a username can be used to create a new user
     * @param username Username to check
     * @returns True if username is available
     */
    isUsernameAvailable(username: String): Promise<boolean>;

    /**
     * Checks if an e-mail can be used to create a new user
     * @param email Email to check
     * @returns True if the e-mail can be used
     */
    isEmailAvailable(email: String): Promise<boolean>;

}
export default IUserStore;
