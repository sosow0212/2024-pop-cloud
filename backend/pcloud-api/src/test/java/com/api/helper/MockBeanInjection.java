package com.api.helper;

import com.api.auth.application.AuthService;
import com.api.exhibition.application.ExhibitionQueryService;
import com.api.exhibition.application.ExhibitionService;
import com.api.global.config.interceptor.auth.support.AuthenticationContext;
import com.api.popups.application.PopupsQueryService;
import com.api.popups.application.PopupsService;
import com.common.auth.TokenProvider;
import com.domain.member.domain.MemberRepository;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;

@MockBean(JpaMetamodelMappingContext.class)
public class MockBeanInjection {

    @MockBean
    protected TokenProvider tokenProvider;

    @MockBean
    protected AuthenticationContext authenticationContext;

    @MockBean
    protected AuthService authService;

    @MockBean
    protected MemberRepository memberRepository;

    @MockBean
    protected PopupsService popupsService;

    @MockBean
    protected PopupsQueryService popupsQueryService;

    @MockBean
    protected ExhibitionService exhibitionService;

    @MockBean
    protected ExhibitionQueryService exhibitionQueryService;
}
