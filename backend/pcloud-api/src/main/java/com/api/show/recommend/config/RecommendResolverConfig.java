package com.api.show.recommend.config;

import com.api.show.recommend.presentation.resolver.PopularShowRequestArgumentResolver;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@RequiredArgsConstructor
@Configuration
public class RecommendResolverConfig implements WebMvcConfigurer {

    private final PopularShowRequestArgumentResolver popularShowRequestArgumentResolver;

    @Override
    public void addArgumentResolvers(final List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(popularShowRequestArgumentResolver);
    }
}
