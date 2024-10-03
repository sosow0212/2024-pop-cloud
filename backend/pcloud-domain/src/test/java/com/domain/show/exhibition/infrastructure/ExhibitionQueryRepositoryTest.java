package com.domain.show.exhibition.infrastructure;

import com.domain.helper.IntegrationHelper;
import com.domain.show.exhibition.domain.Exhibition;
import com.domain.show.exhibition.domain.dto.ExhibitionSpecificResponse;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.math.BigDecimal;
import java.util.Optional;

import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static show.exhibition.domain.ExhibitionFixture.개인전시회_생성_사진_개인전;
import static show.exhibition.domain.ExhibitionSpecificResponseFixture.개인전시회_상세_조회_응답_생성_개인전시회;

@DisplayNameGeneration(ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class ExhibitionQueryRepositoryTest extends IntegrationHelper {

    @Autowired
    private ExhibitionJpaRepository exhibitionJpaRepository;

    @Autowired
    private ExhibitionQueryRepository exhibitionQueryRepository;

    @Test
    void 개인전시회를_상세_조회한다() {
        // given
        Exhibition savedExhibition = exhibitionJpaRepository.save(개인전시회_생성_사진_개인전());
        Long exhibitionId = savedExhibition.getId();

        // when
        Optional<ExhibitionSpecificResponse> response = exhibitionQueryRepository.findSpecificById(exhibitionId);

        // then
        assertSoftly(softly -> {
            softly.assertThat(response).isPresent();
            softly.assertThat(response.get())
                    .usingRecursiveComparison()
                    .ignoringFields("tags")
                    .withComparatorForType(BigDecimal::compareTo, BigDecimal.class)
                    .isEqualTo(개인전시회_상세_조회_응답_생성_개인전시회(savedExhibition));
        });
    }
}
