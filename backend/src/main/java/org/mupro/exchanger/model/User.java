package org.mupro.exchanger.model;

import jakarta.persistence.*;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    @Column(unique = true)
    private String email;
    private String password;
    private String role; // "NormalUser" or "Admin"
    private String homeLocation;
    private String qualification;

    @ManyToOne
    @JoinColumn(name = "job_id")
    private Job job;

    public User(){}
    public User(Long id, String name, String email, String password, String role, String homeLocation, String qualification, Job job) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.homeLocation = homeLocation;
        this.qualification = qualification;
        this.job = job;
    }
    public User(String name, String email, String password, String role, String homeLocation, String qualification, Job job) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.homeLocation = homeLocation;
        this.qualification = qualification;
        this.job = job;
    }
}

