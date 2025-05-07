package com.hotel.services.customer.room;

import com.hotel.dto.RoomsResponseDto;
import com.hotel.entity.Room;
import com.hotel.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

    public static final int SEARCH_RESULT_PER_PAGE = 6;

    private final RoomRepository roomRepository;

    @Override
    public RoomsResponseDto getAvailableRooms(int pageNumber) {
        Pageable paging = PageRequest.of(pageNumber, SEARCH_RESULT_PER_PAGE);
        Page<Room> roomPage = roomRepository.findByAvailable(true, paging);
        RoomsResponseDto roomsResponseDto = new RoomsResponseDto();
        roomsResponseDto.setRoomDtoList(roomPage.stream().map(Room::getRoomDto).collect(Collectors.toList()));
        roomsResponseDto.setPageNumber(roomPage.getPageable().getPageNumber());
        roomsResponseDto.setTotalPages(roomPage.getTotalPages());
        return roomsResponseDto;
    }

}
