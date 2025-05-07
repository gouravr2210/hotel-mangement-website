package com.hotel.controller.admin;

import com.hotel.services.admin.reservation.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;


    @GetMapping("/reservations/{pageNumber}")
    public ResponseEntity<?> getAllReservations(@PathVariable int pageNumber) {
        return ResponseEntity.ok(reservationService.getAllReservations(pageNumber));
    }

    @GetMapping("/reservation/{id}/{status}")
    public ResponseEntity<?> changeReservationStatus(@PathVariable Long id, @PathVariable String status) {
        boolean success = reservationService.changeReservationStatus(id, status);
        if (success) return ResponseEntity.ok().build();
        return ResponseEntity.notFound().build();
    }

}
