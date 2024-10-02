package com.api.show.show.application.dto;

import com.domain.show.common.PublicTag;
import com.domain.show.common.ShowType;

import java.util.Collections;
import java.util.List;

public record ShowPagingQueryRequest(
        Long showId,
        Integer pageSize,
        ShowType showType,
        List<PublicTag> publicTags,
        List<String> cities
) {

    public static ShowPagingQueryRequest of(
            final Long showId,
            final Integer pageSize,
            String showType,
            final List<String> publicTags,
            final String city,
            final List<String> country
    ) {
        showType = showType.toLowerCase();
        validateNotSupportedTag(showType);
        return new ShowPagingQueryRequest(
                showId,
                pageSize,
                ShowType.from(showType),
                convertPublicTags(publicTags),
                convertCities(city, country)
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
                .filter(ShowPagingQueryRequest::validateStringType)
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
}
