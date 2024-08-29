package com.api.show.exhibition.application;

import com.api.show.exhibition.application.dto.ExhibitionCreateRequest;
import com.api.show.exhibition.application.dto.ExhibitionUpdateRequest;
import com.common.exception.AuthException;
import com.common.exception.AuthExceptionType;
import com.domain.show.exhibition.domain.Exhibition;
import com.domain.show.exhibition.domain.ExhibitionRepository;
import com.domain.show.exhibition.exception.ExhibitionException;
import com.domain.show.exhibition.exception.ExhibitionExceptionType;
import show.exhibition.infrasturcture.ExhibitionFakeRepository;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import static com.api.show.exhibition.fixture.ExhibitionRequestFixtures.개인전시회_생성_요청_생성;
import static com.api.show.exhibition.fixture.ExhibitionRequestFixtures.개인전시회_업데이트_요청_생성;
import static show.exhibition.domain.ExhibitionFixture.개인전시회_생성_사진_개인전;
import static show.exhibition.domain.LikedExhibitionFixture.개인_전시회_좋아요_생성_개인전시회아이디_회원아이디;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class ExhibitionServiceTest {

    private ExhibitionService exhibitionService;
    private ExhibitionRepository exhibitionRepository;

    @BeforeEach
    void setup() {
        exhibitionRepository = new ExhibitionFakeRepository();
        exhibitionService = new ExhibitionService(exhibitionRepository);
    }

    @Test
    void 개인전시회를_생성한다() {
        // given
        Long memberId = 1L;
        ExhibitionCreateRequest request = 개인전시회_생성_요청_생성();

        // when
        Long createdExhibitionId = exhibitionService.create(memberId, request);

        // then
        assertThat(createdExhibitionId).isEqualTo(memberId);
    }

    @Nested
    class 개인전시회_업데이트 {

        @Test
        void 개인전시회를_업데이트한다() {
            // given
            Exhibition savedExhibition = exhibitionRepository.save(개인전시회_생성_사진_개인전());
            Long memberId = savedExhibition.getOwnerId();
            Long exhibitionId = savedExhibition.getId();
            ExhibitionUpdateRequest request = 개인전시회_업데이트_요청_생성();

            // when
            exhibitionService.patchById(memberId, exhibitionId, request);

            // then
            Optional<Exhibition> foundExhibition = exhibitionRepository.findById(exhibitionId);
            assertSoftly(softly -> {
                softly.assertThat(foundExhibition).isPresent();
                softly.assertThat(foundExhibition.get())
                        .usingRecursiveComparison()
                        .ignoringFields("id")
                        .isEqualTo(request.toDomain(memberId));
            });
        }

        @Test
        void 개인전시회가_존재하지_않으면_예외가_발생한다() {
            // given
            Long memberId = 1L;
            Long notExistExhibitionId = -1L;
            ExhibitionUpdateRequest request = 개인전시회_업데이트_요청_생성();

            // when & then
            assertThatThrownBy(() -> exhibitionService.patchById(memberId, notExistExhibitionId, request))
                    .isInstanceOf(ExhibitionException.class)
                    .hasMessageContaining(ExhibitionExceptionType.EXHIBITION_NOT_FOUND_EXCEPTION.message());
        }

        @Test
        void 개인전시회_작성자가_업데이트_요청을_보낸_수정자와_다를_경우_예외가_발생한다() {
            // given
            Exhibition savedExhibition = exhibitionRepository.save(개인전시회_생성_사진_개인전());
            Long invalidMemberId = -1L;
            Long exhibitionId = savedExhibition.getId();
            ExhibitionUpdateRequest request = 개인전시회_업데이트_요청_생성();

            // when & then
            assertThatThrownBy(() -> exhibitionService.patchById(invalidMemberId, exhibitionId, request))
                    .isInstanceOf(AuthException.class)
                    .hasMessageContaining(AuthExceptionType.AUTH_NOT_EQUALS_EXCEPTION.message());
        }
    }

    @Nested
    class 개인전시회_삭제 {

        @Test
        void 개인전시회를_삭제한다() {
            // given
            Long memberId = 1L;
            Exhibition savedExhibition = exhibitionRepository.save(개인전시회_생성_사진_개인전());
            Long exhibitionId = savedExhibition.getId();
            Optional<Exhibition> foundExhibitionBeforeDelete = exhibitionRepository.findById(exhibitionId);

            // when
            exhibitionService.deleteById(memberId, exhibitionId);

            // then
            Optional<Exhibition> foundExhibitionAfterDeleted = exhibitionRepository.findById(exhibitionId);
            assertSoftly(softly -> {
                softly.assertThat(foundExhibitionBeforeDelete).isPresent();
                softly.assertThat(foundExhibitionAfterDeleted).isEmpty();
            });
        }

        @Test
        void 개인전시회_작성자가_삭제_요청을_보낸_요청자와_다를_경우_예외가_발생한다() {
            // given
            Exhibition savedExhibition = exhibitionRepository.save(개인전시회_생성_사진_개인전());
            Long invalidMemberId = -1L;
            Long exhibitionId = savedExhibition.getId();

            // when & then
            assertThatThrownBy(() -> exhibitionService.deleteById(invalidMemberId, exhibitionId))
                    .isInstanceOf(AuthException.class)
                    .hasMessageContaining(AuthExceptionType.AUTH_NOT_EQUALS_EXCEPTION.message());
        }
    }

    @Nested
    class 개인전시회_좋아요_처리 {

        @Test
        void 이전에_좋아요_요청을_하지_않았을_경우_true를_반환한다() {
            // given
            Long memberId = 1L;
            Exhibition savedExhibition = exhibitionRepository.save(개인전시회_생성_사진_개인전());
            Long exhibitionId = savedExhibition.getId();

            // when
            boolean result = exhibitionService.toggleLike(memberId, exhibitionId);

            // then
            assertThat(result).isTrue();
        }

        @Test
        void 이전에_좋아요_요청을_한_경우_false를_반환한다() {
            // given
            Long memberId = 1L;
            Exhibition savedExhibitionId = exhibitionRepository.save(개인전시회_생성_사진_개인전());
            Long exhibitionId = savedExhibitionId.getId();
            exhibitionRepository.saveLikedExhibition(개인_전시회_좋아요_생성_개인전시회아이디_회원아이디(exhibitionId, memberId));

            // when
            boolean result = exhibitionService.toggleLike(memberId, exhibitionId);

            // then
            assertThat(result).isFalse();
        }
    }
}
