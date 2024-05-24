package com.example.jwt.models.dtos.request;

import lombok.Data;

@Data
public class LoginDto {
    private String username;
    private String password;
}
