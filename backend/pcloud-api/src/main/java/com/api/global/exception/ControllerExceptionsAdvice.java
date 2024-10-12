package com.api.global.exception;

import com.api.global.exception.response.ExceptionResponse;
import com.common.exception.CustomException;
import com.common.exception.CustomExceptionType;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Objects;

@Slf4j
@RequiredArgsConstructor
@RestControllerAdvice
public class ControllerExceptionsAdvice {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionResponse> handleException(final HttpServletRequest request, final Exception exception) {
        log.error("예상하지 못한 예외가 발생했습니다. uri: {} {}, exception : {}", request.getMethod(), request.getRequestURI(), exception.getMessage());

        return ResponseEntity.internalServerError()
                .body(new ExceptionResponse("INTERNAL_EXCEPTION", "PC0000", "알 수 없는 오류가 발생했습니다."));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionResponse> handleMethodArgumentNotValidException(final HttpServletRequest request, final MethodArgumentNotValidException exception) {
        log.error("잘못된 param 값이 들어왔습니다. uri: {} {}, ", request.getMethod(), request.getRequestURI());

        String errorMessage = Objects.requireNonNull(exception.getBindingResult().getFieldError())
                .getDefaultMessage();

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ExceptionResponse("PARAM_ERROR", "PC0000", errorMessage));
    }

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ExceptionResponse> handleException(final HttpServletRequest request, final CustomException exception) {
        CustomExceptionType type = exception.getExceptionType();
        log.info("잘못된 요청이 들어왔습니다. uri: {} {},  내용: {}, SPRING_LOG: {}",
                request.getMethod(),
                request.getRequestURI(),
                type.message(),
                exception.getMessage());

        return ResponseEntity.status(HttpStatusCode.valueOf(type.httpStatusCode()))
                .body(new ExceptionResponse(type.name(), type.customCode(), type.message()));
    }
}
