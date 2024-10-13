package com.domain.map.infrastrucutre.worker;

import com.domain.map.domain.ShowIdentifiers;
import com.domain.map.domain.vo.Coordinate;
import com.domain.map.domain.vo.RecommendType;
import com.domain.map.domain.vo.ShowIdentifier;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static map.fixture.맵_픽스처.쇼_식별자_픽스처.고려대_ShowIdentifier_생성_인기_좋아요_모두_1;
import static map.fixture.맵_픽스처.쇼_식별자_픽스처.명지대_자연캠_ShowIdentifier_생성_인기_좋아요_모두_100;
import static map.fixture.맵_픽스처.좌표_픽스처.홍대_Coordinate_생성;
import static org.assertj.core.api.Assertions.assertThat;


@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class PathFinderPopularWorkerTest {

    private final PathFinderPopularWorker pathFinderPopularWorker = new PathFinderPopularWorker();

    @Test
    void 자신의_추천_상태를_반환한다() {
        // given
        RecommendType expected = RecommendType.POPULAR;

        // when
        RecommendType result = pathFinderPopularWorker.getRecommendType();

        // then
        assertThat(result).isEqualTo(expected);
    }

    @Test
    void 인기순으로_정렬한다() {
        // given
        ArrayList<ShowIdentifier> identifiers = new ArrayList<>(List.of(
                고려대_ShowIdentifier_생성_인기_좋아요_모두_1(),
                명지대_자연캠_ShowIdentifier_생성_인기_좋아요_모두_100()
        ));
        Coordinate myCoordinate = 홍대_Coordinate_생성();
        ShowIdentifiers showIdentifiers = ShowIdentifiers.from(identifiers);

        // when
        pathFinderPopularWorker.work(myCoordinate, showIdentifiers);

        // then
        assertThat(showIdentifiers.getShowIdentifiers())
                .containsExactly(명지대_자연캠_ShowIdentifier_생성_인기_좋아요_모두_100(), 고려대_ShowIdentifier_생성_인기_좋아요_모두_1());
    }
}
