package com.ssafy.em.common.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Value("${python.server-url}")
    private String PYTHON_SERVER_URL;
    @Value("${super-token}")
    private String SUPER_TOKEN;

    @Bean
    public WebClient webClient(){
        return WebClient.builder()
                .defaultHeader(HttpHeaders.AUTHORIZATION, SUPER_TOKEN)
                .baseUrl(PYTHON_SERVER_URL)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }
}
