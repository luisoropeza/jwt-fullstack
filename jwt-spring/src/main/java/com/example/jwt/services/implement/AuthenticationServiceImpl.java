package com.example.jwt.services.implement;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.jwt.models.Role;
import com.example.jwt.models.User;
import com.example.jwt.models.dtos.request.LoginDto;
import com.example.jwt.models.dtos.request.RegisterDto;
import com.example.jwt.models.dtos.response.TokenResponse;
import com.example.jwt.models.enums.RoleEnum;
import com.example.jwt.repositories.RoleRepository;
import com.example.jwt.repositories.UserRepository;
import com.example.jwt.services.AuthenticationService;
import com.example.jwt.services.jwt.JwtService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Override
    public User registerUser(RegisterDto registerDto) {
        Role role = roleRepository.findByName(RoleEnum.USER).orElseThrow();
        User user = User.builder()
                .fullName(registerDto.getFullName())
                .username(registerDto.getUsername())
                .password(passwordEncoder.encode(registerDto.getPassword()))
                .role(role)
                .build();
        return userRepository.save(user);
    }

    @Override
    public TokenResponse loginUser(LoginDto loginDto) {
        authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword()));
        User authenticatedUser = userRepository.findByUsername(loginDto.getUsername()).orElseThrow();
        String token = jwtService.generateToken(authenticatedUser);
        TokenResponse loginResponse = TokenResponse.builder()
                .token(token)
                .expiresIn(jwtService.getExpiration())
                .build();
        return loginResponse;
    }
}
