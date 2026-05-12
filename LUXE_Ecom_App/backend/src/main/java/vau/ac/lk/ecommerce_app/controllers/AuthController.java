package vau.ac.lk.ecommerce_app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vau.ac.lk.ecommerce_app.models.AuthResponse;
import vau.ac.lk.ecommerce_app.models.LoginRequest;
import vau.ac.lk.ecommerce_app.models.RegisterRequest;
import vau.ac.lk.ecommerce_app.models.User;
import vau.ac.lk.ecommerce_app.services.userService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final userService service;

    @Autowired
    public AuthController(userService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (request.getName() == null || request.getName().isBlank() || request.getEmail() == null
                || request.getEmail().isBlank() || request.getPassword() == null || request.getPassword().isBlank()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Name, email and password are required.");
        }

        if (service.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("A user with that email already exists.");
        }

        User user = service.registerUser(request.getName(), request.getEmail(), request.getPassword());
        AuthResponse response = new AuthResponse(user.getId(), user.getName(), user.getEmail(), user.getRole().name());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        if (request.getEmail() == null || request.getEmail().isBlank() || request.getPassword() == null
                || request.getPassword().isBlank()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email and password are required.");
        }

        return service.authenticate(request.getEmail(), request.getPassword())
                .map(user -> ResponseEntity
                        .ok(new AuthResponse(user.getId(), user.getName(), user.getEmail(), user.getRole().name())))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new AuthResponse("Invalid email or password", null, null, null)));
    }
}
