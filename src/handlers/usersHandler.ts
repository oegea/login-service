// Stores
import UsersStore from '../stores/usersStore';

// Interfaces
import IUser from '../interfaces/IUser';
import IUserStore from '../interfaces/IUserStore';
import IEmailUtils from '../interfaces/IEmailUtils';
import ICryptoUtils from '../interfaces/ICryptoUtils';

// Utils
import EmailUtils from '../utils/emailUtils';
import CryptoUtils from '../utils/cryptoUtils';

// Constants
import {
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
  MAX_USERNAME_LENGTH,
} from '../constants/users';

class UsersHandler {
  private store : IUserStore = new UsersStore();

  private cryptoUtils: ICryptoUtils = new CryptoUtils();

  private emailUtils: IEmailUtils = new EmailUtils();

  // #region User creation
  /**
   * Creates a user
   * @param user User to create
   * @returns Created user
   */
  public async create(user: IUser) {
    await this.validateUser(user);
    const finalUser = await this.prepareUserToBeCreated(user);
    // Send activation e-mail
    // await this.emailUtils.sendEmail();

    // Create the user
    const result = await this.store.create(finalUser);
    return result;
  }

  /**
   * Throws an error if a user can't be created due to validation problems
   * @param user User data
   */
  private async validateUser(user:IUser) {
    // Password should have a valid length
    const passwordLength = user.passwordHash.length;
    if (passwordLength < MIN_PASSWORD_LENGTH || passwordLength > MAX_PASSWORD_LENGTH) { throw new Error(`Password must have between ${MIN_PASSWORD_LENGTH} and ${MAX_PASSWORD_LENGTH} characters`); }

    // Username should have a valid length
    const usernameLength = user.username.length;
    if (usernameLength < MIN_USERNAME_LENGTH || usernameLength > MAX_USERNAME_LENGTH) { throw new Error(`Username must have between ${MIN_USERNAME_LENGTH} and ${MAX_USERNAME_LENGTH} characters`); }

    // Email should have a valid format
    const isValidEmail = this.emailUtils.isValidEmail(user.email);
    if (!isValidEmail) throw new Error('Email is not valid.');

    // If username is already in use, throw an error
    const usernameIsAvailable = await this.store.isUsernameAvailable(user.username);
    if (!usernameIsAvailable) { throw new Error('Username is already in use'); }

    // If e-mail is already in use, throw an error
    const emailIsAvailable = await this.store.isEmailAvailable(user.email);
    if (!emailIsAvailable) { throw new Error('E-mail is already in use'); }
  }

  /**
   * Formats the user data before it's inserted on database
   * @param user User data
   * @returns User data ready to be inserted
   */
  private async prepareUserToBeCreated(user: IUser) {
    // Generate password salt
    const passwordSalt = this.cryptoUtils.generateSalt();

    // Generate the password hash
    const passwordHash = await this.cryptoUtils.generatePasswordHash(
      user.passwordHash,
      passwordSalt,
    );

    // Generate random activation code
    // const verificationCode = this.cryptoUtils.generateRandomNumber(5);

    // Set passwordHash, passwordSalt, verificationCode, isActive, y resetCode
    const { username, email } = user;
    const finalUser : IUser = {
      username,
      email,
      passwordHash,
      passwordSalt,
      isActive: false,
      verificationCode: '',
      resetCode: '',
    };
    return finalUser;
  }
  // #endregion
}

export default UsersHandler;
