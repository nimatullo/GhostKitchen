package com.example.ghostkitchen.repo;

import com.example.ghostkitchen.model.Account;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface AccountRepo extends CrudRepository<Account, Long> {

    Optional<Account> findByEmail(String email);

    boolean existsAccountByEmail(String email);

}
