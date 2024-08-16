package popups.fixture;

import com.domain.domains.common.PublicTag;
import com.domain.domains.popups.domain.response.CustomTagSimpleResponse;
import com.domain.domains.popups.domain.response.PopupsSpecificResponse;
import com.domain.domains.popups.domain.vo.Latitude;
import com.domain.domains.popups.domain.vo.Longitude;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class PopupsSpecificResponseFixture {

    public static PopupsSpecificResponse 팝업_스토어_상세조회_결과() {
        return new PopupsSpecificResponse(
                1L,
                1L,
                "빵빵이 전시회",
                "빵빵이와 함꼐 놀아요",
                "서울시 마포구",
                true,
                BigDecimal.valueOf(0),
                LocalDateTime.now().minusMinutes(30),
                LocalDateTime.now(),
                """
                        평일 09:00 ~ 18:00,
                        주말 12:00 ~ 21:00 
                        """,
                Latitude.from("37.556725").getValue(),
                Longitude.from("126.9234952").getValue(),
                PublicTag.CHARACTER,
                0,
                0,
                List.of(new CustomTagSimpleResponse("빵빵이"))
        );
    }
}
