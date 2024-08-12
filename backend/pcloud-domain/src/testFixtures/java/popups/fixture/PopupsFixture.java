package popups.fixture;

import com.domain.domains.common.Price;
import com.domain.domains.common.PublicTag;
import com.domain.domains.popups.domain.Popups;
import com.domain.domains.popups.domain.Tag;
import com.domain.domains.popups.domain.vo.AvailableTime;
import com.domain.domains.popups.domain.vo.Latitude;
import com.domain.domains.popups.domain.vo.Longitude;
import com.domain.domains.popups.domain.vo.StoreDetails;

import java.time.LocalDateTime;
import java.util.List;

public class PopupsFixture {

    public static Popups 일반_팝업_스토어_생성_펫샵() {
        return Popups.builder()
                .ownerId(1L)
                .availableTime(
                        AvailableTime.builder()
                                .startDate(LocalDateTime.of(2024, 1, 1, 0, 0))
                                .endDate(LocalDateTime.of(2024, 12, 31, 0, 0))
                                .openTimes("평일 12시 ~ 18시")
                                .build()
                ).storeDetails(
                        StoreDetails.builder()
                                .title("펫 케어 팝업스토어")
                                .description("펫을 케어하는 팝업스토어입니다.")
                                .location("마포구")
                                .isParkingAvailable(Boolean.TRUE)
                                .fee(Price.from(10000))
                                .build()
                ).latitude(Latitude.from("34"))
                .longitude(Longitude.from("128"))
                .publicTag(PublicTag.PET)
                .tags(List.of(
                        Tag.builder()
                                .name("케어")
                                .build()
                ))
                .build();
    }

    public static Popups 일반_팝업_스토어_생성_뷰티() {
        return Popups.builder()
                .ownerId(1L)
                .availableTime(
                        AvailableTime.builder()
                                .startDate(LocalDateTime.of(2024, 1, 1, 0, 0))
                                .endDate(LocalDateTime.of(2024, 12, 31, 0, 0))
                                .openTimes("평일 12시 ~ 18시")
                                .build()
                ).storeDetails(
                        StoreDetails.builder()
                                .title("뷰티 케어 팝업스토어")
                                .description("뷰티 케어하는 팝업스토어입니다.")
                                .location("마포구")
                                .isParkingAvailable(Boolean.TRUE)
                                .fee(Price.from(10000))
                                .build()
                ).latitude(Latitude.from("34"))
                .longitude(Longitude.from("128"))
                .publicTag(PublicTag.BEAUTY)
                .tags(List.of(
                        Tag.builder()
                                .name("케어")
                                .build()
                ))
                .build();
    }

    public static Popups 일반_팝업_스토어_생성_뷰티_유효하지_않은_주인() {
        return Popups.builder()
                .ownerId(-1L)
                .availableTime(
                        AvailableTime.builder()
                                .startDate(LocalDateTime.of(2024, 1, 1, 0, 0))
                                .endDate(LocalDateTime.of(2024, 12, 31, 0, 0))
                                .openTimes("평일 12시 ~ 18시")
                                .build()
                ).storeDetails(
                        StoreDetails.builder()
                                .title("뷰티 케어 팝업스토어")
                                .description("뷰티 케어하는 팝업스토어입니다.")
                                .location("마포구")
                                .isParkingAvailable(Boolean.TRUE)
                                .fee(Price.from(10000))
                                .build()
                ).latitude(Latitude.from("34"))
                .longitude(Longitude.from("128"))
                .publicTag(PublicTag.BEAUTY)
                .tags(List.of(
                        Tag.builder()
                                .name("케어")
                                .build()
                ))
                .build();
    }
}
