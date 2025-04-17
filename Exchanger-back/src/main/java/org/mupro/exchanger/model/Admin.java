package org.mupro.exchanger.model;

import jakarta.persistence.*;

@Entity
public class Admin extends User{

    private String department;

    public Admin(){}
    public Admin(int id, String firstName, String lastName, String email,String password, String phone, String department){
        super(id, firstName, lastName, email,password, phone);
        this.department = department;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }
}
