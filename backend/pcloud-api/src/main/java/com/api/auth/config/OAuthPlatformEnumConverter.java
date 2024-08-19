package com.api.auth.config;

import com.domain.member.domain.vo.OAuthPlatform;
import org.springframework.core.convert.converter.Converter;

public class OAuthPlatformEnumConverter implements Converter<String, OAuthPlatform> {

    @Override
    public OAuthPlatform convert(final String name) {
        return OAuthPlatform.findPlatform(name);
    }
}
