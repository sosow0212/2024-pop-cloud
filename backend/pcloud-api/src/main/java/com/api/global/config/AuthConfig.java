package com.api.global.config;

import com.api.global.config.interceptor.auth.LoginValidCheckerInterceptor;
import com.api.global.config.interceptor.auth.ParseMemberIdFromTokenInterceptor;
import com.api.global.config.interceptor.auth.PathMatcherInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import static com.api.global.config.interceptor.auth.support.HttpMethod.DELETE;
import static com.api.global.config.interceptor.auth.support.HttpMethod.OPTIONS;
import static com.api.global.config.interceptor.auth.support.HttpMethod.PATCH;
import static com.api.global.config.interceptor.auth.support.HttpMethod.POST;

@RequiredArgsConstructor
@Configuration
public class AuthConfig implements WebMvcConfigurer {

    private final ParseMemberIdFromTokenInterceptor parseMemberIdFromTokenInterceptor;
    private final LoginValidCheckerInterceptor loginValidCheckerInterceptor;

    @Override
    public void addInterceptors(final InterceptorRegistry registry) {
        registry.addInterceptor(parseMemberIdFromTokenInterceptor());
        registry.addInterceptor(loginValidCheckerInterceptor());
    }

    private HandlerInterceptor parseMemberIdFromTokenInterceptor() {
        return new PathMatcherInterceptor(parseMemberIdFromTokenInterceptor)
                .excludePathPattern("/**", OPTIONS);
    }

    private HandlerInterceptor loginValidCheckerInterceptor() {
        return new PathMatcherInterceptor(loginValidCheckerInterceptor)
                .excludePathPattern("/**", OPTIONS)
                .addPathPatterns("/popups/**", POST, PATCH, DELETE)
                .addPathPatterns("/exhibitions/**", POST, PATCH, DELETE);
    }
}
