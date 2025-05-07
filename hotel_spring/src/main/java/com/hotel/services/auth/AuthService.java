package com.hotel.services.auth;

import com.hotel.dto.SignupRequest;
import com.hotel.dto.UserDto;

public interface AuthService {

     UserDto createUser(SignupRequest signupRequest) throws Exception;

     Boolean hasUserWithEmail(String email);

}
