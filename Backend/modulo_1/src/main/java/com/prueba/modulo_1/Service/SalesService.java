package com.prueba.modulo_1.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prueba.modulo_1.Entity.Customer;
import com.prueba.modulo_1.Entity.Sales;
import com.prueba.modulo_1.IRepository.SalesIRepository;
import com.prueba.modulo_1.IService.SalesIService;

@Service
public class SalesService implements SalesIService{
	
	@Autowired
    private SalesIRepository salesIRepository;

    public List<Sales> getAllSaless() {
        return salesIRepository.findAll();
    }

    public Optional<Sales> getSalesById(Long id) {
        return salesIRepository.findById(id);
    }

    public Sales saveSales(Sales sales) {
        return salesIRepository.save(sales);
    }

    public void deleteSales(Long id) {
        salesIRepository.deleteById(id);
    }

    public Sales updateSales(Long id, Sales salesDetails) {
        Optional<Sales> optionalSales = salesIRepository.findById(id);
        if (optionalSales.isPresent()) {
            Sales existingSales = optionalSales.get();
            existingSales.setTotal(salesDetails.getTotal());
            existingSales.setSaleDate(salesDetails.getSaleDate());
            existingSales.setStatus(salesDetails.getStatus());
            existingSales.setCustomer(salesDetails.getCustomer());
            return salesIRepository.save(existingSales);
        } else {
            return null;
        }
    }

    @Override
    public List<Sales> filterSaless(String filter) {
        return salesIRepository.filterSaless(filter, null);
    }

}
