package com.example.ghostkitchen.repo;

import com.example.ghostkitchen.model.Role;
import com.example.ghostkitchen.model.RoleName;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepo extends CrudRepository<Role, Long> {
    Optional<Role> findByName(RoleName roleName);
}
