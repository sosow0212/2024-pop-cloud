package com.domain.popups.infrastructure;

import com.domain.popups.domain.Popups;
import com.domain.helper.IntegrationHelper;
import com.domain.popups.infrastructure.PopupsJpaRepository;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static popups.fixture.PopupsFixture.일반_팝업_스토어_생성_펫샵;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class PopupsJpaRepositoryTest extends IntegrationHelper {

    @Autowired
    private PopupsJpaRepository popupsJpaRepository;

    @Test
    void 팝업_스토어를_저장한다() {
        // given
        Popups popups = 일반_팝업_스토어_생성_펫샵();

        // when
        Popups saved = popupsJpaRepository.save(popups);

        // then
        assertThat(popups)
                .usingRecursiveComparison()
                .ignoringFields("id")
                .isEqualTo(saved);
    }

    @Test
    void 팝업_스토어를_조회한다() {
        // given
        Popups saved = popupsJpaRepository.save(일반_팝업_스토어_생성_펫샵());

        // when
        Optional<Popups> result = popupsJpaRepository.findById(saved.getId());

        // then
        assertSoftly(softly -> {
            softly.assertThat(result).isPresent();
            softly.assertThat(result.get())
                    .usingRecursiveComparison()
                    .isEqualTo(saved);
        });
    }
}
