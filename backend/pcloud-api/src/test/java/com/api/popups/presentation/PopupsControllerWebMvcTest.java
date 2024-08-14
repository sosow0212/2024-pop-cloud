package com.api.popups.presentation;

import com.api.helper.MockBeanInjection;
import com.api.popups.application.request.PopupsCreateRequest;
import com.api.popups.application.request.PopupsUpdateRequest;
import com.domain.domains.popups.domain.response.PopupsSimpleResponse;
import com.domain.domains.popups.domain.response.PopupsSpecificResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static com.api.helper.RestDocsHelper.customDocument;
import static com.api.popups.fixture.request.PopupsRequestFixtures.팝업스토어_생성_요청;
import static com.api.popups.fixture.request.PopupsRequestFixtures.팝업스토어_업데이트_요청;
import static member.fixture.MemberFixture.어드민_멤버_생성_id_없음_kakao_oauth_가입;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.patch;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.restdocs.request.RequestDocumentation.queryParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static popups.fixture.PopupsSpecificResponseFixture.팝업_스토어_상세조회_결과;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@AutoConfigureRestDocs
@WebMvcTest(PopupsController.class)
class PopupsControllerWebMvcTest extends MockBeanInjection {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void 팝업스토어를_생성한다() throws Exception {
        // given
        PopupsCreateRequest request = 팝업스토어_생성_요청();
        when(memberRepository.findById(any())).thenReturn(Optional.ofNullable(어드민_멤버_생성_id_없음_kakao_oauth_가입()));
        when(popupsService.create(any(), eq(request))).thenReturn(1L);

        // when & then
        mockMvc.perform(post("/popups")
                        .header(AUTHORIZATION, "Bearer tokenInfo ~~")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
                ).andExpect(status().isCreated())
                .andDo(customDocument("create_popups",
                        requestHeaders(
                                headerWithName(AUTHORIZATION).description("유저 토큰 정보")
                        ),
                        requestFields(
                                fieldWithPath("title").description("팝업스토어 이름"),
                                fieldWithPath("description").description("팝업스토어 내용"),
                                fieldWithPath("location").description("팝업스토어 열리는 장소"),
                                fieldWithPath("isParkingAvailable").description("주차 가능 여부"),
                                fieldWithPath("fee").description("입장 요금 (없다면 0)"),
                                fieldWithPath("startDate").description("팝업스토어 시작 날짜"),
                                fieldWithPath("endDate").description("팝업스토어 종료 날짜"),
                                fieldWithPath("openTimes").description("팝업스토어 운영 시간"),
                                fieldWithPath("latitude").description("latitude, 위도 정보 (String)"),
                                fieldWithPath("longitude").description("longitude, 경도 정보 (String)"),
                                fieldWithPath("publicTag").description("큰 범주 안에서 퍼블릭 태그"),
                                fieldWithPath("tags").description("업로더가 설정하는 커스텀 태그")
                        ),
                        responseHeaders(
                                headerWithName("location").description("생성된 팝업스토어 redirection URL")
                        )
                ));
    }

    @Test
    void 페이징_조회를_한다() throws Exception {
        // given
        when(popupsQueryService.findAll(any(), any())).thenReturn(List.of(new PopupsSimpleResponse(1L, "빵빵이 전시회", "서울특별시 마포구", LocalDateTime.now().minusDays(30), LocalDateTime.now())));

        // when & then
        mockMvc.perform(get("/popups")
                        .param("popupsId", "11")
                        .param("pageSize", "10")
                ).andExpect(status().isOk())
                .andDo(customDocument("find_all_popups_with_paging",
                        queryParameters(
                                parameterWithName("popupsId").description("마지막으로 받은 popupsId, 맨 처음 조회라면 null 허용"),
                                parameterWithName("pageSize").description("한 페이지에 조회되는 사이즈")
                        ),
                        responseFields(
                                fieldWithPath("[].id").description("팝업스토어 id"),
                                fieldWithPath("[].title").description("팝업스토어 이름"),
                                fieldWithPath("[].location").description("팝업스토어 장소명"),
                                fieldWithPath("[].startDate").description("팝업스토어 시작일"),
                                fieldWithPath("[].endDate").description("팝업스토어 종료일")

                        )
                ));
    }

    @Test
    void 팝업스토어_상세조회를_한다() throws Exception {
        // given
        PopupsSpecificResponse response = 팝업_스토어_상세조회_결과();
        when(popupsQueryService.findById(anyLong())).thenReturn(response);

        // when
        mockMvc.perform(get("/popups/{popupsId}", 1)
                ).andExpect(status().isOk())
                .andDo(customDocument("find_popups",
                        pathParameters(
                                parameterWithName("popupsId").description("팝업스토어 id")
                        ),
                        responseFields(
                                fieldWithPath("id").description("팝업스토어 id"),
                                fieldWithPath("ownerId").description("팝업스토어 게시글 작성자 id"),
                                fieldWithPath("title").description("팝업스토어 이름"),
                                fieldWithPath("description").description("팝업스토어 설명"),
                                fieldWithPath("location").description("팝업스토어 장소명"),
                                fieldWithPath("isParkingAvailable").description("주차 가능 여부"),
                                fieldWithPath("fee").description("팝업스토어 입장요금"),
                                fieldWithPath("startDate").description("팝업스토어 시작일"),
                                fieldWithPath("endDate").description("팝업스토어 종료일"),
                                fieldWithPath("openTimes").description("팝업스토어 운영 시간"),
                                fieldWithPath("latitude").description("위도"),
                                fieldWithPath("longitude").description("경도"),
                                fieldWithPath("publicTag").description("공용 퍼블릭 태그"),
                                fieldWithPath("tags[]").description("커스텀 태그")
                        )
                ));
    }

    @Test
    void 팝업스토어를_업데이트한다() throws Exception {
        // given
        PopupsUpdateRequest request = 팝업스토어_업데이트_요청();
        doNothing().when(popupsService).patchById(any(), any(), eq(request));

        // when & then
        mockMvc.perform(patch("/popups/{popupsId}", 1)
                        .header(AUTHORIZATION, "Bearer tokenInfo ~~")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
                ).andExpect(status().isNoContent())
                .andDo(customDocument("patch_popups",
                        requestHeaders(
                                headerWithName(AUTHORIZATION).description("유저 토큰 정보")
                        ),
                        requestFields(
                                fieldWithPath("title").description("팝업스토어 이름"),
                                fieldWithPath("description").description("팝업스토어 내용"),
                                fieldWithPath("location").description("팝업스토어 열리는 장소"),
                                fieldWithPath("isParkingAvailable").description("주차 가능 여부"),
                                fieldWithPath("fee").description("입장 요금 (없다면 0)"),
                                fieldWithPath("startDate").description("팝업스토어 시작 날짜"),
                                fieldWithPath("endDate").description("팝업스토어 종료 날짜"),
                                fieldWithPath("openTimes").description("팝업스토어 운영 시간"),
                                fieldWithPath("latitude").description("latitude, 위도 정보 (String)"),
                                fieldWithPath("longitude").description("longitude, 경도 정보 (String)"),
                                fieldWithPath("publicTag").description("큰 범주 안에서 퍼블릭 태그"),
                                fieldWithPath("tags").description("업로더가 설정하는 커스텀 태그")
                        )
                ));
    }
}
