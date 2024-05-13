package com.prueba.modulo_1.IRepository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.prueba.modulo_1.Entity.Product;

public interface ProductIRepository  extends JpaRepository<Product, Long>{

	@Query("SELECT p FROM Product p WHERE p.productName LIKE %?1% OR "
			+ "p.status = ?1")
	
	List<Product> filterProducts(String filter);
}
