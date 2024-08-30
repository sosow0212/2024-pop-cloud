package com.domain.show.recommend.exception;

import com.common.exception.CustomException;
import com.common.exception.CustomExceptionType;

public class RecommendException extends CustomException {

    private final RecommendExceptionType recommendExceptionType;

    public RecommendException(final RecommendExceptionType recommendExceptionType) {
        super(recommendExceptionType);
        this.recommendExceptionType = recommendExceptionType;
    }

    @Override
    public CustomExceptionType getExceptionType() {
        return recommendExceptionType;
    }
}
