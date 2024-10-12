package map;

import com.api.map.application.request.MyCoordinateRequest;
import com.api.map.application.request.MyCoordinateRequestWithDelta;
import com.api.map.application.request.ShowCoordinateRequest;
import com.api.map.application.request.ShowsCoordinateRequest;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@SuppressWarnings("NonAsciiCharacters")
public class 맵_요청_픽스처 {

    public static class 내_위치와_델타_요청_픽스처 {

        public static MyCoordinateRequestWithDelta 용마산_위치와_델타_생성() {
            return new MyCoordinateRequestWithDelta(
                    BigDecimal.valueOf(37.573647),
                    BigDecimal.valueOf(127.086727),
                    BigDecimal.valueOf(1),
                    BigDecimal.valueOf(1)
            );
        }
    }

    public static class 추천_경로_생성_픽스처 {

        public static MyCoordinateRequest 나의_위치_요청_생성() {
            return new MyCoordinateRequest(BigDecimal.valueOf(37.573647), BigDecimal.valueOf(127.086727));
        }

        public static ShowCoordinateRequest 주변_쇼의_위치_생성() {
            return new ShowCoordinateRequest(
                    "popups",
                    1L,
                    "용마산",
                    "용마산 주소",
                    BigDecimal.valueOf(37.573647),
                    BigDecimal.valueOf(127.086727),
                    LocalDateTime.of(2024, 01, 01, 1, 1),
                    LocalDateTime.of(2025, 01, 01, 1, 1),
                    100,
                    100
            );
        }

        public static ShowsCoordinateRequest 추천_경로_요청_생성() {
            return new ShowsCoordinateRequest(
                    "shortest",
                    나의_위치_요청_생성(),
                    List.of(주변_쇼의_위치_생성())
            );
        }
    }
}
