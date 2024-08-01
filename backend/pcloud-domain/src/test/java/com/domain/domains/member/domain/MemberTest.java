package com.domain.domains.member.domain;

import com.domain.domains.member.exception.PasswordInvalidException;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;

import static com.domain.domains.member.fixture.MemberFixture.일반_멤버_생성_id_없음;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class MemberTest {

    @Test
    void 패스워드가_일치하지_않으면_예외를_발생시킨다() {
        // given
        Member member = 일반_멤버_생성_id_없음();

        // when & then
        assertThatThrownBy(() -> member.validatePassword("wrong_password"))
                .isInstanceOf(PasswordInvalidException.class);
    }
}
