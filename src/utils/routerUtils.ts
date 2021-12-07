// Types
import ServiceResponse from './serviceResponse';

// Config
import config from '../config';

class RouterUtils {
  private isDebug = config.debug;

  /**
   * Executes an async function and returns its result as a response
   * @param req Request object
   * @param res Response object
   * @param callback Function to execute
   */
  public async safeExecution(req: any, res: any, callback: Function) {
    try {
      const result = await callback();
      const response: ServiceResponse = RouterUtils.generateResponse(true, result);
      res.send(response);
    } catch (error) {
      const data = (this.isDebug) ? error : 'Unhandled exception ocurred';
      const response = RouterUtils.generateResponse(false, data);
      res.status(500).send(response);
    }
  }

  /**
   * Generates a response object
   * @param success True if the execution was success
   * @param data Data to return
   * @returns Response object
   */
  private static generateResponse(success: boolean, data: any) {
    const response = new ServiceResponse(success, data);

    return response;
  }
}

export default RouterUtils;
