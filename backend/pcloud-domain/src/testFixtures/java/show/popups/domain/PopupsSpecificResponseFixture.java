package show.popups.domain;

import com.domain.common.coordinates.Latitude;
import com.domain.common.coordinates.Longitude;
import com.domain.show.common.PublicTag;
import com.domain.show.popups.domain.Popups;
import com.domain.show.popups.domain.response.PopupsSpecificResponse;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class PopupsSpecificResponseFixture {

    public static PopupsSpecificResponse 팝업스토어_상세_조회_응답_생성() {
        return new PopupsSpecificResponse(
                1L,
                1L,
                "빵빵이 팝업스토어",
                "빵빵이와 함께하는 팝업스토어",
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

    public static PopupsSpecificResponse 팝업스토어_상세_조회_응답_생성_팝업스토어(final Popups popups) {
        return new PopupsSpecificResponse(
                popups.getId(),
                popups.getOwnerId(),
                popups.getShowDetails().getTitle(),
                popups.getShowDetails().getDescription(),
                popups.getShowSchedule().getStartDate(),
                popups.getShowSchedule().getEndDate(),
                popups.getShowSchedule().getOpenTimes(),
                popups.getPosition().getLocation(),
                popups.getPosition().getLatitude().getValue(),
                popups.getPosition().getLongitude().getValue(),
                popups.getShowRules().getIsParkingAvailable(),
                popups.getShowRules().getIsFoodAllowed(),
                popups.getShowRules().getIsPetAllowed(),
                popups.getShowRules().getIsKidsZone(),
                popups.getShowRules().getIsWifiAvailable(),
                popups.getShowRules().getFee().getValue(),
                popups.getPublicTag(),
                popups.getStatistic().getVisitedCount(),
                popups.getStatistic().getLikedCount(),
                List.of("가족", "데이트")
        );
    }
}
