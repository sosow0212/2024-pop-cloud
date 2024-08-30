package com.api.show.popups.application;

import com.api.helper.ConcurrencyHelper;
import com.api.helper.IntegrationHelper;
import com.domain.show.popups.domain.Popups;
import com.domain.show.popups.domain.PopupsRepository;
import com.domain.show.popups.event.PopupsFoundEvent;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;
import static show.popups.domain.PopupsFixture.일반_팝업_스토어_생성_펫샵_작성자아이디;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class PopupsServiceConcurrencyTest extends IntegrationHelper {

    @Autowired
    private PopupsRepository popupsRepository;

    @Autowired
    private PopupsEventHandler popupsEventHandler;

    private Popups popups;

    @BeforeEach
    void setup() {
        popups = popupsRepository.save(일반_팝업_스토어_생성_펫샵_작성자아이디(1L));
    }

    @Test
    void 좋아요_동시성_테스트() throws InterruptedException {
        // given
        PopupsFoundEvent event = new PopupsFoundEvent(popups.getId());
        int requestCount = 100;

        // when
        ConcurrencyHelper.run(() -> popupsEventHandler.addViewCount(event), requestCount);

        // then
        int result = popupsRepository.findById(popups.getId())
                .get()
                .getStatistic()
                .getVisitedCount();

        assertThat(result).isEqualTo(requestCount);
    }
}
