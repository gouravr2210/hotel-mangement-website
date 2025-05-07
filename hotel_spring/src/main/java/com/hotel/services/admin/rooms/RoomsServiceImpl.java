package com.hotel.services.admin.rooms;

import com.hotel.dto.RoomDto;
import com.hotel.dto.RoomsResponseDto;
import com.hotel.entity.Room;
import com.hotel.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoomsServiceImpl implements RoomsService {

    public static final int SEARCH_RESULT_PER_PAGE = 6;

    private final RoomRepository roomRepository;

    @Override
    public boolean postRoom(RoomDto roomDto) {
        try {
            Room room = new Room();
            BeanUtils.copyProperties(roomDto, room);
            room.setAvailable(true);
            roomRepository.save(room);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public RoomsResponseDto getAllRooms(int pageNumber) {
        Pageable paging = PageRequest.of(pageNumber, SEARCH_RESULT_PER_PAGE);
        Page<Room> roomPage = roomRepository.findAll(paging);
        RoomsResponseDto roomsResponseDto = new RoomsResponseDto();
        roomsResponseDto.setRoomDtoList(roomPage.stream().map(Room::getRoomDto).collect(Collectors.toList()));
        roomsResponseDto.setPageNumber(roomPage.getPageable().getPageNumber());
        roomsResponseDto.setTotalPages(roomPage.getTotalPages());
        return roomsResponseDto;
    }

    @Override
    public RoomDto getRoomById(Long id) {
        Optional<Room> optionalRoom = roomRepository.findById(id);
        return optionalRoom.map(Room::getRoomDto).orElse(null);
    }

    @Override
    public boolean updateRoom(Long id, RoomDto roomDto) {
        Optional<Room> optionalRoom = roomRepository.findById(id);
        if (optionalRoom.isPresent()) {
            Room existingRoom = optionalRoom.get();
            existingRoom.setName(roomDto.getName());
            existingRoom.setAvailable(true);
            existingRoom.setPrice(roomDto.getPrice());
            existingRoom.setType(roomDto.getType());
            roomRepository.save(existingRoom);
            return true;
        }
        return false;
    }

    @Override
    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }

}
