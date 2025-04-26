package org.mupro.exchanger.repository;

import org.mupro.exchanger.model.SwapRequest;
import org.mupro.exchanger.model.SwapStatus;
import org.mupro.exchanger.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SwapRequestRepository extends JpaRepository<SwapRequest, Long> {
    List<SwapRequest> findByReceiverAndStatus(User receiver, SwapStatus status);
    List<SwapRequest> findByStatus(SwapStatus status);
}
