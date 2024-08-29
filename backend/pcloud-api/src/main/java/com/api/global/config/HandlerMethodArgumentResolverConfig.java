package com.api.global.config;

import com.api.global.config.resolver.AuthMemberArgumentResolver;
import com.api.global.config.resolver.AuthMembersArgumentResolver;
import com.api.global.config.resolver.RequestForDateSearchArgumentResolver;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@RequiredArgsConstructor
@Configuration
public class HandlerMethodArgumentResolverConfig implements WebMvcConfigurer {

    private final AuthMemberArgumentResolver authMemberArgumentResolver;
    private final AuthMembersArgumentResolver authMembersArgumentResolver;
    private final RequestForDateSearchArgumentResolver requestForDateSearchArgumentResolver;

    @Override
    public void addArgumentResolvers(final List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(authMemberArgumentResolver);
        resolvers.add(authMembersArgumentResolver);
        resolvers.add(requestForDateSearchArgumentResolver);
    }
}
