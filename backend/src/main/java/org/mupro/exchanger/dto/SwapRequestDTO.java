package org.mupro.exchanger.dto;

import org.mupro.exchanger.model.SwapRequest;

import java.time.LocalDateTime;

public class SwapRequestDTO {
    private String id;
    private String requesterId;
    private String requesterName;
    private String targetId;
    private String targetName;
    private String status;
    private String createdAt;
    private String confirmedAt;
    private String approvedAt;

    public SwapRequestDTO() {
    }

    public static SwapRequestDTO fromEntity(SwapRequest entity) {
        SwapRequestDTO dto = new SwapRequestDTO();
        dto.setId(entity.getId().toString());
        dto.setRequesterId(entity.getSender().getId().toString());
        dto.setRequesterName(entity.getSender().getName());
        dto.setTargetId(entity.getReceiver().getId().toString());
        dto.setTargetName(entity.getReceiver().getName());
        dto.setStatus(entity.getStatus().toString());
        dto.setCreatedAt(entity.getCreatedAt().toString());
        return dto;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRequesterId() {
        return requesterId;
    }

    public void setRequesterId(String requesterId) {
        this.requesterId = requesterId;
    }

    public String getRequesterName() {
        return requesterName;
    }

    public void setRequesterName(String requesterName) {
        this.requesterName = requesterName;
    }

    public String getTargetId() {
        return targetId;
    }

    public void setTargetId(String targetId) {
        this.targetId = targetId;
    }

    public String getTargetName() {
        return targetName;
    }

    public void setTargetName(String targetName) {
        this.targetName = targetName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getConfirmedAt() {
        return confirmedAt;
    }

    public void setConfirmedAt(String confirmedAt) {
        this.confirmedAt = confirmedAt;
    }

    public String getApprovedAt() {
        return approvedAt;
    }

    public void setApprovedAt(String approvedAt) {
        this.approvedAt = approvedAt;
    }
} 