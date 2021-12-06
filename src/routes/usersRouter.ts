import express, { Router } from 'express';

// Interface
import IRouter from '../interfaces/IRouter';

// Handlers
import UsersHandler from '../handlers/usersHandler';

class UsersRouter implements IRouter {
    // Properties
    private router : Router;

    private handler : UsersHandler = new UsersHandler();

    /**
     * CTOR
     */
    constructor() {
      this.router = express.Router();
      this.initializeRoutes();
    }

    /**
     * Initializes all routes
     */
    private initializeRoutes() {
      const { router } = this;

      router.post('/create', async (req, res) => {
        console.dir(req.body);
        const result = await this.handler.create(req.body);
        res.send(result);
      });
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
