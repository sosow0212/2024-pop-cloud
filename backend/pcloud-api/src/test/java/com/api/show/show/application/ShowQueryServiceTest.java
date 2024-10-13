package com.api.show.show.application;

import com.api.show.show.application.dto.ShowPagingFilterRequest;
import com.domain.show.show.domain.ShowRepository;
import com.domain.show.show.domain.dto.ShowSimpleResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.List;

import static com.domain.common.ShowType.EXHIBITION;
import static com.domain.show.common.PublicTag.ARTIST;
import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class ShowQueryServiceTest {

    private ShowQueryService showQueryService;
    private ShowRepository showRepository;

    @BeforeEach
    void setup() {
        showRepository = mock(ShowRepository.class);
        showQueryService = new ShowQueryService(showRepository);
    }

    @Test
    void 페이징_조회를_한다() {
        // given
        ShowPagingFilterRequest request = new ShowPagingFilterRequest(1L, 10, null, null, null, LocalDateTime.of(2024, 1, 1, 0, 0), LocalDateTime.of(2025, 1, 1, 0, 0));
        ShowSimpleResponse response = new ShowSimpleResponse(1L, EXHIBITION, ARTIST, "title", "location", null, null, 1, 1);
        when(showRepository.findAll(any(), any(), any(), any(), any(), any(), any()))
                .thenReturn(List.of(response));

        // when
        List<ShowSimpleResponse> result = showQueryService.findAll(request);

        // then
        assertSoftly(softly -> {
            softly.assertThat(result).hasSize(1);
            softly.assertThat(result.get(0)).isEqualTo(response);
        });
    }
}
