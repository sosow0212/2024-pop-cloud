package com.domain.domains.popups.domain;

import com.common.exception.AuthException;
import com.common.exception.AuthExceptionType;
import com.domain.popups.domain.Popups;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static popups.fixture.PopupsFixture.일반_팝업_스토어_생성_뷰티;
import static popups.fixture.PopupsFixture.일반_팝업_스토어_생성_뷰티_유효하지_않은_주인;
import static popups.fixture.PopupsFixture.일반_팝업_스토어_생성_펫샵;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class PopupsTest {

    @Nested
    class 팝업스토어_업데이트 {

        @Test
        void 팝업_스토어_정보를_업데이트한다() {
            // given
            Popups popups = 일반_팝업_스토어_생성_펫샵();
            Popups updatePopups = 일반_팝업_스토어_생성_뷰티();

            // when
            popups.update(updatePopups);

            // then
            assertThat(popups)
                    .usingRecursiveComparison()
                    .isEqualTo(updatePopups);
        }

        @Test
        void 자신의_계정이_아니면_업데이트_못한다() {
            // given
            Popups popups = 일반_팝업_스토어_생성_뷰티();
            Popups updatedPopups = 일반_팝업_스토어_생성_뷰티_유효하지_않은_주인();

            // when & then
            assertThatThrownBy(() -> popups.update(updatedPopups))
                    .isInstanceOf(AuthException.class)
                    .hasMessageContaining(AuthExceptionType.AUTH_NOT_EQUALS_EXCEPTION.message());
        }
    }
}
