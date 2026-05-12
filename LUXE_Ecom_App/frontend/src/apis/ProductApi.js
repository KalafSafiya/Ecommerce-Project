import axios from "axios";

const BASE_URL = "http://localhost:8080/api/products";

// Get all products
export const getProducts = () => {
    return axios.get(BASE_URL);
};

// Get product by ID
export const getProductById = (id) => {
    return axios.get(`${BASE_URL}/${id}`);
};

// Add product (ADMIN)
export const addProduct = (product) => {
    return axios.post(BASE_URL, product);
};

// Update product (ADMIN)
export const updateProduct = (id, product) => {
    return axios.put(`${BASE_URL}/${id}`, product);
};

// Delete product (ADMIN)
export const deleteProduct = (id) => {
    return axios.delete(`${BASE_URL}/${id}`);
};