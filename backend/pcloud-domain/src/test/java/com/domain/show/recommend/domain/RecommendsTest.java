package com.domain.show.recommend.domain;

import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import show.popups.infrastructure.FakePopularityCalculator;

import java.util.List;

import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static show.recommend.RecommendFixture.추천_생성_전시회타입_조회수_좋아요_사용;
import static show.recommend.RecommendFixture.추천_생성_팝업타입_조회수_좋아요_사용;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class RecommendsTest {

    private final FakePopularityCalculator fakePopularityCalculator = new FakePopularityCalculator();

    @Test
    void 인기_팝업_스토어_3개를_구한다() {
        // given
        int limit = 3;

        Recommend popupRecommend1 = 추천_생성_팝업타입_조회수_좋아요_사용(10, 10);
        Recommend popupRecommend2 = 추천_생성_팝업타입_조회수_좋아요_사용(10, 30);
        Recommend popupRecommend3 = 추천_생성_팝업타입_조회수_좋아요_사용(10, 50);
        Recommend popupRecommend4 = 추천_생성_팝업타입_조회수_좋아요_사용(10, 70);
        Recommend popupRecommend5 = 추천_생성_전시회타입_조회수_좋아요_사용(10, 90);
        Recommends recommends = new Recommends(List.of(popupRecommend1, popupRecommend2, popupRecommend3, popupRecommend4, popupRecommend5));

        // when
        List<Recommend> result = recommends.findPopularityShows(fakePopularityCalculator, limit);

        // then
        assertSoftly(softly -> {
            softly.assertThat(result).hasSize(3);
            softly.assertThat(result.get(0))
                    .usingRecursiveAssertion()
                    .isEqualTo(popupRecommend5);
            softly.assertThat(result.get(1))
                    .usingRecursiveAssertion()
                    .isEqualTo(popupRecommend4);
            softly.assertThat(result.get(2))
                    .usingRecursiveAssertion()
                    .isEqualTo(popupRecommend3);
        });
    }

}
