package com.example.jwt.bootstrap;

import java.util.Arrays;
import java.util.Map;
import java.util.Optional;

import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.lang.NonNull;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.jwt.models.Role;
import com.example.jwt.models.User;
import com.example.jwt.models.enums.RoleEnum;
import com.example.jwt.repositories.RoleRepository;
import com.example.jwt.repositories.UserRepository;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class AppSeeder implements ApplicationListener<ContextRefreshedEvent> {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void onApplicationEvent(@NonNull ContextRefreshedEvent event) {
        this.loadRoles();
        this.createAdministrator();
    }

    private void loadRoles() {
        RoleEnum[] roleNames = new RoleEnum[] { RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN, RoleEnum.USER };
        Map<RoleEnum, String> roleMap = Map.of(
                RoleEnum.SUPER_ADMIN, "Super Administrator",
                RoleEnum.ADMIN, "Administrator",
                RoleEnum.USER, "User");

        Arrays.stream(roleNames).forEach(roleName -> {
            Optional<Role> optionalRole = roleRepository.findByName(roleName);
            optionalRole.ifPresentOrElse(System.out::println, () -> {
                Role role = Role.builder()
                        .name(roleName)
                        .description(roleMap.get(roleName))
                        .build();
                roleRepository.save(role);
            });
        });
    }

    public void createAdministrator() {
        Optional<Role> optionalRole = roleRepository.findByName(RoleEnum.SUPER_ADMIN);
        Optional<User> optionalUser = userRepository.findByUsername("admin");

        if (optionalRole.isEmpty() || optionalUser.isPresent()) {
            return;
        }

        User user = User.builder()
                .fullName("Super Administrator")
                .username("admin")
                .password(passwordEncoder.encode("123456"))
                .role(optionalRole.get())
                .build();
        userRepository.save(user);
    }
}
