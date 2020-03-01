package com.example.ghostkitchen.repo;

import com.example.ghostkitchen.model.MenuItem;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

@Service
@Repository
public interface MenuItemRepo extends CrudRepository<MenuItem, Long> {
    @Override Iterable<MenuItem> findAll();
}
