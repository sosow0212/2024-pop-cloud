package com.api.show.exhibition.application;

import com.domain.show.exhibition.domain.Exhibition;
import com.domain.show.exhibition.domain.ExhibitionRepository;
import com.domain.show.exhibition.domain.dto.ExhibitionSpecificResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import show.exhibition.infrasturcture.ExhibitionFakeRepository;

import static org.assertj.core.api.Assertions.assertThat;
import static show.exhibition.domain.ExhibitionFixture.개인전시회_생성_사진_개인전;
import static show.exhibition.domain.ExhibitionSpecificResponseFixture.개인전시회_상세_조회_응답_생성_개인전시회;

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
        String clientIp = "clientIp";

        // when
        ExhibitionSpecificResponse response = exhibitionQueryService.findById(exhibitionId, clientIp);

        // then
        ExhibitionSpecificResponse expectedResponse = 개인전시회_상세_조회_응답_생성_개인전시회(savedExhibition);
        assertThat(response).usingRecursiveComparison()
                .isEqualTo(expectedResponse);
    }
}
