package com.api.show.common.resolver;

import com.api.show.common.annotation.ClientIpFinder;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
@Component
public class ClientIpFinderResolver implements HandlerMethodArgumentResolver {

    private static final List<String> IP_HEADER_TYPES = List.of(
            "X-Forwarded-For",
            "Proxy-Client-IP",
            "WL-Proxy-Client-IP",
            "HTTP_CLIENT_IP",
            "HTTP_X_FORWARDED_FOR"
    );

    @Override
    public boolean supportsParameter(final MethodParameter parameter) {
        return parameter.hasParameterAnnotation(ClientIpFinder.class) &&
                parameter.getParameterType().equals(String.class);
    }

    @Override
    public String resolveArgument(
            final MethodParameter parameter,
            final ModelAndViewContainer mavContainer,
            final NativeWebRequest webRequest,
            final WebDataBinderFactory binderFactory
    ) {
        HttpServletRequest httpServletRequest = (HttpServletRequest) webRequest.getNativeRequest();
        return findClientIp(httpServletRequest);
    }

    private String findClientIp(final HttpServletRequest request) {
        return IP_HEADER_TYPES.stream()
                .map(request::getHeader)
                .filter(Objects::nonNull)
                .findFirst()
                .orElseGet(request::getRemoteAddr);
    }
}
