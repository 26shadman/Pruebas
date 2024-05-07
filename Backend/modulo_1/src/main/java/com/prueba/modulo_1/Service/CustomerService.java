package com.prueba.modulo_1.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prueba.modulo_1.Entity.Customer;
import com.prueba.modulo_1.IRepository.CustomerIRepository;
import com.prueba.modulo_1.IService.CustomerIservice;

@Service
public class CustomerService implements CustomerIservice {

	@Autowired
    private CustomerIRepository customerIRepository;

    public List<Customer> getAllCustomers() {
        return customerIRepository.findAll();
    }

    public Optional<Customer> getCustomerById(Long id) {
        return customerIRepository.findById(id);
    }

    public Customer saveCustomer(Customer customer) {
        return customerIRepository.save(customer);
    }

    public void deleteCustomer(Long id) {
        customerIRepository.deleteById(id);
    }

    @Override
    public Customer updateCustomer(Long id, Customer customerDetails) {
        Optional<Customer> optionalCustomer = customerIRepository.findById(id);
        if (optionalCustomer.isPresent()) {
            Customer existingCustomer = optionalCustomer.get();
            existingCustomer.setDocumentType(customerDetails.getDocumentType());
            existingCustomer.setClientDocument(customerDetails.getClientDocument());
            existingCustomer.setClientNames(customerDetails.getClientNames());
            existingCustomer.setClientsLastName(customerDetails.getClientsLastName());
            existingCustomer.setClientPhoneNumber(customerDetails.getClientPhoneNumber());
            existingCustomer.setCustomerAddress(customerDetails.getCustomerAddress());
            existingCustomer.setCity(customerDetails.getCity());
            existingCustomer.setStatus(customerDetails.isStatus());
            return customerIRepository.save(existingCustomer);
        } else {
            return null;
        }
    }

    @Override
    public List<Customer> filterCustomers(String filter) {
        return customerIRepository.filterCustomers(filter);
    }
}
