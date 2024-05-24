package com.example.jwt.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.jwt.models.User;
import com.example.jwt.models.dtos.request.LoginDto;
import com.example.jwt.models.dtos.request.RegisterDto;
import com.example.jwt.models.dtos.response.TokenResponse;
import com.example.jwt.services.AuthenticationService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody RegisterDto registerDto) {
        return ResponseEntity.ok(authenticationService.registerUser(registerDto));
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> loginUser(@RequestBody LoginDto loginDto) {
        return ResponseEntity.ok(authenticationService.loginUser(loginDto));
    }
}
