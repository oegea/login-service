class ServiceResponse {
  private success: boolean;

  private data: any;

  constructor(success: boolean, data: any) {
    this.success = success;
    this.data = data;
  }
}

export default ServiceResponse;
