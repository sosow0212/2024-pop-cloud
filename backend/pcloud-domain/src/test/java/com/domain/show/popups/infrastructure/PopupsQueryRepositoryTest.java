package com.domain.show.popups.infrastructure;

import com.domain.helper.IntegrationHelper;
import com.domain.show.popups.domain.Popups;
import com.domain.show.popups.domain.response.PopupsSimpleResponse;
import com.domain.show.popups.domain.response.PopupsSpecificResponse;
import java.util.List;
import java.util.Optional;
import java.util.stream.LongStream;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static show.popups.domain.PopupsFixture.일반_팝업_스토어_생성_뷰티;
import static show.popups.domain.PopupsFixture.일반_팝업_스토어_생성_펫샵_작성자아이디;

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
            softly.assertThat(response.get().id()).isEqualTo(savedPopups.getId());
        });
    }

    @Test
    void no_offset_페이징_첫_조회() {
        // given
        LongStream.rangeClosed(1, 20)
                .forEach(index -> popupsJpaRepository.save(일반_팝업_스토어_생성_펫샵_작성자아이디(index)));

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
        LongStream.rangeClosed(1, 20)
                .forEach(index -> popupsJpaRepository.save(일반_팝업_스토어_생성_펫샵_작성자아이디(index)));

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
