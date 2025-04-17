package org.mupro.exchanger.model;

import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;

@Entity
public class NormalUser extends User{

    @Embedded
    private Address homeAddress;

    @Embedded
    private Address workAddress;

    public NormalUser(){}
    private NormalUser(int id, String firstName, String lastName, String email,String password, String phone, Address homeAddress, Address workAddress){
        super(id, firstName, lastName, email,password, phone);
        this.homeAddress = homeAddress;
        this.workAddress = workAddress;
    }

    public Address getHomeAddress() {
        return homeAddress;
    }

    public void setHomeAddress(Address homeAddress) {
        this.homeAddress = homeAddress;
    }

    public Address getWorkAddress() {
        return workAddress;
    }

    public void setWorkAddress(Address workAddress) {
        this.workAddress = workAddress;
    }
}
