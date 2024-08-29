package com.domain.show.exhibition.infrastructure;

import com.domain.show.exhibition.domain.Exhibition;
import com.domain.show.exhibition.infrastructure.dto.ExhibitionSimpleResponse;
import com.domain.show.exhibition.infrastructure.dto.ExhibitionSpecificResponse;
import com.domain.helper.IntegrationHelper;
import show.exhibition.domain.ExhibitionSimpleResponseFixture;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.LongStream;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static show.exhibition.domain.ExhibitionFixture.개인전시회_생성_사진_개인전;
import static show.exhibition.domain.ExhibitionFixture.개인전시회_생성_사진_개인전_작성자아이디;
import static show.exhibition.domain.ExhibitionSpecificResponseFixture.개인전시회_상세_조회_응답_생성_개인전시회;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

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

    @Nested
    class 개인전시회_페이징_조회 {

        @Test
        void 첫_번째_페이징_조회_시_exhibition_id값이_null로_조회된다() {
            // given
            List<Exhibition> exhibitions = createExhibitions(20);
            int pageSize = 10;
            List<ExhibitionSimpleResponse> expectedResponses = exhibitions.stream()
                    .sorted(Comparator.comparing(Exhibition::getId).reversed())
                    .limit(pageSize)
                    .map(ExhibitionSimpleResponseFixture::개인전시회_간단_조회_응답_생성_개인전시회)
                    .toList();

            // when
            List<ExhibitionSimpleResponse> responses = exhibitionQueryRepository.findAllWithPaging(null, pageSize);

            // then
            assertSoftly(softly -> {
                softly.assertThat(responses).hasSize(pageSize);
                softly.assertThat(responses)
                        .containsExactlyElementsOf(expectedResponses);
            });
        }

        @Test
        void 첫_번째_페이징_조회가_아닐_경우_exhibition_id값으로_페이징_조회가된다() {
            // given
            List<Exhibition> exhibitions = createExhibitions(15);
            Long exhibitionId = 12L;
            int pageSize = 3;
            List<ExhibitionSimpleResponse> expectedResponses = exhibitions.stream()
                    .sorted(Comparator.comparing(Exhibition::getId).reversed())
                    .filter(exhibition -> exhibition.getId() < exhibitionId)
                    .limit(pageSize)
                    .map(ExhibitionSimpleResponseFixture::개인전시회_간단_조회_응답_생성_개인전시회)
                    .toList();

            // when
            List<ExhibitionSimpleResponse> responses = exhibitionQueryRepository.findAllWithPaging(exhibitionId, pageSize);

            // then
            assertSoftly(softly -> {
                softly.assertThat(responses).hasSize(pageSize);
                softly.assertThat(responses)
                        .containsExactlyElementsOf(expectedResponses);
            });
        }

        private List<Exhibition> createExhibitions(final int count) {
            List<Exhibition> exhibitions = new ArrayList<>();
            LongStream.rangeClosed(1, count)
                    .forEach(index -> {
                        Exhibition savedExhibition = exhibitionJpaRepository.save(개인전시회_생성_사진_개인전_작성자아이디(index));
                        exhibitions.add(savedExhibition);
                    });
            return exhibitions;
        }
    }
}
