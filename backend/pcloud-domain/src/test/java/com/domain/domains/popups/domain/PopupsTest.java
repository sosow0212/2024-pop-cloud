package com.domain.domains.popups.domain;

import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static popups.fixture.PopupsFixture.일반_팝업_스토어_생성_뷰티;
import static popups.fixture.PopupsFixture.일반_팝업_스토어_생성_펫샵;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class PopupsTest {

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
}
