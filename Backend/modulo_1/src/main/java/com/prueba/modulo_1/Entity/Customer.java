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
    
    @Column(name = "client_document", nullable = false, unique = true, length = 10)
    private String clientDocument;
    
    @Column(name = "client_names", nullable = false, length = 45)
    private String clientNames;
    
    @Column(name = "clients_last_name", nullable = false, length = 45)
    private String clientsLastNames; // Corregido el nombre de la columna
    
    @Column(name = "client_phone_number", nullable = false, length = 13)
    private String clientPhoneNumber;
    
    @Column(name = "customer_address", nullable = false, length = 45)
    private String customerAddress;
    
    @Column(name = "city", nullable = false, length = 45)
    private String city;

    @Column(name = "status", nullable = false)
    private boolean status;

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
        return clientDocument;
    }

    public void setClientDocument(String clientDocument) {
        this.clientDocument = clientDocument;
    }

    public String getClientNames() {
        return clientNames;
    }

    public void setClientNames(String clientNames) {
        this.clientNames = clientNames;
    }

    public String getClientsLastName() {
        return clientsLastNames;
    }

    public void setClientsLastName(String clientsLastName) {
        this.clientsLastNames = clientsLastName;
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

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

}
