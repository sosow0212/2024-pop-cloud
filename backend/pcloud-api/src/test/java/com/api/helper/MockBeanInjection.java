package com.api.helper;

import com.api.auth.application.AuthService;
import com.api.global.aop.OptimisticLockRetryAspect;
import com.api.global.config.interceptor.auth.support.AuthenticationContext;
import com.api.show.exhibition.application.ExhibitionQueryService;
import com.api.show.exhibition.application.ExhibitionService;
import com.api.show.popups.application.PopupsQueryService;
import com.api.show.popups.application.PopupsService;
import com.api.show.recommend.application.RecommendService;
import com.api.show.recommend.presentation.resolver.PopularShowRequestArgumentResolver;
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
    protected OptimisticLockRetryAspect optimisticLockRetryAspect;

    @MockBean
    protected PopularShowRequestArgumentResolver popularShowRequestArgumentResolver;

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

    @MockBean
    protected RecommendService recommendService;
}
