package com.api.global.config.resolver;

import com.api.global.config.interceptor.auth.support.AuthenticationContext;
import com.common.exception.AuthException;
import com.common.exception.AuthExceptionType;
import com.domain.annotation.AuthMembers;
import com.domain.domains.member.domain.Member;
import com.domain.domains.member.domain.MemberRepository;
import com.domain.domains.member.domain.vo.MemberRole;
import com.domain.domains.member.exception.MemberException;
import com.domain.domains.member.exception.MemberExceptionType;
import lombok.RequiredArgsConstructor;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import java.util.Arrays;
import java.util.List;

import static java.util.Objects.requireNonNull;

@RequiredArgsConstructor
@Component
public class AuthMembersArgumentResolver implements HandlerMethodArgumentResolver {

    private static final int ANONYMOUS = -1;

    private final AuthenticationContext authenticationContext;
    private final MemberRepository memberRepository;

    @Override
    public boolean supportsParameter(final MethodParameter parameter) {
        return parameter.hasParameterAnnotation(AuthMembers.class) &&
                parameter.getParameterType().equals(Long.class);
    }

    @Override
    public Object resolveArgument(
            final MethodParameter parameter,
            final ModelAndViewContainer mavContainer,
            final NativeWebRequest webRequest,
            final WebDataBinderFactory binderFactory
    ) {
        Long memberId = authenticationContext.getPrincipal();

        if (memberId == ANONYMOUS) {
            throw new AuthException(AuthExceptionType.LOGIN_INVALID_EXCEPTION);
        }

        Member member = findMember(memberId);
        List<MemberRole> permittedRoles = getPermittedRoles(parameter);
        if (!permittedRoles.contains(member.getMemberRole())) {
            throw new AuthException(AuthExceptionType.FORBIDDEN_AUTH_LEVEL);
        }

        return memberId;
    }

    private Member findMember(final Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberException(MemberExceptionType.MEMBER_NOT_FOUND_EXCEPTION));
    }

    private List<MemberRole> getPermittedRoles(final MethodParameter parameter) {
        AuthMembers auths = parameter.getParameterAnnotation(AuthMembers.class);
        requireNonNull(auths);
        return Arrays.asList(auths.permit());
    }
}
