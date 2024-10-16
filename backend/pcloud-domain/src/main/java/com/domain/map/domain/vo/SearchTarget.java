package com.domain.map.domain.vo;

import java.util.Arrays;

public enum SearchTarget {

    POPUPS("popups"),
    EXHIBITION("exhibition"),
    ALL("all");

    private final String name;

    SearchTarget(final String name) {
        this.name = name;
    }

    public static SearchTarget from(final String name) {
        return Arrays.stream(values())
                .filter(value -> value.name.equals(name))
                .findAny()
                .orElse(ALL);
    }
}

