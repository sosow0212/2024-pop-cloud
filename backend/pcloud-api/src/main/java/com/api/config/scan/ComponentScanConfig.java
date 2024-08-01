package com.api.config.scan;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(value = {"com.common", "com.domain", "com.infrastructure"})
public class ComponentScanConfig {
}
