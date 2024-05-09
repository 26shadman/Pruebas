package com.prueba.modulo_1.IService;

import java.util.List;
import java.util.Optional;

import com.prueba.modulo_1.Entity.DescriptionSales;

public interface DescripcionSalesIService {

	List<DescriptionSales> all() throws Exception;
	DescriptionSales save(DescriptionSales descriptonSales) throws Exception;
	Optional<DescriptionSales> findById(Long id) throws Exception;
	void delete(Long id) throws Exception;
	void update(Long id, DescriptionSales descriptonSales) throws Exception;

}
