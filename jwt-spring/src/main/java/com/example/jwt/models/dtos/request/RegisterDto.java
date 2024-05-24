package com.example.jwt.models.dtos.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegisterDto {
    private String fullName;
    private String username;
    private String password;
}
