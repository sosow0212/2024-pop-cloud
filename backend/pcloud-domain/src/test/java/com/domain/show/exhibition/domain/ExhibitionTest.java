package com.domain.show.exhibition.domain;

import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static show.exhibition.domain.ExhibitionFixture.개인전시회_생성_디자인_개인전;
import static show.exhibition.domain.ExhibitionFixture.개인전시회_생성_사진_개인전;

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
    }
}
