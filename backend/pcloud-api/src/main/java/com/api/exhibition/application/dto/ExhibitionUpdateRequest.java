package com.api.exhibition.application.dto;

import com.domain.exhibition.domain.Exhibition;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

public record ExhibitionUpdateRequest(

        @NotBlank(message = "개인전시회 제목을 입력해주세요.")
        String title,

        @NotBlank(message = "개인전시회 설명을 입력해주세요.")
        String description,

        @NotNull(message = "개인전시회 시작일을 입력해주세요.")
        LocalDateTime startDate,

        @NotNull(message = "개인전시회 종료일을 입력해주세요.")
        LocalDateTime endDate,

        @NotBlank(message = "개인전시회 운영 시간을 입력해주세요.")
        String openTimes,

        @NotBlank(message = "개인전시회 개최 장소를 입력해주세요.")
        String location,

        @NotBlank(message = "개인전시회 위도 정보를 입력해세요.")
        String latitude,

        @NotBlank(message = "개인전시회 경도 정보를 입력해주세요.")
        String longitude,

        @NotNull(message = "개인전시회 주차 가능 여부를 입력해주세요.")
        Boolean isParkingAvailable,

        @NotNull(message = "개인전시회 식음료 반입 여부를 입력해주세요.")
        Boolean isFoodAllowed,

        @NotNull(message = "개인전시회 반려 동물 출입 가능 여부를 입력해주세요.")
        Boolean isPetAllowed,

        @NotNull(message = "개인전시회 키즈존 유무 정보를 입력해주세요.")
        Boolean isKidsZone,

        @NotNull(message = "개인전시회 와이파이 사용 가능 여부를 입력해주세요.")
        Boolean isWifiAvailable,

        @NotNull(message = "개인전시회 요금 정보를 입력해주세요.")
        Integer fee,

        @NotBlank(message = "개인전시회 퍼블릭 태그를 붙여주세요.")
        String publicTag,

        List<String> tags
) {

    public Exhibition toDomain(final Long memberId) {
        return Exhibition.of(
                memberId,
                title,
                description,
                startDate,
                endDate,
                openTimes,
                location,
                latitude,
                longitude,
                isParkingAvailable,
                isFoodAllowed,
                isPetAllowed,
                isKidsZone,
                isWifiAvailable,
                fee,
                publicTag
        );
    }
}
