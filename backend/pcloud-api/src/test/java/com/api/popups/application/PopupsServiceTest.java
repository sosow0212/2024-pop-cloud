package com.api.popups.application;

import com.api.popups.application.request.PopupsCreateRequest;
import com.common.exception.AuthException;
import com.common.exception.AuthExceptionType;
import com.domain.popups.domain.Popups;
import com.domain.popups.domain.PopupsRepository;
import com.domain.popups.exception.PopupsException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import popups.FakePopupsRepository;

import java.util.Optional;

import static com.api.popups.fixture.request.PopupsRequestFixtures.팝업스토어_생성_요청;
import static com.domain.popups.exception.PopupsExceptionType.POPUPS_NOT_FOUND_EXCEPTION;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static popups.fixture.PopupsFixture.일반_팝업_스토어_생성_뷰티;
import static popups.fixture.PopupsFixture.일반_팝업_스토어_생성_뷰티_유효하지_않은_주인;
import static popups.fixture.PopupsFixture.일반_팝업_스토어_생성_펫샵;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class PopupsServiceTest {

    private PopupsService popupsService;
    private PopupsRepository popupsRepository;

    @BeforeEach
    void setup() {
        popupsRepository = new FakePopupsRepository();
        popupsService = new PopupsService(popupsRepository);
    }

    @Test
    void 팝업_스토어를_생성한다() {
        // given
        Long memberId = 1L;
        PopupsCreateRequest request = 팝업스토어_생성_요청();

        // when
        Long response = popupsService.create(memberId, request);

        // then
        assertThat(response).isEqualTo(1L);
    }

    @Nested
    class 팝업스토어_업데이트 {

        @Test
        void 정상적으로_업데이트한다() {
            // given
            Popups savedPopups = popupsRepository.save(일반_팝업_스토어_생성_뷰티());
            Popups updatedPopups = 일반_팝업_스토어_생성_펫샵();

            // when
            savedPopups.update(updatedPopups);

            // then
            Optional<Popups> found = popupsRepository.findById(savedPopups.getId());
            assertSoftly(softly -> {
                softly.assertThat(found).isPresent();
                softly.assertThat(found.get())
                        .usingRecursiveComparison()
                        .ignoringFields("id")
                        .isEqualTo(updatedPopups);
            });
        }

        @Test
        void 유저가_다르면_업데이트하지_못한다() {
            // given
            Popups savedPopups = popupsRepository.save(일반_팝업_스토어_생성_뷰티());
            Popups updatedPopups = 일반_팝업_스토어_생성_뷰티_유효하지_않은_주인();

            // when & then
            assertThatThrownBy(() -> savedPopups.update(updatedPopups))
                    .isInstanceOf(AuthException.class)
                    .hasMessageContaining(AuthExceptionType.AUTH_NOT_EQUALS_EXCEPTION.message());
        }
    }

    @Nested
    class 팝업_좋아요_테스트 {

        @Test
        void 팝업을_찾을_수_없다면_예외를_발생시킨다() {
            // when & then
            assertThatThrownBy(() -> popupsService.likes(-1L, -1L))
                    .isInstanceOf(PopupsException.class)
                    .hasMessageContaining(POPUPS_NOT_FOUND_EXCEPTION.message());
        }

        @Test
        void 좋아요_기록이_없다면_좋아요_처리_및_true를_반환한다() {
            // given
            Popups popups = popupsRepository.save(일반_팝업_스토어_생성_뷰티());
            Integer beforeLikesCount = popups.getStatistic().getLikedCount();

            // when
            boolean result = popupsService.likes(1L, popups.getId());

            // then
            assertSoftly(softly -> {
                softly.assertThat(result).isTrue();
                softly.assertThat(popups.getStatistic().getLikedCount()).isEqualTo(beforeLikesCount + 1);
            });
        }

        @Test
        void 좋아요_기록이_있다면_좋아요_취소_처리_및_false를_반환한다() {
            // given
            Popups popups = popupsRepository.save(일반_팝업_스토어_생성_뷰티());
            popupsService.likes(1L, popups.getId());
            Integer beforeLikesCount = popups.getStatistic().getLikedCount();

            // when
            boolean result = popupsService.likes(1L, popups.getId());

            // then
            assertSoftly(softly -> {
                softly.assertThat(result).isFalse();
                softly.assertThat(popups.getStatistic().getLikedCount()).isEqualTo(beforeLikesCount - 1);
            });
        }
    }
}
