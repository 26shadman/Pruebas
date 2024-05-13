package com.prueba.modulo_1.IRepository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.prueba.modulo_1.Entity.Sales;

public interface SalesIRepository extends JpaRepository<Sales, Long> {

    @Query("SELECT s FROM Sales s JOIN s.customer c WHERE (c.clientNames LIKE %:filter% OR "
            + "c.clientsLastNames LIKE %:filter%)"
            + " AND s.saleDate = :saleDate")
    
    List<Sales> filterSaless(String filter, LocalDate saleDate);

}
