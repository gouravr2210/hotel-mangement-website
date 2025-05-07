package com.hotel.services.customer.booking;


import com.hotel.dto.ReservationDto;
import com.hotel.dto.ReservationResponseDto;

import java.util.List;

public interface BookingService {

    boolean postReservation(ReservationDto reservationDto);

    ReservationResponseDto getAllReservationByUserId(Long userId, int pageNumber);

}
