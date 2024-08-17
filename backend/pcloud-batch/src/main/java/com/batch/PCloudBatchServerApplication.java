package com.batch;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@ConfigurationPropertiesScan
@SpringBootApplication
public class PCloudBatchServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(PCloudBatchServerApplication.class, args);
    }
}
