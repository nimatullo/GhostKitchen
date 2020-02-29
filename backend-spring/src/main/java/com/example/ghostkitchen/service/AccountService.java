package com.example.ghostkitchen.service;

import com.example.ghostkitchen.model.Account;
import com.example.ghostkitchen.repo.AccountRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountService implements UserDetailsService {
    @Autowired
    AccountRepo repository;

    public Account findById(Long id) {
        Optional<Account> account = repository.findById(id);
        return account.orElse(null);
    }

    public List<Account> getAll() {
        return (List<Account>)repository.findAll();
    }

    public void create(Account account) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
        account.setPassword(encoder.encode(account.getPassword()));
        repository.save(account);
    }

    public Account findByEmail(String email) {
        Optional<Account> foundAccount = repository.findByEmail(email);
        return foundAccount.orElse(null);
    }

    public boolean existsAccountByEmail(String email) {
        return repository.existsAccountByEmail(email);
    }

    public void update(Account updatedAccount) {
        Account accountToBeUpdated = repository.findById(updatedAccount.getId()).get();
        accountToBeUpdated.setEmail(updatedAccount.getPassword());
        repository.save(accountToBeUpdated);
    }

    public void delete (Long id) {
        repository.delete(repository.findById(id).get());
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        Account foundAccount = findByEmail(s);
        if (foundAccount == null) {
            throw new UsernameNotFoundException(s);
        }
        else {
            return new MyUserPrincipal(foundAccount);
        }
    }
}
