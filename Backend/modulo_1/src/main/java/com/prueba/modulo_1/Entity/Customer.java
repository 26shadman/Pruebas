package com.prueba.modulo_1.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Customer")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "document_type", nullable = false, length = 5)
    private String documentType;
    
    @Column(name = "document", nullable = false, unique = true, length = 10)
    private String document;
    
    @Column(name = "client_names", nullable = false, length = 45)
    private String clientNames;
    
    @Column(name = "clients_last_name", nullable = false, length = 45)
    private String clientsLastNames; 
    
    @Column(name = "client_phone_number", nullable = false, length = 13)
    private String clientPhoneNumber;
    
    @Column(name = "customer_address", nullable = false, length = 45)
    private String customerAddress;
    
    @Column(name = "city", nullable = false, length = 45)
    private String city;

    @Column(name = "status", nullable = false)
    private Boolean status;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDocumentType() {
		return documentType;
	}

	public void setDocumentType(String documentType) {
		this.documentType = documentType;
	}

	public String getClientDocument() {
		return document;
	}

	public void setClientDocument(String clientDocument) {
		this.document = clientDocument;
	}

	public String getClientNames() {
		return clientNames;
	}

	public void setClientNames(String clientNames) {
		this.clientNames = clientNames;
	}

	public String getClientsLastNames() {
		return clientsLastNames;
	}

	public void setClientsLastNames(String clientsLastNames) {
		this.clientsLastNames = clientsLastNames;
	}

	public String getClientPhoneNumber() {
		return clientPhoneNumber;
	}

	public void setClientPhoneNumber(String clientPhoneNumber) {
		this.clientPhoneNumber = clientPhoneNumber;
	}

	public String getCustomerAddress() {
		return customerAddress;
	}

	public void setCustomerAddress(String customerAddress) {
		this.customerAddress = customerAddress;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}
    
    
}
