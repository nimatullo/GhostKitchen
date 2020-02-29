package com.example.ghostkitchen;

import com.example.ghostkitchen.repo.AccountRepo;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackageClasses = AccountRepo.class)
public class GhostKitchenApplication {
	public static void main(String[] args) {
		SpringApplication.run(GhostKitchenApplication.class, args);
	}

}
