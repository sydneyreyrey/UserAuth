import { HttpError } from "routing-controllers";

class AppError extends HttpError {
  public code: string;
  public message: string;
  public operationName: string;

  constructor(
    httpCode: number,
    code: string,
    message: string,
    operationName: string
  ) {
    super(httpCode);
    Object.setPrototypeOf(this, AppError.prototype);
    this.code = code;
    this.message = message;
    this.operationName = operationName;
  }

  toJSON() {
    return {
      status: this.httpCode,
      failedOperation: this.operationName,
      code: this.code,
      message: this.message,
    };
  }
}
