package com.api.show.recommend.presentation.resolver.util;

import com.domain.show.common.ShowType;
import com.domain.show.recommend.exception.RecommendException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static com.domain.show.recommend.exception.RecommendExceptionType.DATE_FORMAT_INVALID_EXCEPTION;
import static com.domain.show.recommend.exception.RecommendExceptionType.LIMIT_PARAM_NOT_NUMBER_EXCEPTION;
import static com.domain.show.recommend.exception.RecommendExceptionType.START_DATE_AFTER_END_DATE_EXCEPTION;
import static com.domain.show.recommend.exception.RecommendExceptionType.START_PARAM_DATE_NULL_EXCEPTION;

public class PopularShowRequestHelper {

    private static final String DELIMITER = ",";
    private static final int DEFAULT_LIMIT_SIZE = 5;

    public static void validateParameterRequirement(final String startDateParam) {
        if (startDateParam == null || startDateParam.isBlank()) {
            throw new RecommendException(START_PARAM_DATE_NULL_EXCEPTION);
        }
    }

    public static void validateDateRange(final LocalDateTime startDate, final LocalDateTime endDate) {
        if (startDate.isAfter(endDate)) {
            throw new RecommendException(START_DATE_AFTER_END_DATE_EXCEPTION);
        }
    }

    public static List<ShowType> findShowTypes(final String targetParam) {
        if (targetParam == null) {
            return List.of(ShowType.ALL);
        }

        return findNotDuplicatedTargetFromParam(targetParam);
    }

    private static List<ShowType> findNotDuplicatedTargetFromParam(final String targetParam) {
        Set<ShowType> notDuplicatedShowTypes = new HashSet<>();

        for (String target : targetParam.split(DELIMITER)) {
            ShowType type = ShowType.from(target.trim());
            notDuplicatedShowTypes.add(type);
        }

        ArrayList<ShowType> showTypes = new ArrayList<>(notDuplicatedShowTypes);

        if (showTypes.contains(ShowType.ALL) || showTypes.containsAll(List.of(ShowType.EXHIBITION, ShowType.POPUPS))) {
            return List.of(ShowType.ALL);
        }

        return new ArrayList<>(notDuplicatedShowTypes);
    }

    public static int parseLimit(final String limit) {
        if (limit == null || limit.isBlank()) {
            return DEFAULT_LIMIT_SIZE;
        }

        validateNumeric(limit);

        return Integer.parseInt(limit);
    }

    private static void validateNumeric(final String limit) {
        boolean containsAllDigit = limit.chars()
                .allMatch(Character::isDigit);

        if (!containsAllDigit) {
            throw new RecommendException(LIMIT_PARAM_NOT_NUMBER_EXCEPTION);
        }
    }

    public static LocalDateTime parseLocalDateTime(final String date, final DateTimeFormatter formatter) {
        if (date == null || date.isBlank()) {
            return LocalDateTime.now();
        }

        try {
            LocalDate localDate = LocalDate.parse(date, formatter);
            return localDate.atStartOfDay();
        } catch (final Exception e) {
            throw new RecommendException(DATE_FORMAT_INVALID_EXCEPTION);
        }
    }
}
