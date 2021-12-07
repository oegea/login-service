/**
 * Properties of a user
 */
interface IUser {
  username: string;
  email: string;
  passwordHash: string;
  passwordSalt: string;
  verificationCode: string;
  isActive: boolean;
  resetCode: string;
}

export default IUser;
