// Stores
import UsersStore from '../stores/usersStore';

// Interfaces
import IUser from '../interfaces/IUser';

class UsersHandler {
  private store : UsersStore = new UsersStore();

  public async create(user: IUser) {
    const result = await this.store.create(user);
    return result;
  }
}

export default UsersHandler;
