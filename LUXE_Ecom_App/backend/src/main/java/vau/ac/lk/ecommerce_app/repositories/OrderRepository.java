package vau.ac.lk.ecommerce_app.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import vau.ac.lk.ecommerce_app.models.Order;

public interface OrderRepository extends MongoRepository<Order, String> {
}
