export interface AppError {
    statusCode: number;
    message: string;
}

export class AppError {
    constructor(
      public statusCode: number,
      public message: string,
    ) {}
  }
  