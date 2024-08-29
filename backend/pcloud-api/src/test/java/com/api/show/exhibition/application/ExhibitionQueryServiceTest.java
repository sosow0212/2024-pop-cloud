package com.api.show.exhibition.application;

import com.domain.show.exhibition.domain.Exhibition;
import com.domain.show.exhibition.domain.ExhibitionRepository;
import com.domain.show.exhibition.domain.dto.ExhibitionSimpleResponse;
import com.domain.show.exhibition.domain.dto.ExhibitionSpecificResponse;
import show.exhibition.infrasturcture.ExhibitionFakeRepository;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.LongStream;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;

import static show.exhibition.domain.ExhibitionFixture.개인전시회_생성_사진_개인전;
import static show.exhibition.domain.ExhibitionFixture.개인전시회_생성_사진_개인전_작성자아이디;
import static show.exhibition.domain.ExhibitionSimpleResponseFixture.개인전시회_간단_조회_응답_생성_개인전시회;
import static show.exhibition.domain.ExhibitionSpecificResponseFixture.개인전시회_상세_조회_응답_생성_개인전시회;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class ExhibitionQueryServiceTest {

    private ExhibitionQueryService exhibitionQueryService;
    private ExhibitionRepository exhibitionRepository;

    @BeforeEach
    void setup() {
        exhibitionRepository = new ExhibitionFakeRepository();
        exhibitionQueryService = new ExhibitionQueryService(exhibitionRepository);
    }

    @Test
    void 개인전시회를_상세_조회한다() {
        // given
        Exhibition savedExhibition = exhibitionRepository.save(개인전시회_생성_사진_개인전());
        Long exhibitionId = savedExhibition.getId();

        // when
        ExhibitionSpecificResponse response = exhibitionQueryService.findById(exhibitionId);

        // then
        ExhibitionSpecificResponse expectedResponse = 개인전시회_상세_조회_응답_생성_개인전시회(savedExhibition);
        assertThat(response).usingRecursiveComparison()
                .isEqualTo(expectedResponse);
    }

    @Test
    void 개인전시회를_페이징_조회한다() {
        // given
        List<Exhibition> exhibitions = new ArrayList<>();
        LongStream.rangeClosed(1, 10)
                .forEach(index -> {
                    Exhibition savedExhibition = exhibitionRepository.save(개인전시회_생성_사진_개인전_작성자아이디(index));
                    exhibitions.add(savedExhibition);
                });
        exhibitions.sort(Comparator.comparing(Exhibition::getId).reversed());

        // when
        List<ExhibitionSimpleResponse> responses = exhibitionQueryService.findAll(8L, 3);

        // then
        assertSoftly(softly -> {
            softly.assertThat(responses).hasSize(3);
            softly.assertThat(responses.get(0))
                    .usingRecursiveComparison()
                    .isEqualTo(개인전시회_간단_조회_응답_생성_개인전시회(exhibitions.get(3)));
            softly.assertThat(responses.get(1))
                    .usingRecursiveComparison()
                    .isEqualTo(개인전시회_간단_조회_응답_생성_개인전시회(exhibitions.get(4)));
            softly.assertThat(responses.get(2))
                    .usingRecursiveComparison()
                    .isEqualTo(개인전시회_간단_조회_응답_생성_개인전시회(exhibitions.get(5)));
        });
    }
}
