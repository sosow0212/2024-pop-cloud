package com.domain.map.exception;

import com.common.exception.CustomException;
import com.common.exception.CustomExceptionType;

public class MapException extends CustomException {

    private final MapExceptionType mapExceptionType;

    public MapException(final MapExceptionType mapExceptionType) {
        super(mapExceptionType);
        this.mapExceptionType = mapExceptionType;
    }

    @Override
    public CustomExceptionType getExceptionType() {
        return mapExceptionType;
    }
}
