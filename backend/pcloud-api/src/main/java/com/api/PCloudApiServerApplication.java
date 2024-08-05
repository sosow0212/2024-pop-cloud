package com.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@ConfigurationPropertiesScan
@SpringBootApplication
public class PCloudApiServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(PCloudApiServerApplication.class, args);
    }
}
