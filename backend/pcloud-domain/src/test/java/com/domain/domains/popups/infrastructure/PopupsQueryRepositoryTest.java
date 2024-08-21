package com.domain.domains.popups.infrastructure;

import com.domain.common.Price;
import com.domain.common.PublicTag;
import com.domain.popups.domain.Popups;
import com.domain.popups.domain.response.PopupsSimpleResponse;
import com.domain.popups.domain.response.PopupsSpecificResponse;
import com.domain.popups.domain.vo.AvailableTime;
import com.domain.popups.domain.vo.Latitude;
import com.domain.popups.domain.vo.Longitude;
import com.domain.popups.domain.vo.Statistic;
import com.domain.popups.domain.vo.StoreDetails;
import com.domain.helper.IntegrationHelper;
import com.domain.popups.infrastructure.PopupsJpaRepository;
import com.domain.popups.infrastructure.PopupsQueryRepository;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static popups.fixture.PopupsFixture.일반_팝업_스토어_생성_뷰티;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class PopupsQueryRepositoryTest extends IntegrationHelper {

    @Autowired
    private PopupsJpaRepository popupsJpaRepository;

    @Autowired
    private PopupsQueryRepository popupsQueryRepository;

    @Test
    void 팝업스토어_상세조회를_한다() {
        // given
        Popups savedPopups = popupsJpaRepository.save(일반_팝업_스토어_생성_뷰티());

        // when
        Optional<PopupsSpecificResponse> response = popupsQueryRepository.findSpecificById(savedPopups.getId());

        // then
        assertSoftly(softly -> {
            softly.assertThat(response).isPresent();
            softly.assertThat(response.get().getId()).isEqualTo(savedPopups.getId());
        });
    }

    // TODO: 수정
    @Test
    void no_offset_페이징_첫_조회() {
        // given
        for (long i = 1L; i <= 20L; i++) {
            popupsJpaRepository.save(
                    Popups.builder()
                            .id(i)
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
                            .statistic(Statistic.createDefault())
                            .build()
            );
        }

        // when
        List<PopupsSimpleResponse> result = popupsQueryRepository.findAllWithPaging(null, 10);

        // then
        assertSoftly(softly -> {
            softly.assertThat(result).hasSize(10);
            softly.assertThat(result.get(0).id()).isEqualTo(20L);
            softly.assertThat(result.get(9).id()).isEqualTo(11L);
        });
    }

    @Test
    void no_offset_페이징_두번째_조회() {
        // given
        for (long i = 1L; i <= 20L; i++) {
            popupsJpaRepository.save(
                    Popups.builder()
                            .id(i)
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
                            .statistic(Statistic.createDefault())
                            .build()
            );
        }

        // when
        List<PopupsSimpleResponse> result = popupsQueryRepository.findAllWithPaging(11L, 10);

        // then
        assertSoftly(softly -> {
            softly.assertThat(result).hasSize(10);
            softly.assertThat(result.get(0).id()).isEqualTo(10L);
            softly.assertThat(result.get(9).id()).isEqualTo(1L);
        });
    }
}
