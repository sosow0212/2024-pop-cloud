package com.domain.show.common.image.exception;

import com.common.exception.CustomException;
import com.common.exception.CustomExceptionType;

public class ImageException extends CustomException {

    private final ImageExceptionType imageExceptionType;

    public ImageException(final ImageExceptionType imageExceptionType) {
        super(imageExceptionType);
        this.imageExceptionType = imageExceptionType;
    }

    @Override
    public CustomExceptionType getExceptionType() {
        return imageExceptionType;
    }
}
