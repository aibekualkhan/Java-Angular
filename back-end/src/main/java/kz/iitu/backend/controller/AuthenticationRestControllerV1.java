package kz.iitu.backend.controller;


import kz.iitu.backend.dto.AuthenticationRequestDto;
import kz.iitu.backend.dto.RegistrationRequestDto;
import kz.iitu.backend.model.User;
import kz.iitu.backend.security.jwt.JwtTokenProvider;
import kz.iitu.backend.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


///REST controller for authentication requests (login, logout, register, etc.)
@RestController
@RequestMapping(value = {"/api/v1/"})
@Slf4j
public class AuthenticationRestControllerV1 {

    private final AuthenticationManager authenticationManager;

    private final JwtTokenProvider jwtTokenProvider;

    private final UserService userService;

    @Autowired
    public AuthenticationRestControllerV1 (AuthenticationManager authenticationManager,
                                           JwtTokenProvider jwtTokenProvider,
                                           UserService userService){
        this.jwtTokenProvider = jwtTokenProvider;
        this.authenticationManager = authenticationManager;
        this.userService = userService;
    }


    @PostMapping(value = {"login"})
    public ResponseEntity login(@RequestBody AuthenticationRequestDto requestDto){
        try {
            String username = requestDto.getUsername();
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, requestDto.getPassword()));
            User user  = userService.findByUsername(username);

            if(user.equals(null)){
                throw new UsernameNotFoundException("User with username: "+username +" not found" );
            }
            String token  = jwtTokenProvider.createToken(user);

            Map<Object, Object> response = new HashMap<>();
            response.put("user", user);
            response.put("token", token);

            return ResponseEntity.ok(response);
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid username or password");

        }
    }

    @PostMapping(value = {"register"})
    public ResponseEntity register(@RequestBody RegistrationRequestDto registrationData){

        try {
            User user = registrationData.toUser();
            log.info("successfully user has been returned");
            userService.registerUser(user);
            String response= "User: " + user.getUsername()+" successfully registered";

            return ResponseEntity.ok(response);
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("This user or email already registered");
        }
    }

}
