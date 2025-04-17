package org.mupro.exchanger.service;

import org.mupro.exchanger.model.NormalUser;
import org.mupro.exchanger.repository.NormalUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NormalUserService {
    @Autowired
    private NormalUserRepository normalUserRepository;

    public void registerNormalUser(NormalUser normalUser){
        normalUserRepository.save(normalUser);
    }
    public List<NormalUser> getNormalUsers(){
        return normalUserRepository.findAll();
    }

    public Optional<NormalUser> getNormalUserById(int id){
        return normalUserRepository.findById(id);
    }
    public void deleteNormalUser(int id){
        normalUserRepository.deleteNormalUserById(id);
    }
}
