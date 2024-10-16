package map.fixture;

import com.domain.map.domain.RouteSelector;
import com.domain.map.domain.vo.Coordinate;
import com.domain.map.domain.vo.RecommendType;
import com.domain.map.domain.vo.SearchTarget;
import com.domain.map.domain.vo.ShowIdentifier;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@SuppressWarnings("NonAsciiCharacters")
public class 맵_픽스처 {

    public static class 추천_경로_픽스처 {

        public static ShowIdentifier 쇼_특정_정보_생성() {
            return ShowIdentifier.of(
                    1L,
                    SearchTarget.POPUPS,
                    "title",
                    "location",
                    BigDecimal.valueOf(37.573647),
                    BigDecimal.valueOf(127.086727),
                    LocalDateTime.of(2024, 01, 01, 1, 1),
                    LocalDateTime.of(2025, 01, 01, 1, 1),
                    1,
                    1
            );
        }

        public static RouteSelector 추천_경로_생성_인기순() {
            return RouteSelector.of(
                    RecommendType.POPULAR,
                    BigDecimal.valueOf(37.573647),
                    BigDecimal.valueOf(127.086727),
                    List.of(쇼_특정_정보_생성())
            );
        }
    }

    public static class 좌표_픽스처 {

        public static Coordinate 홍대_Coordinate_생성() {
            return Coordinate.of(
                    BigDecimal.valueOf(37.554371328),
                    BigDecimal.valueOf(126.9227542239)
            );
        }

        public static Coordinate 잠실_야구장_Coordinate_생성() {
            return Coordinate.of(
                    BigDecimal.valueOf(37.5148536263),
                    BigDecimal.valueOf(127.0736415981)
            );
        }
    }

    public static class 쇼_식별자_픽스처 {

        public static ShowIdentifier 고려대_ShowIdentifier_생성_인기_좋아요_모두_1() {
            return ShowIdentifier.of(
                    2L,
                    SearchTarget.EXHIBITION,
                    "고려대학교 쇼케이스",
                    "서울특별시 성북구 안암로 145",
                    BigDecimal.valueOf(37.59080),
                    BigDecimal.valueOf(127.0278),
                    LocalDateTime.of(2024, 01, 01, 1, 1),
                    LocalDateTime.of(2025, 01, 01, 1, 1),
                    1,
                    1
            );
        }

        public static ShowIdentifier 명지대_자연캠_ShowIdentifier_생성_인기_좋아요_모두_100() {
            return ShowIdentifier.of(
                    1L,
                    SearchTarget.EXHIBITION,
                    "명지대학교 쇼케이스",
                    "경기도 용인시 처인구 명지로 116",
                    BigDecimal.valueOf(37.224650469991),
                    BigDecimal.valueOf(127.18758354347),
                    LocalDateTime.of(2024, 01, 01, 1, 1),
                    LocalDateTime.of(2025, 01, 01, 1, 1),
                    100,
                    100
            );
        }

        public static ShowIdentifier 강릉원주대_ShowIdentifier_생성_인기_좋아요_모두_1() {
            return ShowIdentifier.of(
                    3L,
                    SearchTarget.EXHIBITION,
                    "강릉원주대 쇼케이스",
                    "강원특별자치도 강릉시 죽헌길 7",
                    BigDecimal.valueOf(37.7686548485123),
                    BigDecimal.valueOf(128.90680147735),
                    LocalDateTime.of(2024, 01, 01, 1, 1),
                    LocalDateTime.of(2025, 01, 01, 1, 1),
                    1,
                    1
            );
        }

        public static ShowIdentifier 건대입구역_ShowIdentifier_생성_인기_좋아요_모두_1() {
            return ShowIdentifier.of(
                    4L,
                    SearchTarget.EXHIBITION,
                    "건대입구역",
                    "건대입구역",
                    BigDecimal.valueOf(37.540693),
                    BigDecimal.valueOf(127.07023),
                    LocalDateTime.of(2024, 01, 01, 1, 1),
                    LocalDateTime.of(2025, 01, 01, 1, 1),
                    1,
                    1
            );
        }

        public static ShowIdentifier 용마산역_ShowIdentifier_생성_인기_좋아요_모두_1() {
            return ShowIdentifier.of(
                    5L,
                    SearchTarget.EXHIBITION,
                    "용마산역",
                    "용마산역",
                    BigDecimal.valueOf(37.573647),
                    BigDecimal.valueOf(127.086727),
                    LocalDateTime.of(2024, 01, 01, 1, 1),
                    LocalDateTime.of(2025, 01, 01, 1, 1),
                    1,
                    1
            );
        }

        public static ShowIdentifier 일원역_ShowIdentifier_생성_인기_좋아요_모두_1() {
            return ShowIdentifier.of(
                    6L,
                    SearchTarget.POPUPS,
                    "일원역",
                    "일원역",
                    BigDecimal.valueOf(37.483681),
                    BigDecimal.valueOf(127.08439),
                    LocalDateTime.of(2024, 01, 01, 1, 1),
                    LocalDateTime.of(2025, 01, 01, 1, 1),
                    1,
                    1
            );
        }
    }
}
