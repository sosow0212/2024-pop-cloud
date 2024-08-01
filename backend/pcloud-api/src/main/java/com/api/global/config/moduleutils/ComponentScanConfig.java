package com.api.global.config.moduleutils;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(value = {"com.common", "com.domain", "com.infrastructure"})
public class ComponentScanConfig {
}
