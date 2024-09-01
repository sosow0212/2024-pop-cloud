package com.api.show.recommend.application;

import com.api.show.popups.application.request.DateSearchRequest;
import com.domain.show.common.ShowType;
import com.domain.show.popups.domain.service.PopularityCalculator;
import com.domain.show.recommend.domain.Recommend;
import com.domain.show.recommend.domain.RecommendRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import show.popups.infrastructure.FakePopularityCalculator;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static show.recommend.RecommendFixture.추천_생성_전시회타입_조회수_좋아요_사용;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class RecommendServiceTest {

    private RecommendRepository recommendRepository;
    private RecommendService recommendService;

    @BeforeEach
    void setup() {
        recommendRepository = mock(RecommendRepository.class);
        PopularityCalculator popularityCalculator = new FakePopularityCalculator();
        recommendService = new RecommendService(recommendRepository, popularityCalculator);
    }

    @Test
    void 인기_팝업을_조회한다() {
        // given
        DateSearchRequest request = new DateSearchRequest(
                1,
                LocalDateTime.of(1000, 01, 01, 01, 01),
                LocalDateTime.of(2999, 01, 01, 01, 01),
                List.of(ShowType.ALL)
        );

        List<Recommend> expect = List.of(추천_생성_전시회타입_조회수_좋아요_사용(10, 20));

        when(recommendRepository.findAllFromStartDateToEndDateWithLimitByShowTypes(any(), any(), any()))
                .thenReturn(expect);

        // when
        List<Recommend> response = recommendService.findPopularShowsWithinDateRange(request).getRecommends();

        // then
        assertSoftly(softly -> {
            softly.assertThat(response).hasSize(expect.size());
            softly.assertThat(response.get(0).getId()).isEqualTo(expect.get(0).getId());
            softly.assertThat(response.get(0).getShowType()).isEqualTo(expect.get(0).getShowType());
        });
    }
}
