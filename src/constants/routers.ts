// Types
import RouterProperties from '../types/RouterProperties';
// Routers
import UsersRouter from '../routes/usersRouter';

const ROUTERS : Array<RouterProperties> = [
  { name: 'users', routerHandler: new UsersRouter() },
];

export default ROUTERS;
