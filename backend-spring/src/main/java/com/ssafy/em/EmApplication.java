package com.ssafy.em;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class EmApplication {

    public static void main(String[] args) {
        SpringApplication.run(EmApplication.class, args);
    }

}
