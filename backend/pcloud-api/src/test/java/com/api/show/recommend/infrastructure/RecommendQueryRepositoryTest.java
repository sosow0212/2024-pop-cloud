package com.api.show.recommend.infrastructure;

import com.api.helper.IntegrationHelper;
import com.domain.show.common.ShowType;
import com.domain.show.exhibition.domain.Exhibition;
import com.domain.show.exhibition.domain.ExhibitionRepository;
import com.domain.show.popups.domain.Popups;
import com.domain.show.popups.domain.PopupsRepository;
import com.domain.show.recommend.domain.Recommend;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static show.exhibition.domain.ExhibitionFixture.개인전시회_생성_디자인_개인전;
import static show.popups.domain.PopupsFixture.일반_팝업_스토어_생성_펫샵;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class RecommendQueryRepositoryTest extends IntegrationHelper {

    private static final int count = 1;

    @Autowired
    private PopupsRepository popupsRepository;

    @Autowired
    private ExhibitionRepository exhibitionRepository;

    @Autowired
    private RecommendQueryRepository recommendQueryRepository;

    private Popups popups;
    private Exhibition exhibition;

    @BeforeEach
    void setup() {
        popups = 일반_팝업_스토어_생성_펫샵();
        exhibition = 개인전시회_생성_디자인_개인전();

        for (int i = 0; i < count; i++) {
            popupsRepository.save(popups);
            exhibitionRepository.save(exhibition);
        }
    }

    @Test
    void 날짜를_기준으로_단건_조회한다() {
        // when
        List<Recommend> response = recommendQueryRepository.findAllFromStartDateToEndDateWithLimitByShowTypes(
                popups.getCreatedAt(),
                popups.getCreatedAt(),
                List.of(ShowType.POPUPS)
        );

        // then
        assertSoftly(softly -> {
            softly.assertThat(response).hasSize(count);
        });
    }

    @Test
    void 날짜를_기준으로_모두_조회한다() {
        // when
        List<Recommend> response = recommendQueryRepository.findAllFromStartDateToEndDateWithLimitByShowTypes(
                popups.getCreatedAt(),
                popups.getCreatedAt(),
                List.of(ShowType.ALL)
        );

        // then
        assertSoftly(softly -> {
            softly.assertThat(response).hasSize(2);
        });
    }
}
