package com.domain.map.domain.vo;

import com.domain.map.exception.MapException;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import java.util.Arrays;

import static com.domain.map.exception.MapExceptionType.RECOMMEND_TYPE_INVALID_EXCEPTION;

public enum RecommendType {

    SHORTEST("shortest"),
    POPULAR("popular");

    private final String name;

    RecommendType(final String name) {
        this.name = name;
    }

    @JsonCreator
    public static RecommendType from(final String name) {
        String lowerCaseName = name.toLowerCase();

        return Arrays.stream(values())
                .filter(recommendType -> recommendType.name.equals(lowerCaseName))
                .findAny()
                .orElseThrow(() -> new MapException(RECOMMEND_TYPE_INVALID_EXCEPTION));
    }

    @JsonValue
    public String getName() {
        return name;
    }
}
