package com.prueba.modulo_1.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prueba.modulo_1.Entity.Customer;
import com.prueba.modulo_1.Entity.DescriptionSales;
import com.prueba.modulo_1.IRepository.DescriptionSalesIRepository;
import com.prueba.modulo_1.IService.DescripcionSalesIService;

@Service
public class DescriptionSalesService implements DescripcionSalesIService{

	@Autowired
	private DescriptionSalesIRepository repository;
	
	@Override
	public List<DescriptionSales> all() throws Exception {
		return repository.findAll();
	}

	@Override
	public DescriptionSales save(DescriptionSales customer) throws Exception {
		return repository.save(customer);
	}

	@Override
	public Optional<DescriptionSales> findById(Long id) throws Exception {
		return repository.findById(id);
	}

	@Override
	public void delete(Long id) throws Exception {
		repository.deleteById(id);
	}

	@Override
	public void update(Long id, DescriptionSales descriptonSales) throws Exception {
		Optional<DescriptionSales> optionalDescriptionSales = DescriptionSalesIRepository.findById(id);
		if (optionalDescriptionSales.isPresent()) {
			DescriptionSales existingDescriptionSales = optionalDescriptionSales.get();
			existingDescriptionSales.setCustomerIdcustomer(descriptonSales.getCustomerIdcustomer());
			existingDescriptionSales.setAmount(descriptonSales.getAmount());
			existingDescriptionSales.setDiscount(descriptonSales.getDiscount());
			existingDescriptionSales.setPrice(descriptonSales.getPrice());
			existingDescriptionSales.setProdutIdProduct(descriptonSales.getProdutIdProduct());
			existingDescriptionSales.setSubTotal(descriptonSales.getSubTotal());
			return descriptonSales.save(existingDescriptionSales);
		}
	}

}
