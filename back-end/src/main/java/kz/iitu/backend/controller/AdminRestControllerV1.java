package kz.iitu.backend.controller;

import kz.iitu.backend.dto.AdminUserDto;
import kz.iitu.backend.dto.RegistrationRequestDto;
import kz.iitu.backend.model.User;
import kz.iitu.backend.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/v1/admin/")
@Slf4j
public class AdminRestControllerV1 {

    private final UserService userService;

    @Autowired
    public AdminRestControllerV1(UserService userService){this.userService = userService;}

    @GetMapping(value = "users/{id}")
    public ResponseEntity<AdminUserDto> getUserById(@PathVariable(name = "id") Long id){
        User user = userService.findById(id);

        if(user == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        AdminUserDto result = AdminUserDto.fromUser(user);
        return new ResponseEntity<>(result, HttpStatus.OK);

    }

//    @PostMapping(value = {"createPsy"})
//    public ResponseEntity<AdminUserDto> createPsy(@RequestBody RegistrationRequestDto registrationData){
//        try {
//            User user = registrationData.toUser();
//            log.info("successfully user has been returned");
//            userService.registerUser(user);
//            String response= "User: " + user.getUsername()+" successfully registered";
//
//            return ResponseEntity.ok(response);
//        } catch (AuthenticationException e) {
//            throw new BadCredentialsException("This user or email already registered");
//        }
//    }



}
