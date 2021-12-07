// Interfaces
import IUser from './IUser';

interface IUserStore {
    create(user: IUser): any;
}
export default IUserStore;
