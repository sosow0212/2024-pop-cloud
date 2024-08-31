package com.domain.show.common;

import java.util.Arrays;

public enum ShowType {

    POPUPS("popups"),
    EXHIBITION("exhibition"),
    ALL("all");

    private final String name;

    ShowType(final String name) {
        this.name = name;
    }

    public static ShowType from(final String name) {
        return Arrays.stream(values())
                .filter(value -> value.name.equals(name))
                .findAny()
                .orElse(ALL);
    }
}
