package vau.ac.lk.ecommerce_app.models;

import org.springframework.data.annotation.Id;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "orders")
public class Order {
    @Id
    private String id;

    private List<CartItem> items;

    private double total;

    public Order() {
    }

    public Order(String id, List<CartItem> items, double total) {
        this.id = id;
        this.items = items;
        this.total = total;
    }

    // GETTERS AND SETTERS

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<CartItem> getItems() {
        return items;
    }

    public void setItems(List<CartItem> items) {
        this.items = items;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }
}
