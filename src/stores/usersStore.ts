// Core dependencies
import { Schema, model } from 'mongoose';

// Interfaces
import IUser from '../interfaces/IUser';

class UsersStore {
    private schema = new Schema<IUser>({
      username: { type: String, required: true },
      email: { type: String, required: true },
      passwordHash: { type: String, required: true },
      passwordSalt: { type: String, required: true },
      verificationCode: { type: String, required: false },
      isActive: { type: Boolean, required: true },
      resetCode: { type: String, required: false },
    });

    private Model = model<IUser>('User', this.schema);

    public async create(user: IUser) {
      const userInstance = new this.Model(user);
      await userInstance.save();
      return userInstance;
    }
}

export default UsersStore;
