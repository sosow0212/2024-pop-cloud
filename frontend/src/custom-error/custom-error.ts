/* eslint-disable max-classes-per-file */

export class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class NetworkError extends CustomError {
  constructor(message: string = "아무런 응답을 받지 못했습니다.") {
    super(message);
  }
}

export class UnknownError extends CustomError {
  constructor(message: string = "알 수 없는 에러가 발생했습니다.") {
    super(message);
  }
  static getMessage(): string {
    return "알 수 없는 에러가 발생했습니다.";
  }
}
