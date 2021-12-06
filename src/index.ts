// Core dependencies
import express from 'express';

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
  public static Start() {
    const { app } = Main;
    app.use(express.json());

    Main.loadRouters();
    Main.startServer();
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
  public static startServer() {
    const { app } = Main;
    const { port } = config;

    app.listen(port, this.onListen);
  }

  /**
   * Function executed when service starts to listen for requests
   */
  public static onListen() {
    const { serviceName, port } = config;
    console.log(`${serviceName} started on port ${port}`);
  }
  // #endregion
}

Main.Start();
