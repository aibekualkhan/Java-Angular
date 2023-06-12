package kz.iitu.backend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import kz.iitu.backend.model.User;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class RegistrationRequestDto {
    private String username;
    private String password;
    private String firstName;
    private String email;
    private String imageUrl;
    private String lastName;

    public User toUser(){
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);
        user.setImageUrl(imageUrl);
        return user;
    }
}
