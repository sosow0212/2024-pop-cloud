package show.popups.domain;

import com.domain.show.popups.domain.Popups;
import com.domain.show.popups.domain.response.PopupsSpecificResponse;
import java.util.List;

public class PopupsSpecificResponseFixture {

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
