package com.ssafy.em.common.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;

@Configuration
public class SwaggerConfig {

    private static final String SECURITY_SCHEME_NAME = "Authorization";

    @Bean
    public GroupedOpenApi api() {
        return GroupedOpenApi.builder()
                .group("all-api")
                .pathsToMatch("/**")
                .build();
    }

    @Bean
    public OpenAPI openAPI() {
        Info info = new Info()
                .title("이음(EM) - 지금 여기 감정의 순간을 기록하다")
                .version("v1.0.0")
                .description("이음(EM) API 명세서.");

        SecurityScheme bearerAuth = new SecurityScheme()
                .type(SecurityScheme.Type.HTTP)
                .scheme("bearer")
                .bearerFormat("JWT")
                .in(SecurityScheme.In.HEADER)
                .name(HttpHeaders.AUTHORIZATION);

        SecurityRequirement securityRequirement = new SecurityRequirement().addList(SECURITY_SCHEME_NAME);

        return new OpenAPI()
                .info(info)
                .components(new Components().addSecuritySchemes(SECURITY_SCHEME_NAME, bearerAuth))
                .addSecurityItem(securityRequirement)
                .addServersItem(new Server().url("http://localhost:8080").description("Local Server"))
                .addServersItem(new Server().url("https://j12a407.p.ssafy.io:3443").description("Dev Server"));
    }
}