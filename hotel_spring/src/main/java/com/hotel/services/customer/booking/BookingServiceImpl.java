package com.hotel.services.customer.booking;

import com.hotel.dto.ReservationDto;
import com.hotel.dto.ReservationResponseDto;
import com.hotel.entity.Reservation;
import com.hotel.entity.Room;
import com.hotel.entity.User;
import com.hotel.enums.ReservationStatus;
import com.hotel.repository.ReservationRepository;
import com.hotel.repository.RoomRepository;
import com.hotel.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    public static final int SEARCH_RESULT_PER_PAGE = 4;

    private final UserRepository userRepository;

    private final RoomRepository roomRepository;

    private final ReservationRepository reservationRepository;

    @Override
    public boolean postReservation(ReservationDto reservationDto) {
        Optional<User> optionalUser = userRepository.findById(reservationDto.getUserId());
        Optional<Room> optionalRoom = roomRepository.findById(reservationDto.getRoomId());
        if (optionalRoom.isPresent() && optionalUser.isPresent()) {
            Reservation reservation = new Reservation();
            reservation.setUser(optionalUser.get());
            reservation.setRoom(optionalRoom.get());
            reservation.setCheckInDate(reservationDto.getCheckInDate());
            reservation.setCheckOutDate(reservationDto.getCheckOutDate());
            Long days = ChronoUnit.DAYS.between(reservationDto.getCheckInDate(), reservationDto.getCheckOutDate());
            reservation.setPrice(optionalRoom.get().getPrice() * days);
            reservation.setReservationStatus(ReservationStatus.PENDING);
            reservationRepository.save(reservation);
            return true;
        }
        return false;
    }

    @Override
    public ReservationResponseDto getAllReservationByUserId(Long userId, int pageNumber) {
        Pageable paging = PageRequest.of(pageNumber, SEARCH_RESULT_PER_PAGE);
        Page<Reservation> reservationPage = reservationRepository.findAllByUserId(paging,userId);
        ReservationResponseDto reservationResponseDto = new ReservationResponseDto();
        reservationResponseDto.setReservationDtoList(reservationPage.stream().map(Reservation::getReservationDto).collect(Collectors.toList()));
        reservationResponseDto.setPageNumber(reservationPage.getPageable().getPageNumber());
        reservationResponseDto.setTotalPages(reservationPage.getTotalPages());
        return reservationResponseDto;
    }

}
