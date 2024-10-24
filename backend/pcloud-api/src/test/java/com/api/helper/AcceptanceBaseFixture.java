package com.api.helper;

import com.common.auth.TokenProvider;
import com.domain.member.domain.Member;
import com.domain.member.domain.MemberRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.springframework.beans.factory.annotation.Autowired;

import static member.fixture.MemberFixture.어드민_멤버_생성_id_없음_kakao_oauth_가입;
import static member.fixture.MemberFixture.일반_멤버_생성_id_없음;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
public class AcceptanceBaseFixture extends IntegrationHelper {

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    protected MemberRepository memberRepository;

    protected Member 일반_유저;
    protected Member 관리자;
    protected String 일반_유저_토큰;
    protected String 관리자_토큰;

    @BeforeEach
    void initMembers() {
        일반_유저 = memberRepository.save(일반_멤버_생성_id_없음());
        관리자 = memberRepository.save(어드민_멤버_생성_id_없음_kakao_oauth_가입());
        일반_유저_토큰 = tokenProvider.create(일반_유저.getId());
        관리자_토큰 = tokenProvider.create(관리자.getId());
    }
}
