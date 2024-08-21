package com.domain.exhibition.domain;

import com.common.exception.AuthException;
import com.common.exception.AuthExceptionType;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import static exhibition.domain.ExhibitionFixture.개인전시회_생성_디자인_개인전;
import static exhibition.domain.ExhibitionFixture.개인전시회_생성_사진_개인전;
import static exhibition.domain.ExhibitionFixture.개인전시회_생성_사진_개인전_작성자아이디;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@DisplayNameGeneration(ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class ExhibitionTest {

    @Nested
    class 개인전시회_업데이트 {

        @Test
        void 개인전시회를_업데이트한다() {
            // given
            Exhibition exhibition = 개인전시회_생성_사진_개인전();
            Exhibition newExhibition = 개인전시회_생성_디자인_개인전();

            // when
            exhibition.update(newExhibition);

            // then
            assertThat(exhibition).usingRecursiveComparison()
                    .isEqualTo(newExhibition);
        }

        @Test
        void 개인전시회_작성자와_업데이트_요청을_보낸_요청자의_정보가_다르면_예외가_발생한다() {
            // given
            Exhibition exhibition = 개인전시회_생성_사진_개인전();
            Long invalidOwnerId = -1L;
            Exhibition newExhibition = 개인전시회_생성_사진_개인전_작성자아이디(invalidOwnerId);

            // when & then
            assertThatThrownBy(() -> exhibition.update(newExhibition))
                    .isInstanceOf(AuthException.class)
                    .hasMessageContaining(AuthExceptionType.AUTH_NOT_EQUALS_EXCEPTION.message());
        }
    }
}
