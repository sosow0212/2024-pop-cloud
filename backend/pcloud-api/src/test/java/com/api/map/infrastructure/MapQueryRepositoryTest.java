package com.api.map.infrastructure;

import com.api.helper.IntegrationHelper;
import com.domain.map.domain.CoordinateRange;
import com.domain.map.dto.ShowsCoordinateSimpleResponse;
import com.domain.show.popups.domain.Popups;
import com.domain.show.popups.infrastructure.PopupsJpaRepository;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.math.BigDecimal;
import java.util.List;

import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static show.popups.domain.PopupsFixture.일반_팝업_스토어_생성_뷰티;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class MapQueryRepositoryTest extends IntegrationHelper {

    @Autowired
    private PopupsJpaRepository popupsJpaRepository;

    @Autowired
    private MapQueryRepository mapQueryRepository;

    @Test
    void 범위_내에_쇼케이스를_탐색한다() {
        // given
        Popups popups = popupsJpaRepository.save(일반_팝업_스토어_생성_뷰티());

        // when
        List<ShowsCoordinateSimpleResponse> response = mapQueryRepository.findShowsAroundLocation(
                CoordinateRange.of(
                        popups.getPosition().getLatitude().getValue(),
                        popups.getPosition().getLongitude().getValue(),
                        BigDecimal.valueOf(1),
                        BigDecimal.valueOf(1)
                )
        );

        // then
        assertSoftly(softly -> {
            softly.assertThat(response).hasSize(1);
            softly.assertThat(response.get(0).id()).isEqualTo(popups.getId());
        });
    }
}
