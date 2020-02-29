package com.example.ghostkitchen.repo;

import com.example.ghostkitchen.model.Account;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepo extends CrudRepository<Account, Long> {

    Optional<Account> findByEmail(String email);

    boolean existsAccountByEmail(String email);

}
