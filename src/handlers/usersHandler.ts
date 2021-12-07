// Stores
import UsersStore from '../stores/usersStore';

// Interfaces
import IUser from '../interfaces/IUser';
import IUserStore from '../interfaces/IUserStore';

class UsersHandler {
  private store : IUserStore = new UsersStore();

  /**
   * Creates a user
   * @param user User to create
   * @returns Created user
   */
  public async create(user: IUser) {
    // const exists : boolean = await this.store.userExists(user.email, user.username);

    const result = await this.store.create(user);
    return result;
  }
}

export default UsersHandler;
