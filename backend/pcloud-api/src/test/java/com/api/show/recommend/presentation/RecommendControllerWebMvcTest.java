package com.api.show.recommend.presentation;

import com.api.helper.MockBeanInjection;
import com.api.show.popups.application.request.DateSearchRequest;
import com.domain.common.ShowType;
import com.domain.show.recommend.domain.Recommends;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.List;

import static com.api.helper.RestDocsHelper.customDocument;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.queryParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static show.recommend.RecommendFixture.추천_생성_전시회타입_조회수_좋아요_사용;
import static show.recommend.RecommendFixture.추천_생성_팝업타입_조회수_좋아요_사용;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@AutoConfigureRestDocs
@WebMvcTest(RecommendController.class)
class RecommendControllerWebMvcTest extends MockBeanInjection {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void 기간_범위안에_인기_쇼케이스를_구한다() throws Exception {
        // given
        DateSearchRequest mockRequest = new DateSearchRequest(1, LocalDateTime.now(), LocalDateTime.now(), List.of(ShowType.ALL));
        when(popularShowRequestArgumentResolver.supportsParameter(any())).thenReturn(true);
        when(popularShowRequestArgumentResolver.resolveArgument(any(), any(), any(), any())).thenReturn(mockRequest);
        when(recommendService.findPopularShowsWithinDateRange(any())).thenReturn(
                Recommends.from(List.of(
                        추천_생성_전시회타입_조회수_좋아요_사용(29, 55),
                        추천_생성_팝업타입_조회수_좋아요_사용(21, 40),
                        추천_생성_팝업타입_조회수_좋아요_사용(19, 30),
                        추천_생성_팝업타입_조회수_좋아요_사용(15, 20),
                        추천_생성_팝업타입_조회수_좋아요_사용(10, 10)
                ))
        );

        // when & then
        mockMvc.perform(get("/recommends/popularity")
                        .param("startDate", "2024-01-01")
                        .param("endDate", "2024-12-01")
                        .param("limit", "5")
                        .param("target", "all")
                ).andExpect(status().isOk())
                .andDo(customDocument("find_popularity_shows",
                        queryParameters(
                                parameterWithName("startDate").description("조회 시작 범위 날짜"),
                                parameterWithName("endDate").description("조회 종료 범위 날짜"),
                                parameterWithName("limit").description("최대 몇 개의 인기 쇼케이스를 반환 받을지"),
                                parameterWithName("target").description("쇼케이스 타입 (all, popups, exhibition) updated 24.08.29")
                        ),
                        responseFields(
                                fieldWithPath("[].id").description("특정 쇼케이스 id"),
                                fieldWithPath("[].showType").description("쇼케이스 종류"),
                                fieldWithPath("[].title").description("쇼케이스 이름"),
                                fieldWithPath("[].location").description("쇼케이스 장소명"),
                                fieldWithPath("[].startDate").description("쇼케이스 시작일"),
                                fieldWithPath("[].endDate").description("쇼케이스 종료일")
                        )
                ));
    }
}
