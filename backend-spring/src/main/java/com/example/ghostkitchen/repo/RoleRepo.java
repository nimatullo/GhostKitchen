package com.example.ghostkitchen.repo;

import com.example.ghostkitchen.model.Role;
import com.example.ghostkitchen.model.RoleName;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Repository
@Service
public interface RoleRepo extends CrudRepository<Role, Long> {
    Optional<Role> findByName(RoleName roleName);
}
