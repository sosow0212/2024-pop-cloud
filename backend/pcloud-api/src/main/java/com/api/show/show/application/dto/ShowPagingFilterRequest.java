package com.api.show.show.application.dto;

import com.domain.common.ShowType;
import com.domain.show.common.PublicTag;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;

public record ShowPagingFilterRequest(
        Long showId,
        Integer pageSize,
        ShowType showType,
        List<PublicTag> publicTags,
        List<String> cities,
        LocalDateTime startDate,
        LocalDateTime endDate
) {

    public static ShowPagingFilterRequest of(
            final Long showId,
            final Integer pageSize,
            String showType,
            final List<String> publicTags,
            final String city,
            final List<String> country,
            String startDate,
            String endDate
    ) {
        showType = showType.toLowerCase();
        validateNotSupportedTag(showType);
        return new ShowPagingFilterRequest(
                showId,
                pageSize,
                ShowType.from(showType),
                convertPublicTags(publicTags),
                convertCities(city, country),
                parseDate(startDate).toLocalDate().atTime(LocalTime.MIN),
                parseDate(endDate).toLocalDate().atTime(LocalTime.MAX)
        );
    }

    private static void validateNotSupportedTag(final String showType) {
        if (showType.equals("all")) {
            throw new IllegalArgumentException("아직 지원하지 않는 태그입니다.");
        }
    }

    private static List<String> convertCities(final String city, final List<String> country) {
        if (city == null || !validateStringType(city)) {
            return Collections.emptyList();
        }

        return country.stream()
                .filter(ShowPagingFilterRequest::validateStringType)
                .map(it -> String.format("%s %s", city, it))
                .toList();
    }

    private static boolean validateStringType(final String country) {
        return !country.isBlank() && !country.isEmpty();
    }

    private static List<PublicTag> convertPublicTags(final List<String> publicTags) {
        return publicTags.stream()
                .map(PublicTag::from)
                .toList();
    }

    private static LocalDateTime parseDate(final String date) {
        String type = "yyyy-MM-dd";
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(type);

        if (date == null || date.isBlank()) {
            return LocalDateTime.now();
        }

        LocalDate localDate = LocalDate.parse(date, formatter);
        return localDate.atStartOfDay();
    }
}
