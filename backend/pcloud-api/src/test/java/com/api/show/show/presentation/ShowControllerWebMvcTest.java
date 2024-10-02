package com.api.show.show.presentation;

import com.api.helper.MockBeanInjection;
import com.domain.show.show.domain.dto.ShowSimpleResponse;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;

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
import static show.show.domain.dto.ShowSimpleResponseFixture.쇼_페이징_요소_반환;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@AutoConfigureRestDocs
@WebMvcTest(controllers = ShowController.class)
class ShowControllerWebMvcTest extends MockBeanInjection {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void 개인전시회를_페이징_조회한다() throws Exception {
        // given
        List<ShowSimpleResponse> responses = List.of(쇼_페이징_요소_반환());
        when(showQueryService.findAll(any())).thenReturn(responses);

        // when & then
        mockMvc.perform(get("/shows")
                        .param("showId", "10")
                        .param("pageSize", "10")
                        .param("showType", "exhibition")
                        .param("publicTags", "캐릭터")
                        .param("city", "서울")
                        .param("country", "동작구")
                        .param("startDate", "2024-01-01")
                        .param("endDate", "2024-12-31")
                ).andExpect(status().isOk())
                .andDo(customDocument("find_all_show_with_paging",
                        queryParameters(
                                parameterWithName("showId").description("마지막으로 받은 show id, 처음 조회 시 null"),
                                parameterWithName("pageSize").description("한 페이지에 조회되는 데이터 수"),
                                parameterWithName("showType").description("[기본 값 : popups] 쇼케이스 타입 (영문 소문자 popups or exhibition)"),
                                parameterWithName("publicTags").description("퍼블릭 태그 (한글 값) -> 배열"),
                                parameterWithName("city").description("도시 이름 (ex. 서울, 경기도 ...)"),
                                parameterWithName("country").description("상세 위치 (ex. 동작구, 마포구 ...) -> 배열"),
                                parameterWithName("startDate").description("[필수 값] 쇼케이스 시작 날짜"),
                                parameterWithName("endDate").description("[필수 값] 쇼케이스 종료 날짜")
                        ),
                        responseFields(
                                fieldWithPath("[].showId").description("show id"),
                                fieldWithPath("[].showType").description("show id"),
                                fieldWithPath("[].publicTag").description("퍼블릭 태그 명"),
                                fieldWithPath("[].title").description("show 이름"),
                                fieldWithPath("[].location").description("show가 열리는 장소"),
                                fieldWithPath("[].startDate").description("show 시작일"),
                                fieldWithPath("[].endDate").description("show 종료일"),
                                fieldWithPath("[].visitedCount").description("show 게시글 방문자 수"),
                                fieldWithPath("[].likedCount").description("show 게시글 좋아요 수")
                        )
                ));
    }
}
