package com.example.jwt.services;

import java.util.List;

import com.example.jwt.models.User;

public interface UserService {
    List<User> getAllUsers();

    User getUserAuthenticated();
}
