package com.api.global.exception;

import com.api.global.exception.response.ExceptionResponse;
import com.common.exception.CustomException;
import com.common.exception.CustomExceptionType;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@Slf4j
@RequiredArgsConstructor
@RestControllerAdvice
public class ControllerExceptionsAdvice extends ResponseEntityExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionResponse> handleException(final HttpServletRequest request, final Exception exception) {
        log.error("예상하지 못한 예외가 발생했습니다. uri: {} {}, ", request.getMethod(), request.getRequestURI(), exception);

        return ResponseEntity.internalServerError()
                .body(new ExceptionResponse("INTERNAL_EXCEPTION", "PC0000", "알 수 없는 오류가 발생했습니다."));
    }

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ExceptionResponse> handleException(final HttpServletRequest request, final CustomException exception) {
        CustomExceptionType type = exception.getExceptionType();
        log.info("잘못된 요청이 들어왔습니다. uri: {} {},  내용: {}", request.getMethod(), request.getRequestURI(), type.message());

        return ResponseEntity.status(HttpStatusCode.valueOf(type.httpStatusCode()))
                .body(new ExceptionResponse(type.name(), type.customCode(), type.message()));
    }
}
