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
import com.prueba.modulo_1.Entity.Customer;
import com.prueba.modulo_1.IService.CustomerIService;

@CrossOrigin
@RestController
@RequestMapping("/customer")
public class CustomerController {

	@Autowired
    private CustomerIService customerService;

    @GetMapping
    public ResponseEntity<List<Customer>> getAllCustomers() {
        List<Customer> customers = customerService.getAllCustomers();
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    @GetMapping("/filter/{filtro}")
    public ResponseEntity<List<Customer>> filterCustomers(@PathVariable String filtro) {
        List<Customer> customers = customerService.filterCustomers(filtro);
        if (customers.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Customer> saveCustomer(@RequestBody Customer customer) {
    	Customer newCustomer = customerService.saveCustomer(customer);
        return new ResponseEntity<>(newCustomer, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long id) {
    	customerService.deleteCustomer(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCustomer(@PathVariable Long id, @RequestBody Customer customerDetails) {
        if (customerDetails.getStatus() == null || customerDetails.getStatus().equals("")) {
            // Si el campo status es nulo o vacío, enviar una respuesta de error con el mensaje apropiado
            return ResponseEntity.badRequest().body("El campo 'Estado' no puede quedar vacío.");
        }
        
        Customer updatedCustomer = customerService.updateCustomer(id, customerDetails);
        if (updatedCustomer == null) {
            // Manejar el caso en el que no se pueda encontrar el cliente con el ID dado
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok(updatedCustomer);
    }
}
