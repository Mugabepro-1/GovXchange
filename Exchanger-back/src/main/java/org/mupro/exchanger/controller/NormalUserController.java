package org.mupro.exchanger.controller;

import org.mupro.exchanger.model.NormalUser;
import org.mupro.exchanger.service.NormalUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Controller
@CrossOrigin("http://localhost:8080")
@RestController("/exchanger/normaluser")
public class NormalUserController {

    @Autowired
    private NormalUserService normalUserService;

    @GetMapping("/new")
    public void registerNormalUser(@RequestBody NormalUser normalUser){
        normalUserService.registerNormalUser(normalUser);
    }

}
