// Core dependencies
import { Schema, model, connect } from 'mongoose';

// Config
import config from '../config';

// Interfaces
import IUser from '../interfaces/IUser';

class UsersStore {
    private schema = new Schema<IUser>({
      username: { type: String, required: true },
      email: { type: String, required: true },
      passwordHash: { type: String, required: true },
      passwordSalt: { type: String, required: true },
    });

    private Model = model<IUser>('User', this.schema);

    public async create(user: IUser) {
      await connect(config.mongoUri);

      const userInstance = new this.Model(user);
      await userInstance.save();
      return userInstance;
    }
}

export default UsersStore;
