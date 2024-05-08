package com.prueba.modulo_1.IRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

import com.prueba.modulo_1.Entity.Customer;

@Repository
public interface CustomerIRepository extends JpaRepository<Customer, Long> {
	
	@Query("SELECT c FROM Customer c WHERE c.clientNames LIKE %?1% OR "
	        + "c.clientsLastNames LIKE %?1% OR "
	        + "c.city LIKE %?1%")
	
	List<Customer> filterCustomers(String filter);
}
