package com.hotel.entity;

import com.hotel.dto.RoomDto;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String type;

    private boolean available;

    private Long price;

    public RoomDto getRoomDto() {
        RoomDto roomDto = new RoomDto();
        roomDto.setId(id);
        roomDto.setName(name);
        roomDto.setType(type);
        roomDto.setAvailable(available);
        roomDto.setPrice(price);
        return roomDto;
    }

}