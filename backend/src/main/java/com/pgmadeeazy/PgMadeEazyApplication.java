package com.pgmadeeazy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import com.pgmadeeazy.properties.CloudinaryProperties;

@SpringBootApplication
@EnableConfigurationProperties(CloudinaryProperties.class)
public class PgMadeEazyApplication {
    public static void main(String[] args) {
        SpringApplication.run(PgMadeEazyApplication.class, args);
    }
}