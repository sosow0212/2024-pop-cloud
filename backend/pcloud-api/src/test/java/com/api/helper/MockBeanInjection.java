package com.api.helper;

import com.api.auth.presentation.support.OAuthArgumentResolver;
import com.api.global.config.interceptor.auth.support.AuthenticationContext;
import com.api.member.application.MemberService;
import com.common.auth.TokenProvider;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;

@MockBean(JpaMetamodelMappingContext.class)
public class MockBeanInjection {

    @MockBean
    protected TokenProvider tokenProvider;

    @MockBean
    protected AuthenticationContext authenticationContext;

    @MockBean
    protected OAuthArgumentResolver oAuthArgumentResolver;

    @MockBean
    protected MemberService memberService;
}
