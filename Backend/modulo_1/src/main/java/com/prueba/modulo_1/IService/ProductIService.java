package com.prueba.modulo_1.IService;

import java.util.List;
import java.util.Optional;

import com.prueba.modulo_1.Entity.Product;

public interface ProductIService {
    
    Product saveProduct(Product product);
    
    List<Product> getAllProducts();
    Optional<Product> getProductById(Long id);
    void deleteProduct(Long id);
    Product updateProduct(Long id, Product productDetails);
    List<Product> filterProducts(String filter);
}
