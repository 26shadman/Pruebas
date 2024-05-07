package com.prueba.modulo_1.IService;

import java.util.List;
import java.util.Optional;

import com.prueba.modulo_1.Entity.Customer;

public interface CustomerIservice {

	Customer saveCustomer(Customer customer);
    
    List<Customer> getAllCustomers();
    Optional<Customer> getCustomerById(Long id);
    void deleteCustomer(Long id);
    Customer updateCustomer(Long id, Customer customerDetails);
    List<Customer> filterCustomers(String filter);
}
