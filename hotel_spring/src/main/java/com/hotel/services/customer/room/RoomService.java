package com.hotel.services.customer.room;

import com.hotel.dto.RoomsResponseDto;

public interface RoomService {

    RoomsResponseDto getAvailableRooms(int pageNumber);

}
