package org.mupro.exchanger.service;

import org.mupro.exchanger.model.Admin;
import org.mupro.exchanger.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;

    public void registerAdmin(Admin admin){
        adminRepository.save(admin);
    }
    public List<Admin> getAdmins(){
        return adminRepository.findAll();
    }

    public Optional<Admin> getAdminById(int id){
        return adminRepository.findById(id);
    }
    public void deleteAdmin(int id){
        adminRepository.deleteAdminById(id);
    }
}
