package com.hotel.services.admin.reservation;

import com.hotel.dto.ReservationResponseDto;
import com.hotel.entity.Reservation;
import com.hotel.entity.Room;
import com.hotel.enums.ReservationStatus;
import com.hotel.repository.ReservationRepository;
import com.hotel.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService {

    public static final int SEARCH_RESULT_PER_PAGE = 4;

    private final RoomRepository roomRepository;

    private final ReservationRepository reservationRepository;

    @Override
    public ReservationResponseDto getAllReservations(int pageNumber) {
        Pageable paging = PageRequest.of(pageNumber, SEARCH_RESULT_PER_PAGE);
        Page<Reservation> reservationPage = reservationRepository.findAll(paging);
        ReservationResponseDto reservationResponseDto = new ReservationResponseDto();
        reservationResponseDto.setReservationDtoList(reservationPage.stream().map(Reservation::getReservationDto).collect(Collectors.toList()));
        reservationResponseDto.setPageNumber(reservationPage.getPageable().getPageNumber());
        reservationResponseDto.setTotalPages(reservationPage.getTotalPages());
        return reservationResponseDto;
    }

    @Override
    public boolean changeReservationStatus(Long id, String status) {
        Optional<Reservation> optionalReservation = reservationRepository.findById(id);
        if (optionalReservation.isPresent()) {
            Reservation existingReservation = optionalReservation.get();
            if (Objects.equals(status, "Approve")) {
                existingReservation.setReservationStatus(ReservationStatus.APPROVED);
                Optional<Room> optionalRoom = roomRepository.findById(optionalReservation.get().getRoom().getId());
                if (optionalRoom.isPresent()){
                    Room existingRoom = optionalRoom.get();
                    existingRoom.setAvailable(false);
                    roomRepository.save(existingRoom);
                }
            } else {
                existingReservation.setReservationStatus(ReservationStatus.REJECTED);
            }
            reservationRepository.save(existingReservation);
            return true;
        }
        return false;
    }
}
