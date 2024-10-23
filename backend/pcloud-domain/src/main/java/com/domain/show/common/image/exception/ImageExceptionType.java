package com.domain.show.common.image.exception;

import com.common.exception.CustomExceptionType;

public enum ImageExceptionType implements CustomExceptionType {

    UNSUPPORTED_IMAGE_FORMAT_EXCEPTION(400, "IMAGE001", "이미지 확장자 형식이 맞지 않습니다. jpg, jpeg, gif, bmp, png 확장자로 변경 후 재시도 해주세요."),
    FILE_UPLOAD_FAILURE_EXCEPTION(500, "IMAGE002", "이미지 업로드에 실패했습니다."),
    ;

    private final int httpStatusCode;
    private final String customCode;
    private final String message;

    ImageExceptionType(
            final int httpStatusCode,
            final String customCode,
            final String message
    ) {
        this.httpStatusCode = httpStatusCode;
        this.customCode = customCode;
        this.message = message;
    }

    @Override
    public String message() {
        return this.message;
    }

    @Override
    public int httpStatusCode() {
        return this.httpStatusCode;
    }

    @Override
    public String customCode() {
        return this.customCode;
    }
}
