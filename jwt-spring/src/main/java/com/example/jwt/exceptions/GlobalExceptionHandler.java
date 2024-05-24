package com.example.jwt.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.example.jwt.models.dtos.response.ErrorResponse;

import io.jsonwebtoken.ExpiredJwtException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private ResponseEntity<ErrorResponse> createErrorResponse(HttpStatus status, String message) {
        ErrorResponse errorResponse = ErrorResponse.builder()
                .message(message)
                .build();
        return ResponseEntity.status(status).body(errorResponse);
    }

    @ExceptionHandler(Exception.class)
    @ResponseBody
    public ResponseEntity<ErrorResponse> handleSecurityException(Exception exception) {
        if (exception instanceof BadCredentialsException) {
            return createErrorResponse(HttpStatus.UNAUTHORIZED, "The username or password is incorrect");
        }

        if (exception instanceof AccessDeniedException) {
            return createErrorResponse(HttpStatus.FORBIDDEN, "You are not authorized to access this resource");
        }

        if (exception instanceof ExpiredJwtException) {
            return createErrorResponse(HttpStatus.FORBIDDEN, "The JWT token has expired");
        }
        return createErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Error Internal Server");
    }

    @ExceptionHandler(AppException.class)
    @ResponseBody
    public ResponseEntity<ErrorResponse> handleAppException(AppException exception) {
        return createErrorResponse(exception.getStatus(), exception.getMessage());
    }
}
