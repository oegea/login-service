interface IUser {
  username: string;
  email: string;
  passwordHash: string;
  passwordSalt: string;
}

export default IUser;
