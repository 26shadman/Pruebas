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
import com.prueba.modulo_1.Entity.Sales;
import com.prueba.modulo_1.IService.SalesIService;

@CrossOrigin
@RestController
@RequestMapping("/sales")
public class SalesController {

	@Autowired
    private SalesIService salesService;

    @GetMapping
    public ResponseEntity<List<Sales>> getAllSales() {
        List<Sales> sales = salesService.getAllSaless();
        return new ResponseEntity<>(sales, HttpStatus.OK);
    }

    @GetMapping("/filter/{filtro}")
    public ResponseEntity<List<Sales>> filterCustomers(@PathVariable String filtro) {
        List<Sales> sales = salesService.filterSaless(filtro);
        if (sales.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(sales, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Sales> saveSales(@RequestBody Sales sales) {
    	Sales newSales = salesService.saveSales(sales);
        return new ResponseEntity<>(newSales, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSales(@PathVariable Long id) {
    	salesService.deleteSales(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateSales(@PathVariable Long id, @RequestBody Sales salesDetails) {
        if (salesDetails.getStatus() == null || salesDetails.getStatus().equals("")) {
            // Si el campo status es nulo o vacío, enviar una respuesta de error con el mensaje apropiado
            return ResponseEntity.badRequest().body("El campo 'Estado', no puede quedar vacío.");
        }
        
        Sales updatedSales = salesService.updateSales(id, salesDetails);
        if (updatedSales == null) {
            // Manejar el caso en el que no se pueda encontrar el cliente con el ID dado
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok(updatedSales);
    }
}
