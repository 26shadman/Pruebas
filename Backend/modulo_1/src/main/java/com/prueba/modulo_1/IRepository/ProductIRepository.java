package com.prueba.modulo_1.IRepository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.prueba.modulo_1.Entity.Product;

@Repository
public interface ProductIRepository  extends JpaRepository<Product, Long>{

	@Query("SELECT p FROM  Product p WHERE p.productName like %?1% OR "
			+ "p.status LIKE %?1%")
	
	List<Product> filterProducts(String filter);
}
