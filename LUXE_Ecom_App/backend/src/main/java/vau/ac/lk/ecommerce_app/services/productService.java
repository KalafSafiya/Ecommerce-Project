package vau.ac.lk.ecommerce_app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vau.ac.lk.ecommerce_app.models.Product;
import vau.ac.lk.ecommerce_app.repositories.ProductRepository;

import java.util.List;
import java.util.Optional;

@Service
public class productService {

    @Autowired
    private ProductRepository repository;

    public List<Product> getAllProducts() {
        return repository.findAll();
    }

    public Product addProduct(Product product) {
        return repository.save(product);
    }

    public List<Product>  addManyProducts(List<Product> products) {
        return repository.saveAll(products);
    }

    public Optional<Product> getProductById(String id) {
        return repository.findById(id);
    }

    public Product updateProduct(String id, Product updatedProduct) {

        updatedProduct.setId(id);

        return repository.save(updatedProduct);
    }

    public void deleteProduct(String id) {
        repository.deleteById(id);
    }

    public void deleteAllProducts()
    {
        repository.deleteAll();
    }
}