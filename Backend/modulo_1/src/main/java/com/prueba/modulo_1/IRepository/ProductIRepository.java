package com.prueba.modulo_1.IRepository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.prueba.modulo_1.Entity.Product;

@Repository
public interface ProductIRepository  extends JpaRepository<Product, Long>{

	@Query("SELECT P FROM  P WHRE P.nameProduct like %?1% OR "
			+ "P.status")
	List<Product> filterProducts(String filter);
}
