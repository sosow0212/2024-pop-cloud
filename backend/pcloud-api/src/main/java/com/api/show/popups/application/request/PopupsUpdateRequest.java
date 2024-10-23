package com.api.show.popups.application.request;

import com.domain.show.popups.domain.Popups;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

public record PopupsUpdateRequest(
        @NotBlank(message = "팝업스토어 제목을 입력해주세요.")
        String title,

        @NotBlank(message = "팝업스토어 설명을 입력해주세요.")
        String description,

        @NotNull(message = "팝업스토어 시작일을 입력해주세요.")
        LocalDateTime startDate,

        @NotNull(message = "팝업스토어 종료일을 입력해주세요.")
        LocalDateTime endDate,

        @NotBlank(message = "팝업스토어 운영 시간을 입력해주세요.")
        String openTimes,

        @NotBlank(message = "팝업스토어 개최 장소를 입력해주세요.")
        String location,

        @NotBlank(message = "팝업스토어 위도 정보를 입력해세요.")
        String latitude,

        @NotBlank(message = "팝업스토어 경도 정보를 입력해주세요.")
        String longitude,

        @NotNull(message = "팝업스토어 주차 가능 여부를 입력해주세요.")
        Boolean isParkingAvailable,

        @NotNull(message = "팝업스토어 식음료 반입 여부를 입력해주세요.")
        Boolean isFoodAllowed,

        @NotNull(message = "팝업스토어 반려 동물 출입 가능 여부를 입력해주세요.")
        Boolean isPetAllowed,

        @NotNull(message = "팝업스토어 키즈존 유무 정보를 입력해주세요.")
        Boolean isKidsZone,

        @NotNull(message = "팝업스토어 와이파이 사용 가능 여부를 입력해주세요.")
        Boolean isWifiAvailable,

        @NotNull(message = "팝업스토어 요금 정보를 입력해주세요.")
        Integer fee,

        @NotBlank(message = "팝업스토어 퍼블릭 태그를 붙여주세요.")
        String publicTag,

        @NotEmpty(message = "팝업스토어 커스텀 태그를 붙여주세요.")
        List<String> tags,

        List<MultipartFile> addedImages,

        List<Long> deletedImageIds
) {

    public Popups toDomain(final Long memberId) {
        return Popups.of(
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
