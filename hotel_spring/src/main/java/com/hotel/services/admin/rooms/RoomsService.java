package com.hotel.services.admin.rooms;


import com.hotel.dto.RoomDto;
import com.hotel.dto.RoomsResponseDto;

import java.util.List;

public interface RoomsService {

    boolean postRoom(RoomDto roomDto);

    RoomsResponseDto getAllRooms(int pageNumber);

    RoomDto getRoomById(Long id);

    boolean updateRoom(Long id, RoomDto roomDto);

    void deleteRoom(Long id);
}
