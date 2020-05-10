package com.example.ghostkitchen.service;

import com.example.ghostkitchen.config.PictureStorageProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileStorageService {
    private final Path fileStorageLocation;

    @Autowired
    public FileStorageService(PictureStorageProperties pictureStorageProperties) {
        this.fileStorageLocation = Paths.get(pictureStorageProperties.getUploadDir()).toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public String storeFile(MultipartFile file, UUID uniqueName) {
        String fileName = StringUtils.cleanPath(String.format("%s.png", uniqueName));

        try {
            if (fileName.contains("..")) {
                throw new RuntimeException("File contains invalid ");
            }

            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation,StandardCopyOption.REPLACE_EXISTING);
            return fileName;

        } catch (IOException e) {
            throw new RuntimeException("IO exception");
        }
    }

    public Resource loadFile(String fileName) {
        try {
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return resource;
            }
            else {
                throw new RuntimeException("FIle not found");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("File not found");
        }
    }
}
