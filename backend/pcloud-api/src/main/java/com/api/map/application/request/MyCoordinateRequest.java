package com.api.map.application.request;

import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record MyCoordinateRequest(

        @NotNull(message = "위도(가로선)을 입력해주세요.")
        BigDecimal latitude,

        @NotNull(message = "경도(세로선)을 입력해주세요.")
        BigDecimal longitude
) {
}
