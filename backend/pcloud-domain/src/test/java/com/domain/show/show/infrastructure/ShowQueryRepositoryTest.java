package com.domain.show.show.infrastructure;

import com.domain.helper.IntegrationHelper;
import com.domain.show.common.ShowType;
import com.domain.show.exhibition.infrastructure.ExhibitionJpaRepository;
import com.domain.show.show.domain.dto.ShowSimpleResponse;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.LongStream;

import static org.assertj.core.api.Assertions.assertThat;
import static show.exhibition.domain.ExhibitionFixture.개인전시회_생성_사진_개인전_작성자아이디;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class ShowQueryRepositoryTest extends IntegrationHelper {

    @Autowired
    private ShowQueryRepository showQueryRepository;

    @Autowired
    private ExhibitionJpaRepository exhibitionJpaRepository;

    @Nested
    class 개인전시회_페이징_조회 {

        @Test
        void 첫_번째_페이징_조회_시_exhibition_id값이_null로_조회된다() {
            // given
            createExhibitions(20);
            int pageSize = 10;

            // when
            List<ShowSimpleResponse> responses = showQueryRepository.findAllWithPaging(null, pageSize, ShowType.EXHIBITION, List.of(), List.of(), LocalDateTime.of(2024, 1, 1, 0, 0), LocalDateTime.of(2025, 1, 1, 0, 0));

            // then
            assertThat(responses).hasSize(pageSize);
        }

        @Test
        void 첫_번째_페이징_조회가_아닐_경우_exhibition_id값으로_페이징_조회가된다() {
            // given
            createExhibitions(15);
            Long exhibitionId = 12L;
            int pageSize = 3;

            // when
            List<ShowSimpleResponse> responses = showQueryRepository.findAllWithPaging(exhibitionId, pageSize, ShowType.EXHIBITION, List.of(), List.of(), LocalDateTime.of(2024, 1, 1, 0, 0), LocalDateTime.of(2025, 1, 1, 0, 0));

            // then
            assertThat(responses).hasSize(pageSize);
        }

        private void createExhibitions(final int count) {
            LongStream.rangeClosed(1, count)
                    .forEach(index -> exhibitionJpaRepository.save(개인전시회_생성_사진_개인전_작성자아이디(index)));
        }
    }
}
