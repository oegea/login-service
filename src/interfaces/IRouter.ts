import { Router } from 'express';

/**
 * Router that adds routes to the current service
 */
interface IRouter{
    getRouter: ()=>Router;
}

export default IRouter;
