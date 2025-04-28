package org.mupro.exchanger.controller;

import org.mupro.exchanger.model.SwapRequest;
import org.mupro.exchanger.model.User;
import org.mupro.exchanger.service.SwapRequestService;
import org.mupro.exchanger.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:8080")
@RequestMapping("/api/swaps")
public class SwapRequestController {

    private final SwapRequestService swapRequestService;
    private final UserService userService;

    public SwapRequestController(SwapRequestService swapRequestService, UserService userService) {
        this.swapRequestService = swapRequestService;
        this.userService = userService;
    }

    @PostMapping("/send")
    public SwapRequest sendRequest(@RequestParam Long senderId, @RequestParam Long receiverId) {
        User sender = userService.getUserById(senderId);
        User receiver = userService.getUserById(receiverId);
        return swapRequestService.sendSwapRequest(sender, receiver);
    }

    @PutMapping("/confirm/{requestId}")
    public SwapRequest confirmRequest(@PathVariable Long requestId) {
        return swapRequestService.confirmRequest(requestId);
    }

    @PutMapping("/approve/{requestId}")
    public SwapRequest approveRequest(@PathVariable Long requestId) {
        return swapRequestService.approveRequest(requestId);
    }

    @PutMapping("/reject/{requestId}")
    public SwapRequest rejectRequest(@PathVariable Long requestId) {
        return swapRequestService.rejectRequest(requestId);
    }

    @GetMapping("/incoming/{receiverId}")
    public List<SwapRequest> getRequestsForReceiver(@PathVariable Long receiverId) {
        User receiver = userService.getUserById(receiverId);
        return swapRequestService.getRequestsForReceiver(receiver);
    }

    @GetMapping("/pending")
    public ResponseEntity<List<SwapRequest>> getPendingSwaps() {
        List<SwapRequest> pending = swapRequestService.getPendingSwaps();
        return ResponseEntity.ok(pending);
    }
}

