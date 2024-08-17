package com.batch.config.moduleutils;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@PropertySource(
        value = {
                "classpath:application-common-${spring.profiles.active}.yml",
                "classpath:application-domain-${spring.profiles.active}.yml",
                "classpath:application-infrastructure-${spring.profiles.active}.yml"
        },
        factory = YamlPropertySourceFactory.class
)
@Configuration
public class PropertySourceScanConfig {
}
