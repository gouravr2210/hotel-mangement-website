package com.hotel.dto;

import lombok.Data;

import java.util.List;

@Data
public class ReservationResponseDto {

    private List<ReservationDto> reservationDtoList;

    private Integer totalPages;

    private Integer pageNumber;

}
