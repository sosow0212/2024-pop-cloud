package com.domain.exhibition.infrastructure;

import com.domain.config.JpaConfig;
import com.domain.exhibition.domain.Exhibition;
import java.util.Optional;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

import static exhibition.domain.ExhibitionFixture.개인전시회_생성_사진_개인전;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@DataJpaTest
@Import(value = JpaConfig.class)
class ExhibitionJpaRepositoryTest {

    @Autowired
    private ExhibitionJpaRepository exhibitionJpaRepository;

    @Test
    void 개인전시회를_저장한다() {
        // given
        Exhibition exhibition = 개인전시회_생성_사진_개인전();

        // when
        Exhibition savedExhibition = exhibitionJpaRepository.save(exhibition);

        // then
        assertThat(exhibition).usingRecursiveComparison()
                .ignoringFields("id")
                .isEqualTo(savedExhibition);
    }

    @Test
    void 개인전시회를_조회한다() {
        // given
        Exhibition savedExhibition = exhibitionJpaRepository.save(개인전시회_생성_사진_개인전());
        Long exhibitionId = savedExhibition.getId();

        // when
        Optional<Exhibition> foundExhibition = exhibitionJpaRepository.findById(exhibitionId);

        // then
        assertSoftly(softly -> {
            softly.assertThat(foundExhibition).isPresent();
            softly.assertThat(foundExhibition.get())
                    .usingRecursiveComparison()
                    .isEqualTo(savedExhibition);
        });
    }

    @Test
    void 개인전시회를_삭제한다() {
        // given
        Exhibition savedExhibition = exhibitionJpaRepository.save(개인전시회_생성_사진_개인전());
        Long exhibitionId = savedExhibition.getId();
        Optional<Exhibition> foundExhibitionBeforeDelete = exhibitionJpaRepository.findById(exhibitionId);

        // when
        exhibitionJpaRepository.deleteById(exhibitionId);

        // then
        Optional<Exhibition> foundExhibitionAfterDeleted = exhibitionJpaRepository.findById(exhibitionId);
        assertSoftly(softly -> {
            softly.assertThat(foundExhibitionBeforeDelete).isPresent();
            softly.assertThat(foundExhibitionAfterDeleted).isEmpty();
        });
    }
}
