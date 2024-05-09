package com.prueba.modulo_1.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "descripcion_ventas")
public class DescriptionSales {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@JoinColumn(name = "customer_id_customer", nullable = false)
	private Customer customerIdcustomer;
	
	@ManyToOne
	@JoinColumn(name = "product_isProducto", nullable = false)
	private Product produtIdProduct;
	
	@Column(name = "amount", nullable = false, unique = true, length = 45)
	private Integer amount;
	
	@Column(name = "price", nullable = false, length = 9)
	private Float price;
	
	@Column(name = "discount", nullable = false, length = 9)
	private Float discount;
	
	@Column(name = "sub_total", nullable = false, unique = true, length = 9)
	private Float subTotal;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Customer getCustomerIdcustomer() {
		return customerIdcustomer;
	}

	public void setCustomerIdcustomer(Customer customerIdcustomer) {
		this.customerIdcustomer = customerIdcustomer;
	}

	public Product getProdutIdProduct() {
		return produtIdProduct;
	}

	public void setProdutIdProduct(Product produtIdProduct) {
		this.produtIdProduct = produtIdProduct;
	}

	public Integer getAmount() {
		return amount;
	}

	public void setAmount(Integer amount) {
		this.amount = amount;
	}

	public Float getPrice() {
		return price;
	}

	public void setPrice(Float price) {
		this.price = price;
	}

	public Float getDiscount() {
		return discount;
	}

	public void setDiscount(Float discount) {
		this.discount = discount;
	}

	public Float getSubTotal() {
		return subTotal;
	}

	public void setSubTotal(Float subTotal) {
		this.subTotal = subTotal;
	}
	
	
	
}
