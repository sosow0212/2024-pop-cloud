package com.api.map.application.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ShowCoordinateRequest(
        @NotNull(message = "검색 타입을 입력해주세요.")
        String searchTarget,

        @NotNull(message = "쇼의 id를 입력해주세요.")
        Long id,

        @NotBlank(message = "쇼의 title을 입력해주세요.")
        String title,

        @NotNull(message = "쇼의 도로명 주소를 입력해주세요.")
        String location,

        @NotNull(message = "쇼의 위도를 입력해주세요.")
        BigDecimal latitude,

        @NotNull(message = "쇼의 경도를 입력해주세요.")
        BigDecimal longitude,

        @NotNull(message = "쇼의 시작날짜를 입력해주세요.")
        LocalDateTime startDate,

        @NotNull(message = "쇼의 종료날짜를 입력해주세요.")
        LocalDateTime endDate,

        @NotNull(message = "방문자 수를 입력해주세요.")
        Integer visitedCount,

        @NotNull(message = "좋아요 수를 입력해주세요.")
        Integer likedCount
) {
}
