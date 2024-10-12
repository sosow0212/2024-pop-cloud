package show.exhibition.domain;

import com.domain.common.coordinates.Latitude;
import com.domain.common.coordinates.Longitude;
import com.domain.common.coordinates.Position;
import com.domain.show.common.Price;
import com.domain.show.common.PublicTag;
import com.domain.show.common.ShowDetails;
import com.domain.show.common.ShowRules;
import com.domain.show.common.ShowSchedule;
import com.domain.show.common.Statistic;
import com.domain.show.exhibition.domain.Exhibition;

import java.time.LocalDateTime;

@SuppressWarnings("NonAsciiCharacters")
public class ExhibitionFixture {

    public static Exhibition 개인전시회_생성_사진_개인전() {
        return Exhibition.builder()
                .ownerId(1L)
                .showDetails(
                        ShowDetails.builder()
                                .title("XXX님의 사진 개인전시회")
                                .description("모든 연령이 함께 감상 가능한 사진 전시회입니다.")
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
                .publicTag(PublicTag.EXHIBITION)
                .build();
    }

    public static Exhibition 개인전시회_생성_디자인_개인전() {
        return Exhibition.builder()
                .ownerId(1L)
                .showDetails(
                        ShowDetails.builder()
                                .title("XXX님의 디자인 개인전시회")
                                .description("모든 연령이 함께 감상 가능한 디자인 전시회입니다.")
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
                .publicTag(PublicTag.EXHIBITION)
                .build();
    }

    public static Exhibition 개인전시회_생성_사진_개인전_작성자아이디(final Long ownerId) {
        return Exhibition.builder()
                .ownerId(ownerId)
                .showDetails(
                        ShowDetails.builder()
                                .title("XXX님의 사진 개인전시회")
                                .description("모든 연령이 함께 감상 가능한 사진 전시회입니다.")
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
                .publicTag(PublicTag.EXHIBITION)
                .build();
    }
}
