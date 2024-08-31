package show.recommend;

import com.domain.show.common.ShowDetails;
import com.domain.show.common.ShowSchedule;
import com.domain.show.common.ShowType;
import com.domain.show.common.Statistic;
import com.domain.show.recommend.domain.Recommend;

import java.time.LocalDateTime;

public class RecommendFixture {

    public static Recommend 추천_생성_팝업타입_조회수_좋아요_사용(final int visitedCount, final int likedCount) {
        return new Recommend(
                1L,
                ShowType.POPUPS,
                ShowDetails.builder()
                        .title("빵빵이 전시회")
                        .description("빵빵이와 춤을 춰요")
                        .build(),
                ShowSchedule.builder()
                        .startDate(LocalDateTime.of(2024, 01, 01, 00, 00))
                        .endDate(LocalDateTime.of(2024, 12, 01, 00, 00))
                        .build(),
                Statistic.builder()
                        .visitedCount(visitedCount)
                        .likedCount(likedCount)
                        .build()
        );
    }

    public static Recommend 추천_생성_전시회타입_조회수_좋아요_사용(final int visitedCount, final int likedCount) {
        return new Recommend(
                1L,
                ShowType.EXHIBITION,
                ShowDetails.builder()
                        .title("빵빵이 전시회")
                        .description("빵빵이와 춤을 춰요")
                        .build(),
                ShowSchedule.builder()
                        .startDate(LocalDateTime.of(2024, 01, 01, 00, 00))
                        .endDate(LocalDateTime.of(2024, 12, 01, 00, 00))
                        .build(),
                Statistic.builder()
                        .visitedCount(visitedCount)
                        .likedCount(likedCount)
                        .build()
        );
    }
}
