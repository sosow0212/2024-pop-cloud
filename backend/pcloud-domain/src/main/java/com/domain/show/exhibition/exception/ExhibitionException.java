package com.domain.show.exhibition.exception;

import com.common.exception.CustomException;
import com.common.exception.CustomExceptionType;

public class ExhibitionException extends CustomException {

    private final ExhibitionExceptionType exhibitionExceptionType;

    public ExhibitionException(final ExhibitionExceptionType exhibitionExceptionType) {
        super(exhibitionExceptionType);
        this.exhibitionExceptionType = exhibitionExceptionType;
    }

    @Override
    public CustomExceptionType getExceptionType() {
        return exhibitionExceptionType;
    }
}
