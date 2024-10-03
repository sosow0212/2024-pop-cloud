package com.domain.show.popups.infrastructure;

import com.domain.helper.IntegrationHelper;
import com.domain.show.popups.domain.Popups;
import com.domain.show.popups.domain.response.PopupsSpecificResponse;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static show.popups.domain.PopupsFixture.일반_팝업_스토어_생성_뷰티;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class PopupsQueryRepositoryTest extends IntegrationHelper {

    @Autowired
    private PopupsJpaRepository popupsJpaRepository;

    @Autowired
    private PopupsQueryRepository popupsQueryRepository;

    @Test
    void 팝업스토어_상세조회를_한다() {
        // given
        Popups savedPopups = popupsJpaRepository.save(일반_팝업_스토어_생성_뷰티());

        // when
        Optional<PopupsSpecificResponse> response = popupsQueryRepository.findSpecificById(savedPopups.getId());

        // then
        assertSoftly(softly -> {
            softly.assertThat(response).isPresent();
            softly.assertThat(response.get().id()).isEqualTo(savedPopups.getId());
        });
    }
}
