import express, { Router } from 'express';

// Interface
import IRouter from '../interfaces/IRouter';

// Handlers
import UsersHandler from '../handlers/usersHandler';

// Utils
import RouterUtils from '../utils/routerUtils';

class UsersRouter extends RouterUtils implements IRouter {
    // Properties
    private router : Router;

    private handler : UsersHandler = new UsersHandler();

    /**
     * CTOR
     */
    constructor() {
      super();
      this.router = express.Router();
      this.initializeRoutes();
    }

    /**
     * Initializes all routes
     */
    private initializeRoutes() {
      const { router } = this;

      // Create a new user
      router.post('/create', async (req, res) => this.safeExecution(req, res, async () => {
        const result = await this.handler.create(req.body);
        return result;
      }));

      // TODO: Validate a user's e-mail using the generated code

      // TODO: Reset password

      // TODO: Validate password reset code

      // TODO: Log in
    }

    /**
     * Retrieves the router object
     * @returns The router object
     */
    public getRouter() : Router {
      return this.router;
    }
}

export default UsersRouter;
