/* eslint-disable max-classes-per-file */

import { CustomError } from ".";

export class ApiError extends CustomError {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status; // HTTP 상태 코드를 저장
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string = "잘못된 요청입니다") {
    super(message, 400); // 400 상태 코드
    this.name = "InvalidOAuthCodeError";
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = "인증되지 않은 사용자입니다") {
    super(message, 401);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string = "권한이 없는 사용자입니다") {
    super(message, 403); // 403 상태 코드
    this.name = "ForbiddenError";
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = "존재하지 않는 요청입니다") {
    super(message, 404); // 404 상태 코드
    this.name = "NotFoundError";
  }
}

export class InternalServerError extends ApiError {
  constructor(message: string = "서버에서 오류가 발생했습니다") {
    super(message, 500); // 500 상태 코드
    this.name = "InternalServerError";
  }
}
