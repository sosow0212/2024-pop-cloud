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

import static map.fixture.맵_픽스처.쇼_식별자_픽스처.건대입구역_ShowIdentifier_생성_인기_좋아요_모두_1;
import static map.fixture.맵_픽스처.쇼_식별자_픽스처.용마산역_ShowIdentifier_생성_인기_좋아요_모두_1;
import static map.fixture.맵_픽스처.쇼_식별자_픽스처.일원역_ShowIdentifier_생성_인기_좋아요_모두_1;
import static map.fixture.맵_픽스처.좌표_픽스처.잠실_야구장_Coordinate_생성;
import static org.assertj.core.api.Assertions.assertThat;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class ShortestWorkerTest {

    private final ShortestWorker shortestWorker = new ShortestWorker();

    @Test
    void shortest_패스를_지원한다() {
        // given
        RecommendType expect = RecommendType.SHORTEST;

        // when
        RecommendType recommendType = shortestWorker.getRecommendType();

        // then
        assertThat(recommendType).isEqualTo(expect);
    }

    @Test
    void 현재_위치_기준으로_최단_동선으로_정렬한다() {
        // given
        ArrayList<ShowIdentifier> identifiers = new ArrayList<>(List.of(
                일원역_ShowIdentifier_생성_인기_좋아요_모두_1(),
                용마산역_ShowIdentifier_생성_인기_좋아요_모두_1(),
                건대입구역_ShowIdentifier_생성_인기_좋아요_모두_1()
        ));
        Coordinate myCoordinate = 잠실_야구장_Coordinate_생성();
        ShowIdentifiers showIdentifiers = ShowIdentifiers.from(identifiers);

        // when
        shortestWorker.work(myCoordinate, showIdentifiers);

        // then
        assertThat(showIdentifiers.getShowIdentifiers())
                .containsExactly(
                        건대입구역_ShowIdentifier_생성_인기_좋아요_모두_1(),
                        용마산역_ShowIdentifier_생성_인기_좋아요_모두_1(),
                        일원역_ShowIdentifier_생성_인기_좋아요_모두_1()
                );
    }
}
