package com.api.map.application.request;

import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record MyCoordinateRequestWithDelta(

        @NotNull(message = "위도(가로선)을 입력해주세요.")
        BigDecimal latitude,

        @NotNull(message = "경도(세로선)을 입력해주세요.")
        BigDecimal longitude,

        @NotNull(message = "위도의 Delta값을 입력해주세요.")
        BigDecimal latitudeDelta,

        @NotNull(message = "경도의 Delta값을 입력해주세요.")
        BigDecimal longitudeDelta
) {
}
