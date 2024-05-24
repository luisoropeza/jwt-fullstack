package com.example.jwt.models.dtos.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TokenResponse {
    private String token;
    private long expiresIn;
}
