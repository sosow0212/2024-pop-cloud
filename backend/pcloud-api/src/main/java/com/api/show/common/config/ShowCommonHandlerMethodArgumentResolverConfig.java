package com.api.show.common.config;

import com.api.show.common.resolver.ClientIpFinderResolver;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@RequiredArgsConstructor
@Configuration
public class ShowCommonHandlerMethodArgumentResolverConfig implements WebMvcConfigurer {

    private final ClientIpFinderResolver clientIpFinderResolver;

    @Override
    public void addArgumentResolvers(final List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(clientIpFinderResolver);
    }
}
