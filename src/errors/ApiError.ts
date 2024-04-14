export default class ApiError extends Error {
  public status: number;
  public operational: boolean;
  constructor(status: number, message: string, operational: boolean = true, stack: string = '') {
    super(message);
    this.status = status;
    this.operational = operational;
    if (stack.length > 0) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}