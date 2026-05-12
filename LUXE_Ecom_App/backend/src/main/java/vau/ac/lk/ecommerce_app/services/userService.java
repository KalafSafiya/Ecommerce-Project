package vau.ac.lk.ecommerce_app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vau.ac.lk.ecommerce_app.models.Role;
import vau.ac.lk.ecommerce_app.models.User;
import vau.ac.lk.ecommerce_app.repositories.UserRespository;

import java.util.Optional;

@Service
public class userService {

    private final UserRespository repository;

    @Autowired
    public userService(UserRespository repository) {
        this.repository = repository;
    }

    public Optional<User> findByEmail(String email) {
        if (email == null) {
            return Optional.empty();
        }
        return repository.findByEmail(email.trim().toLowerCase());
    }

    public User save(User user) {
        return repository.save(user);
    }

    public User registerUser(String name, String email, String password) {
        User user = new User();
        user.setName(name.trim());
        user.setEmail(email.trim().toLowerCase());
        user.setPassword(password);
        user.setRole(Role.USER);
        return repository.save(user);
    }

    public Optional<User> authenticate(String email, String password) {
        return findByEmail(email)
                .filter(user -> user.getPassword() != null && user.getPassword().equals(password));
    }

    public void createDefaultAdminIfMissing() {
        String adminEmail = "admin1@gmail.com";
        if (repository.findByEmail(adminEmail).isEmpty()) {
            User admin = new User();
            admin.setName("Admin User");
            admin.setEmail(adminEmail);
            admin.setPassword("admin");
            admin.setRole(Role.ADMIN);
            repository.save(admin);
        }
    }
}
