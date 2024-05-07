package com.prueba.modulo_1.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prueba.modulo_1.Entity.Product;
import com.prueba.modulo_1.IRepository.ProductIRepository;
import com.prueba.modulo_1.IService.ProductIService;

@Service
public class ProductService implements ProductIService{

    @Autowired
    private ProductIRepository productIRepository;
    
    public List<Product> getAllProducts() {
        return productIRepository.findAll();
    }
    
    public Optional<Product> getProductById(Long id) {
        return productIRepository.findById(id);
    }
    
    public Product saveProduct(Product product) {
        return productIRepository.save(product);
    }
    
    public void deleteProduct(Long id) {
    	productIRepository.deleteById(id);
    }

    @Override
    public Product updateProduct(Long id, Product productDetails) {
        Optional<Product> optionalProduct = productIRepository.findById(id);
        if (optionalProduct.isPresent()) {
            Product existingProduct = optionalProduct.get();
            existingProduct.setProductName(productDetails.getProductName());
            existingProduct.setDescription(productDetails.getDescription());
            existingProduct.setAmount(productDetails.getAmount());
            existingProduct.setVatPercentage(productDetails.getVatPercentage()); // Asigna directamente el valor del porcentaje de IVA
            existingProduct.setDiscountPercentage(productDetails.getDiscountPercentage());
            existingProduct.setStatus(productDetails.getStatus());
            return productIRepository.save(existingProduct);
        } else {
            return null;
        }
    }

	@Override
	public List<Product> filterProducts(String filter) {
		return productIRepository.filterProducts(filter);
	}
}
