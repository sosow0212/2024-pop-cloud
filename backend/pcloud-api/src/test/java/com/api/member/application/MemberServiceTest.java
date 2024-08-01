package com.api.member.application;

import auth.FakeTokenProvider;
import com.api.member.application.request.LoginRequest;
import com.api.member.application.request.SignupRequest;
import com.common.auth.TokenProvider;
import com.domain.domains.member.domain.Member;
import com.domain.domains.member.domain.MemberRepository;
import com.domain.domains.member.exception.MemberAlreadyExistedException;
import com.domain.domains.member.exception.MemberNotFoundException;
import com.domain.domains.member.exception.PasswordInvalidException;
import member.fixture.FakeMemberRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import static member.fixture.MemberFixture.일반_멤버_생성_id_없음;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class AuthServiceTest {

    private TokenProvider tokenProvider;
    private MemberService memberService;
    private MemberRepository memberRepository;

    @BeforeEach
    void setup() {
        memberRepository = new FakeMemberRepository();
        tokenProvider = new FakeTokenProvider();
        memberService = new MemberService(tokenProvider, memberRepository);
    }

    @DisplayName("회원가입을 진행한다")
    @Nested
    class Signup {

        @Test
        void 회원가입을_성공한다() {
            // given
            SignupRequest req = new SignupRequest("email", "password");

            // when
            String result = memberService.signup(req);

            // then
            assertThat(result).isEqualTo("token");
        }

        @Test
        void 이미_존재하는_이메일이라면_예외를_발생한다() {
            // given
            Member existedMember = 일반_멤버_생성_id_없음();
            memberRepository.save(existedMember);

            SignupRequest req = new SignupRequest(existedMember.getEmail(), "password");

            // when & then
            assertThatThrownBy(() -> memberService.signup(req))
                    .isInstanceOf(MemberAlreadyExistedException.class);
        }
    }

    @DisplayName("로그인을 진행한다")
    @Nested
    class Login {

        @Test
        void 로그인을_성공적으로_진행한다() {
            // given
            Member member = memberRepository.save(일반_멤버_생성_id_없음());
            LoginRequest request = new LoginRequest(member.getEmail(), member.getPassword());
            String expectedToken = "token";

            // when
            String result = memberService.login(request);

            // then
            assertThat(result).isEqualTo(expectedToken);
        }

        @Test
        void 존재하지_않는_이메일로_로그인시_예외를_발생한다() {
            // given
            Member member = memberRepository.save(일반_멤버_생성_id_없음());
            String wrongEmail = "wrong";
            LoginRequest request = new LoginRequest(wrongEmail, member.getPassword());

            // when & then
            assertThatThrownBy(() -> memberService.login(request))
                    .isInstanceOf(MemberNotFoundException.class);
        }

        @Test
        void 패스워드가_틀리면_예외를_발생한다() {
            // given
            Member member = memberRepository.save(일반_멤버_생성_id_없음());
            String wrongPassword = "wrong";
            LoginRequest request = new LoginRequest(member.getEmail(), wrongPassword);

            // when & then
            assertThatThrownBy(() -> memberService.login(request))
                    .isInstanceOf(PasswordInvalidException.class);
        }
    }
}
