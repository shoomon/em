package com.ssafy.em.common.exception;

import com.ssafy.em.common.exception.dto.ErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.stream.Collectors;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final String LOG_FORMAT = "request = {}, {} \n class = {} \n code = {} \n message = {}";

    @ExceptionHandler(GlobalException.class)
    public ResponseEntity<ErrorResponse> handleGlobalException(
            GlobalException exception,
            HttpServletRequest request
    ){
        ErrorCode errorCode = exception.getErrorCode();

        log.warn(
                LOG_FORMAT,
                request.getMethod(),
                request.getRequestURI(),
                exception.getClass().getSimpleName(),
                errorCode.code(),
                errorCode.message()
        );
        exception.printStackTrace();
        return ResponseEntity.status(exception.getHttpStatus()).body(ErrorResponse.from(errorCode));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleBadRequestException(
            MethodArgumentNotValidException exception,
            HttpServletRequest request
    ) {
        String errorMessage = exception.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(fieldError -> fieldError.getField() + ": " + fieldError.getDefaultMessage())
                .collect(Collectors.joining(", "));

        log.warn(
                LOG_FORMAT,
                request.getMethod(),
                request.getRequestURI(),
                exception.getClass().getSimpleName(),
                "BAD_REQUEST",
                errorMessage
        );
        exception.printStackTrace();
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ErrorResponse.from(new ErrorCode("400", errorMessage)));
    }

    @ExceptionHandler({HttpMessageNotReadableException.class, MethodArgumentTypeMismatchException.class})
    public ResponseEntity<ErrorResponse> handleBadRequestExceptions(
            Exception exception,
            HttpServletRequest request
    ) {
        String errorMessage;
        if (exception instanceof MethodArgumentTypeMismatchException mismatchEx) {
            errorMessage = "요청 파라미터 타입이 잘못되었습니다: " + mismatchEx.getName();
        } else {
            errorMessage = "요청 본문을 읽을 수 없습니다. JSON 형식이나 필드 값을 확인하세요.";
        }

        log.warn(
                LOG_FORMAT,
                request.getMethod(),
                request.getRequestURI(),
                exception.getClass().getSimpleName(),
                "BAD_REQUEST",
                errorMessage
        );
        exception.printStackTrace();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResponse("400", errorMessage));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Void> handleServerException(
            Exception exception,
            HttpServletRequest request
    ){
        log.warn(
                LOG_FORMAT,
                request.getMethod(),
                request.getRequestURI(),
                exception.getClass().getSimpleName(),
                HttpStatus.INTERNAL_SERVER_ERROR,
                exception.getMessage()
        );
        exception.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}
