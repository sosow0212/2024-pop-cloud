package com.domain.annotation;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Import;

import java.awt.*;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Import(value = {Component.class, RequiredArgsConstructor.class})
public @interface DomainService {
}
