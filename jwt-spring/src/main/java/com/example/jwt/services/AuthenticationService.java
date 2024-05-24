package com.example.jwt.services;

import com.example.jwt.models.User;
import com.example.jwt.models.dtos.request.LoginDto;
import com.example.jwt.models.dtos.request.RegisterDto;
import com.example.jwt.models.dtos.response.TokenResponse;

public interface AuthenticationService {
    User registerUser(RegisterDto registerDto);

    TokenResponse loginUser(LoginDto loginDto);
}
