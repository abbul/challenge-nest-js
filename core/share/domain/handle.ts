import { AppError } from "./error";

export class Handle {

  static handleException(error: any): any {
    console.warn('HANDLER_EXCEPTION.ERROR', { error });
    if (!(error instanceof AppError)) {
      throw error;
    }
    return {
      statusCode: 500,
      message: 'Error Internal Server',
    };
  }
}