package vau.ac.lk.ecommerce_app.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import vau.ac.lk.ecommerce_app.models.User;

import java.util.Optional;

public interface UserRespository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
}
