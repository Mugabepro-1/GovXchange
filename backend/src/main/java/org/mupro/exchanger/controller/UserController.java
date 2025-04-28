package org.mupro.exchanger.controller;

import org.mupro.exchanger.model.User;
import org.mupro.exchanger.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:8080")
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @GetMapping("/all")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @GetMapping("/me")
    public ResponseEntity<Optional<User>> getProfile(@AuthenticationPrincipal org.springframework.security.core.userdetails.User userDetails){
        Optional<User> user = userService.getUserByEmail(userDetails.getUsername());
        return ResponseEntity.ok(user);
    }
}

