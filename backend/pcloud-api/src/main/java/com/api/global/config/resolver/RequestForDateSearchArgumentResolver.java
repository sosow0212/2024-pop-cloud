package com.api.global.config.resolver;

import com.api.show.annotation.RequestForDateSearch;
import com.api.show.popups.application.request.DateSearchRequest;
import com.domain.show.common.ShowType;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RequiredArgsConstructor
@Component
public class RequestForDateSearchArgumentResolver implements HandlerMethodArgumentResolver {

    private static final String LIMIT_PARAMETER = "limit";
    private static final String START_DATE_PARAMETER = "startDate";
    private static final String END_DATE_PARAMETER = "endDate";
    private static final String TARGET = "target";
    private static final String DELIMITER = ",";

    @Override
    public boolean supportsParameter(final MethodParameter parameter) {
        return parameter.hasParameterAnnotation(RequestForDateSearch.class) &&
                parameter.getParameterType().equals(DateSearchRequest.class);
    }

    @Override
    public Object resolveArgument(
            final MethodParameter parameter,
            final ModelAndViewContainer mavContainer,
            final NativeWebRequest webRequest,
            final WebDataBinderFactory binderFactory
    ) throws Exception {
        String limitParam = webRequest.getParameter(LIMIT_PARAMETER);
        String startDateParam = webRequest.getParameter(START_DATE_PARAMETER);
        String endDateParam = webRequest.getParameter(END_DATE_PARAMETER);
        String targetParam = webRequest.getParameter(TARGET);

        validateParams(limitParam, startDateParam);

        RequestForDateSearch annotation = parameter.getParameterAnnotation(RequestForDateSearch.class);
        String datePattern = annotation.pattern();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(datePattern);

        int limit = Integer.parseInt(limitParam);
        LocalDateTime startDate = parseDate(startDateParam, formatter);
        LocalDateTime endDate = parseDate(endDateParam, formatter);
        validateDateRange(startDate, endDate);
        List<ShowType> showTypes = findShowTypes(targetParam);

        return new DateSearchRequest(limit, startDate, endDate, showTypes);
    }

    private void validateParams(final String limitParam, final String startDateParam) throws BadRequestException {
        if (limitParam == null) {
            throw new BadRequestException("limit 파라미터는 필수입니다.");
        }

        if (startDateParam == null) {
            throw new BadRequestException("조건 범위의 시작날짜는 필수입니다.");
        }
    }

    private LocalDateTime parseDate(final String date, final DateTimeFormatter formatter) throws BadRequestException {
        if (date != null) {
            try {
                LocalDate localDate = LocalDate.parse(date, formatter);
                return localDate.atStartOfDay();
            } catch (final Exception e) {
                throw new BadRequestException("날짜 형식이 맞지 않습니다. ex.yyyy-MM-dd");
            }
        }

        return LocalDateTime.now();
    }

    private void validateDateRange(final LocalDateTime startDate, final LocalDateTime endDate) throws BadRequestException {
        if (startDate.isAfter(endDate)) {
            throw new BadRequestException("시작날짜가 종료날짜보다 앞설 수 없습니다.");
        }
    }

    private List<ShowType> findShowTypes(final String targetParam) {
        if (targetParam == null) {
            return List.of(ShowType.ALL);
        }

        return findNotDuplicatedTargetFromParam(targetParam);
    }

    private List<ShowType> findNotDuplicatedTargetFromParam(final String targetParam) {
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
}
