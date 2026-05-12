package vau.ac.lk.ecommerce_app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.support.SimpleMongoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import vau.ac.lk.ecommerce_app.models.Product;
import vau.ac.lk.ecommerce_app.repositories.ProductRepository;
import vau.ac.lk.ecommerce_app.services.productService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    @Autowired
    private productService service;

    @GetMapping
    public List<Product> getAllProducts() {
        return service.getAllProducts();
    }

    @GetMapping("/{id}")
    public Optional<Product> getProductById(
            @PathVariable String id) {

        return service.getProductById(id);
    }

    @PostMapping
    public ResponseEntity<String> addProduct(@RequestBody Product product) {
        service.addProduct(product);
        return ResponseEntity.ok("Product added successfully");
    }

    @PostMapping("/many")
    public ResponseEntity<String> addManyProducts(@RequestBody List<Product> products)
    {
        service.addManyProducts(products);
        return ResponseEntity.ok("Products added successfully");
    }

    @PutMapping("/{id}")
    public Product updateProduct(
            @PathVariable String id,
            @RequestBody Product product) {

        return service.updateProduct(id, product);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable String id) {

        service.deleteProduct(id);
        return ResponseEntity.ok("Product deleted successfully");
    }

    @DeleteMapping()
    public ResponseEntity<?> deleteAll() {

        service.deleteAllProducts();
        return ResponseEntity.ok("Products deleted successfully");
    }



}