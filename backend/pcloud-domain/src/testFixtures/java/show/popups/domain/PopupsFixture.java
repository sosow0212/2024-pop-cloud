package show.popups.domain;

import com.domain.common.coordinates.Latitude;
import com.domain.common.coordinates.Longitude;
import com.domain.common.coordinates.Position;
import com.domain.show.common.Price;
import com.domain.show.common.PublicTag;
import com.domain.show.common.ShowDetails;
import com.domain.show.common.ShowRules;
import com.domain.show.common.ShowSchedule;
import com.domain.show.common.Statistic;
import com.domain.show.popups.domain.Popups;

import java.time.LocalDateTime;

@SuppressWarnings("NonAsciiCharacters")
public class PopupsFixture {

    public static Popups 일반_팝업_스토어_생성_펫샵() {
        return Popups.builder()
                .ownerId(1L)
                .showDetails(
                        ShowDetails.builder()
                                .title("귀여운 애완동물 팝업스토어")
                                .description("모든 연령이 참여 가능한 팝업스토어입니다.")
                                .build()
                ).showSchedule(
                        ShowSchedule.builder()
                                .startDate(LocalDateTime.of(2024, 1, 1, 0, 0))
                                .endDate(LocalDateTime.of(2024, 12, 31, 0, 0))
                                .openTimes("평일 12시 ~ 18시")
                                .build()
                ).position(
                        Position.builder()
                                .latitude(Latitude.from("34"))
                                .longitude(Longitude.from("128"))
                                .location("서울시 마포구")
                                .build()
                ).showRules(
                        ShowRules.builder()
                                .isParkingAvailable(true)
                                .isFoodAllowed(true)
                                .isPetAllowed(true)
                                .isKidsZone(true)
                                .isWifiAvailable(true)
                                .fee(Price.from(10000))
                                .build()
                ).statistic(Statistic.createDefault())
                .publicTag(PublicTag.PET)
                .build();
    }

    public static Popups 일반_팝업_스토어_생성_뷰티() {
        return Popups.builder()
                .ownerId(1L)
                .showDetails(
                        ShowDetails.builder()
                                .title("뷰티 케어 팝업스토어")
                                .description("뷰티 케어하는 팝업스토어입니다.")
                                .build()
                ).showSchedule(
                        ShowSchedule.builder()
                                .startDate(LocalDateTime.of(2024, 1, 1, 0, 0))
                                .endDate(LocalDateTime.of(2024, 12, 31, 0, 0))
                                .openTimes("평일 12시 ~ 18시")
                                .build()
                ).position(
                        Position.builder()
                                .latitude(Latitude.from("34"))
                                .longitude(Longitude.from("128"))
                                .location("서울시 마포구")
                                .build()
                ).showRules(
                        ShowRules.builder()
                                .isParkingAvailable(true)
                                .isFoodAllowed(true)
                                .isPetAllowed(true)
                                .isKidsZone(true)
                                .isWifiAvailable(true)
                                .fee(Price.from(10000))
                                .build()
                ).statistic(Statistic.createDefault())
                .publicTag(PublicTag.BEAUTY)
                .build();
    }

    public static Popups 일반_팝업_스토어_생성_뷰티_유효하지_않은_주인() {
        return Popups.builder()
                .ownerId(-1L)
                .showDetails(
                        ShowDetails.builder()
                                .title("뷰티 케어 팝업스토어")
                                .description("뷰티 케어하는 팝업스토어입니다.")
                                .build()
                ).showSchedule(
                        ShowSchedule.builder()
                                .startDate(LocalDateTime.of(2024, 1, 1, 0, 0))
                                .endDate(LocalDateTime.of(2024, 12, 31, 0, 0))
                                .openTimes("평일 12시 ~ 18시")
                                .build()
                ).position(
                        Position.builder()
                                .latitude(Latitude.from("34"))
                                .longitude(Longitude.from("128"))
                                .location("서울시 마포구")
                                .build()
                ).showRules(
                        ShowRules.builder()
                                .isParkingAvailable(true)
                                .isFoodAllowed(true)
                                .isPetAllowed(true)
                                .isKidsZone(true)
                                .isWifiAvailable(true)
                                .fee(Price.from(10000))
                                .build()
                ).statistic(Statistic.createDefault())
                .publicTag(PublicTag.BEAUTY)
                .build();
    }

    public static Popups 일반_팝업_스토어_생성_펫샵_작성자아이디(final Long ownerId) {
        return Popups.builder()
                .ownerId(ownerId)
                .showDetails(
                        ShowDetails.builder()
                                .title("귀여운 애완동물 팝업스토어")
                                .description("모든 연령이 참여 가능한 팝업스토어입니다.")
                                .build()
                ).showSchedule(
                        ShowSchedule.builder()
                                .startDate(LocalDateTime.of(2024, 1, 1, 0, 0))
                                .endDate(LocalDateTime.of(2024, 12, 31, 0, 0))
                                .openTimes("평일 12시 ~ 18시")
                                .build()
                ).position(
                        Position.builder()
                                .latitude(Latitude.from("34"))
                                .longitude(Longitude.from("128"))
                                .location("서울시 마포구")
                                .build()
                ).showRules(
                        ShowRules.builder()
                                .isParkingAvailable(true)
                                .isFoodAllowed(true)
                                .isPetAllowed(true)
                                .isKidsZone(true)
                                .isWifiAvailable(true)
                                .fee(Price.from(10000))
                                .build()
                ).statistic(Statistic.createDefault())
                .publicTag(PublicTag.PET)
                .build();
    }
}
