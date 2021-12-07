// Core dependencies
import express from 'express';
import { connect } from 'mongoose';

// Interfaces
import IRouter from './interfaces/IRouter';

// Configuration
import config from './config';

// Constants
import ROUTERS from './constants/routers';

class Main {
  // Properties
  public static app = express();

  /**
   * Starts the webservice
   */
  public static async Start() {
    const { app } = Main;
    app.use(express.json());

    Main.loadRouters();
    await Main.startServer();
  }

  // #region Routers load
  /**
   * Retrieves all routers from configuration and initialize them
   */
  public static loadRouters() {
    for (let i = 0; i < ROUTERS.length; i += 1) {
      const router = ROUTERS[i];
      Main.loadRouter(router.name, router.routerHandler);
    }
  }

  /**
   * Loads an specific router
   * @param name Name of the router to include in the url
   * @param routerHandler Router that will handle requests
   */
  public static loadRouter(name: string, routerHandler: IRouter) {
    const router = routerHandler.getRouter();
    Main.app.use(`/${name}`, router);
  }
  // #endregion

  // #region Server start
  /**
   * Starts the Express server
   */
  public static async startServer() {
    const { app } = Main;
    const { port, mongoUri, serviceName } = config;
    await connect(mongoUri);
    console.log('Connected to MongoDb');
    app.listen(port, () => console.log(`${serviceName} started on port ${port}`));
  }
  // #endregion
}

Main.Start();
