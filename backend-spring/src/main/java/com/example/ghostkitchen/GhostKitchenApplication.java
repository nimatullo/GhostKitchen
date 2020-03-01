package com.example.ghostkitchen;

import com.example.ghostkitchen.repo.MenuItemRepo;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
public class GhostKitchenApplication {
	public static void main(String[] args) {
		SpringApplication.run(GhostKitchenApplication.class, args);
	}

}
