package com.prueba.modulo_1.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prueba.modulo_1.Entity.Product;
import com.prueba.modulo_1.IService.ProductIService;

@CrossOrigin
@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductIService productService;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProduct() {
        List<Product> products = productService.getAllProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/filter/{filtro}")
    public ResponseEntity<List<Product>> filterProducts(@PathVariable String filtro) {
        List<Product> products = productService.filterProducts(filtro);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Product> saveProduct(@RequestBody Product product) {
        Product newProduct = productService.saveProduct(product);
        return new ResponseEntity<>(newProduct, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody Product productDetails) {
        if (productDetails.getStatus() == null || productDetails.getStatus().equals("")) {
            // Si el campo status es nulo o vacío, enviar una respuesta de error con el mensaje apropiado
            return ResponseEntity.badRequest().body("El campo 'Estado', no puede quedar vacío.");
        }
        
        Product updatedProduct = productService.updateProduct(id, productDetails);
        if (updatedProduct == null) {
            // Manejar el caso en el que no se pueda encontrar el producto con el ID dado
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok(updatedProduct);
    }
}
