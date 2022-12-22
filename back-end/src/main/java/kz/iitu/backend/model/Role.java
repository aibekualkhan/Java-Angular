package kz.iitu.backend.model;


import lombok.Data;

import jakarta.persistence.*;

@Entity
@Table(name = "roles")
@Data
public class Role extends BaseEntity{

    @Column(name = "role_name")
    private String roleName;

    @Override
    public String toString() {
        return "Role{" +
                "id: " + super.getId() + ", " +
                "name: " + roleName + "}";
    }
}
