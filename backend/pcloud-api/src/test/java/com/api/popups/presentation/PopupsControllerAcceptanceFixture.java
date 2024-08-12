package com.api.popups.presentation;

import com.api.helper.IntegrationHelper;
import com.common.auth.TokenProvider;
import com.domain.domains.member.domain.Member;
import com.domain.domains.member.domain.MemberRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.springframework.beans.factory.annotation.Autowired;

import static member.fixture.MemberFixture.어드민_멤버_생성_id_없음_kakao_oauth_가입;
import static member.fixture.MemberFixture.일반_멤버_생성_id_없음;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class PopupsControllerAcceptanceFixture extends IntegrationHelper {

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    protected MemberRepository memberRepository;

    protected String 일반_유저_토큰;
    protected String 관리자_토큰;

    @BeforeEach
    void initMembers() {
        Member normalMember = memberRepository.save(일반_멤버_생성_id_없음());
        Member adminMember = memberRepository.save(어드민_멤버_생성_id_없음_kakao_oauth_가입());
        일반_유저_토큰 = tokenProvider.create(normalMember.getId());
        관리자_토큰 = tokenProvider.create(adminMember.getId());
    }
}
