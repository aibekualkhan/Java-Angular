package kz.iitu.backend.service;

import kz.iitu.backend.model.User;

import java.util.List;

public interface UserService {

    User registerUser(User user);

    List<User> getAll();

    User registerPsychologist(User user);

    User findByUsername(String username);

    User findById(Long id);

    void deleteUser(Long id);

}
