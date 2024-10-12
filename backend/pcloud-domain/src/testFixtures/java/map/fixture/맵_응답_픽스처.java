package map.fixture;

import com.domain.common.coordinates.Position;
import com.domain.map.domain.vo.SearchTarget;
import com.domain.map.dto.ShowsCoordinateSimpleResponse;

import java.time.LocalDateTime;

public class 맵_응답_픽스처 {

    public static class 쇼_주변_좌표_응답_픽스처 {

        public static ShowsCoordinateSimpleResponse 주변_좌표_응답_생성_용마산() {
            return new ShowsCoordinateSimpleResponse(
                    SearchTarget.POPUPS,
                    1L,
                    "용마산 쇼케이스",
                    Position.of("용마산 주소", "37.573647", "127.086727"),
                    LocalDateTime.of(2024, 01, 01, 1, 1),
                    LocalDateTime.of(2025, 01, 01, 1, 1),
                    1,
                    1
            );
        }
    }
}
