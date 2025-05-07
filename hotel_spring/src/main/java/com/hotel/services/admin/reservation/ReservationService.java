package com.hotel.services.admin.reservation;

import com.hotel.dto.ReservationResponseDto;

public interface ReservationService {

    ReservationResponseDto getAllReservations(int pageNumber);

    boolean changeReservationStatus(Long id, String status);
}
