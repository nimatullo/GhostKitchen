package com.example.ghostkitchen;

import com.example.ghostkitchen.config.PictureStorageProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({PictureStorageProperties.class})
public class GhostKitchenApplication {
	public static void main(String[] args) {
		SpringApplication.run(GhostKitchenApplication.class, args);
	}

}
