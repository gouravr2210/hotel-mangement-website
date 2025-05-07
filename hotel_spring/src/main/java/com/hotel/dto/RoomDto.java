package com.hotel.dto;

import lombok.Data;

@Data
public class RoomDto {

    private Long id;

    private String name;

    private String type;

    private boolean available;

    private Long price;

}
