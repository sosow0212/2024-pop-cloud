package com.domain.domains.popups.exception;

import com.common.exception.CustomException;
import com.common.exception.CustomExceptionType;

public class PopupsException extends CustomException {

    private final PopupsExceptionType popupsExceptionType;

    public PopupsException(final PopupsExceptionType popupsExceptionType) {
        super(popupsExceptionType);
        this.popupsExceptionType = popupsExceptionType;
    }

    @Override
    public CustomExceptionType getExceptionType() {
        return popupsExceptionType;
    }
}
