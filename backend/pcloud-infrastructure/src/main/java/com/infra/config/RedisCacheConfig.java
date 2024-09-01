package com.infra.config;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.jsontype.BasicPolymorphicTypeValidator;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

@EnableCaching
@Configuration
public class RedisCacheConfig {

    private static final long HOUR = 1L;
    private static final long DAY = 24L;

    @Bean
    public CacheManager contentCacheManager(final RedisConnectionFactory redisConnectionFactory) {
        RedisCacheConfiguration cacheDefault = RedisCacheConfiguration.defaultCacheConfig()
                .serializeKeysWith(RedisSerializationContext
                        .SerializationPair
                        .fromSerializer(new StringRedisSerializer())
                ).serializeValuesWith(RedisSerializationContext.SerializationPair
                        .fromSerializer(getGenericJackson2JsonRedisSerializer())
                ).entryTtl(makeCacheTTLByHour(HOUR));

        Map<String, RedisCacheConfiguration> configurations = makeConfigurations(cacheDefault);

        return RedisCacheManager.RedisCacheManagerBuilder
                .fromConnectionFactory(redisConnectionFactory)
                .cacheDefaults(cacheDefault)
                .withInitialCacheConfigurations(configurations)
                .build();
    }

    private GenericJackson2JsonRedisSerializer getGenericJackson2JsonRedisSerializer() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.activateDefaultTyping(
                BasicPolymorphicTypeValidator.builder()
                        .allowIfSubType(Object.class)
                        .build(),
                ObjectMapper.DefaultTyping.NON_FINAL,
                JsonTypeInfo.As.PROPERTY
        );

        return new GenericJackson2JsonRedisSerializer(objectMapper);
    }

    private Duration makeCacheTTLByHour(final Long hour) {
        return Duration.ofHours(hour);
    }

    private Map<String, RedisCacheConfiguration> makeConfigurations(final RedisCacheConfiguration cacheDefault) {
        Map<String, RedisCacheConfiguration> configurations = new HashMap<>();
        configurations.put("popularShowsCache", cacheDefault.entryTtl(makeCacheTTLByHour(DAY)));
        return configurations;
    }
}
