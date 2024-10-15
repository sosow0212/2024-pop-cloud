package com.api.map.config;

import com.domain.map.domain.vo.SearchTarget;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class SearchTargetConverter implements Converter<String, SearchTarget> {

    @Override
    public SearchTarget convert(final String source) {
        return SearchTarget.from(source.toLowerCase());
    }
}
