package org.mupro.exchanger.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class SwapRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User sender;

    @ManyToOne
    private User receiver;

    @Enumerated(EnumType.STRING)
    private SwapStatus status;

    private LocalDateTime createdAt = LocalDateTime.now();

    public SwapRequest(){}

    public SwapRequest(Long id, User sender, User receiver, SwapStatus status) {
        this.id = id;
        this.sender = sender;
        this.receiver = receiver;
        this.status = status;
    }
    public SwapRequest(User sender, User receiver, SwapStatus status) {
        this.sender = sender;
        this.receiver = receiver;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public User getReceiver() {
        return receiver;
    }

    public void setReceiver(User receiver) {
        this.receiver = receiver;
    }

    public SwapStatus getStatus() {
        return status;
    }

    public void setStatus(SwapStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}

