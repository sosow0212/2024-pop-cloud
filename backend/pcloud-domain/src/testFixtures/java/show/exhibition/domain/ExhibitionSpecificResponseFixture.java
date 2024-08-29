package show.exhibition.domain;

import com.domain.show.common.PublicTag;
import com.domain.show.exhibition.domain.Exhibition;
import com.domain.show.exhibition.domain.dto.ExhibitionSpecificResponse;
import com.domain.show.common.Latitude;
import com.domain.show.common.Longitude;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@SuppressWarnings("NonAsciiCharacters")
public class ExhibitionSpecificResponseFixture {

    public static ExhibitionSpecificResponse 개인전시회_상세_조회_응답_생성() {
        return new ExhibitionSpecificResponse(
                1L,
                1L,
                "빵빵이 전시회",
                "빵빵이와 함께하는 전시회",
                LocalDateTime.now().minusMinutes(10),
                LocalDateTime.now(),
                """
                        평일 09:00 ~ 18:00,
                        주말 12:00 ~ 21:00 
                        """,
                "서울 마포구 동교동 155-55",
                Latitude.from("37.556725").getValue(),
                Longitude.from("126.9234952").getValue(),
                true,
                true,
                true,
                true,
                true,
                BigDecimal.valueOf(0),
                PublicTag.EXHIBITION,
                0,
                0,
                List.of("가족", "데이트")
        );
    }

    public static ExhibitionSpecificResponse 개인전시회_상세_조회_응답_생성_개인전시회(final Exhibition exhibition) {
        return new ExhibitionSpecificResponse(
                exhibition.getId(),
                exhibition.getOwnerId(),
                exhibition.getShowDetails().getTitle(),
                exhibition.getShowDetails().getDescription(),
                exhibition.getShowSchedule().getStartDate(),
                exhibition.getShowSchedule().getEndDate(),
                exhibition.getShowSchedule().getOpenTimes(),
                exhibition.getPosition().getLocation(),
                exhibition.getPosition().getLatitude().getValue(),
                exhibition.getPosition().getLongitude().getValue(),
                exhibition.getShowRules().getIsParkingAvailable(),
                exhibition.getShowRules().getIsFoodAllowed(),
                exhibition.getShowRules().getIsPetAllowed(),
                exhibition.getShowRules().getIsKidsZone(),
                exhibition.getShowRules().getIsWifiAvailable(),
                exhibition.getShowRules().getFee().getValue(),
                exhibition.getPublicTag(),
                exhibition.getStatistic().getVisitedCount(),
                exhibition.getStatistic().getLikedCount(),
                List.of("가족", "데이트")
        );
    }
}
