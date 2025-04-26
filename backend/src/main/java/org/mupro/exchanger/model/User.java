package org.mupro.exchanger.model;

import jakarta.persistence.*;

@Entity
@Table(name = "\"User\"")
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
    public User(String name, String email, String password, String role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getHomeLocation() {
        return homeLocation;
    }

    public void setHomeLocation(String homeLocation) {
        this.homeLocation = homeLocation;
    }

    public String getQualification() {
        return qualification;
    }

    public void setQualification(String qualification) {
        this.qualification = qualification;
    }

    public Job getJob() {
        return job;
    }

    public void setJob(Job job) {
        this.job = job;
    }
}

