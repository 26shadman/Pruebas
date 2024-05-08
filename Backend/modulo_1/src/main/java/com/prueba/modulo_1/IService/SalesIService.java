package com.prueba.modulo_1.IService;

import java.util.List;
import java.util.Optional;

import com.prueba.modulo_1.Entity.Sales;


public interface SalesIService {

Sales saveSales(Sales sales);
    
    List<Sales> getAllSaless();
    Optional<Sales> getSalesById(Long id);
    void deleteSales(Long id);
    Sales updateSales(Long id, Sales salesDetails);
    List<Sales> filterSaless(String filter);
}
