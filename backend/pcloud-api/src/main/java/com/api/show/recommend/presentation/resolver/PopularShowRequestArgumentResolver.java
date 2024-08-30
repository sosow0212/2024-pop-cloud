package com.api.show.recommend.presentation.resolver;

import com.api.show.popups.application.request.DateSearchRequest;
import com.api.show.recommend.presentation.annotation.PopularShowRequest;
import com.api.show.recommend.presentation.resolver.util.PopularShowRequestHelper;
import com.domain.show.common.ShowType;
import lombok.RequiredArgsConstructor;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
@Component
public class PopularShowRequestArgumentResolver implements HandlerMethodArgumentResolver {

    private static final String LIMIT_PARAMETER = "limit";
    private static final String START_DATE_PARAMETER = "startDate";
    private static final String END_DATE_PARAMETER = "endDate";
    private static final String TARGET = "target";

    private final PopularShowRequestHelper popularShowRequestHelper;

    @Override
    public boolean supportsParameter(final MethodParameter parameter) {
        return parameter.hasParameterAnnotation(PopularShowRequest.class) &&
                parameter.getParameterType().equals(DateSearchRequest.class);
    }

    @Override
    public Object resolveArgument(
            final MethodParameter parameter,
            final ModelAndViewContainer mavContainer,
            final NativeWebRequest webRequest,
            final WebDataBinderFactory binderFactory
    ) {
        PopularShowRequest annotation = parameter.getParameterAnnotation(PopularShowRequest.class);
        DateTimeFormatter formatter = findDateTimeFormatterFromAnnotation(annotation);

        String limitParam = webRequest.getParameter(LIMIT_PARAMETER);
        String startDateParam = webRequest.getParameter(START_DATE_PARAMETER);
        String endDateParam = webRequest.getParameter(END_DATE_PARAMETER);
        String targetParam = webRequest.getParameter(TARGET);
        popularShowRequestHelper.validateParameterRequirement(startDateParam);

        int limit = popularShowRequestHelper.parseLimit(limitParam);
        List<ShowType> showTypes = popularShowRequestHelper.findShowTypes(targetParam);

        LocalDateTime startDate = popularShowRequestHelper.parseLocalDateTime(startDateParam, formatter);
        LocalDateTime endDate = popularShowRequestHelper.parseLocalDateTime(endDateParam, formatter);
        popularShowRequestHelper.validateDateRange(startDate, endDate);

        return new DateSearchRequest(limit, startDate, endDate, showTypes);
    }

    private DateTimeFormatter findDateTimeFormatterFromAnnotation(final PopularShowRequest annotation) {
        String datePattern = Objects.requireNonNull(annotation).pattern();
        return DateTimeFormatter.ofPattern(datePattern);
    }
}
