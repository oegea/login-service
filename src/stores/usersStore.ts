// Core dependencies
import { Schema, model } from 'mongoose';

// Interfaces
import IUser from '../interfaces/IUser';
import IUserStore from '../interfaces/IUserStore';

class UsersStore implements IUserStore {
    // Mongoose schema
    private schema = new Schema<IUser>({
      username: { type: String, required: true },
      email: { type: String, required: true },
      passwordHash: { type: String, required: true },
      passwordSalt: { type: String, required: true },
      verificationCode: { type: String, required: false },
      isActive: { type: Boolean, required: true },
      resetCode: { type: String, required: false },
    });

    // Mongoose model
    private Model = model<IUser>('User', this.schema);

    /**
     * Creates a new user on the database
     * @param user Data of the user
     */
    public async create(user: IUser) {
      const userInstance = new this.Model(user);
      await userInstance.save();
      return userInstance;
    }

    /**
     * Checks if a username can be used to create a new user
     * @param username Username to check
     * @returns True if username is available
     */
    async isUsernameAvailable(username: string) {
      const count:number = await this.Model.countDocuments({ username });
      return (count === 0);
    }

    /**
     * Checks if an e-mail can be used to create a new user
     * @param email Email to check
     * @returns True if the e-mail can be used
     */
    async isEmailAvailable(email:string) {
      const count:number = await this.Model.countDocuments({ email });
      return (count === 0);
    }
}

export default UsersStore;
