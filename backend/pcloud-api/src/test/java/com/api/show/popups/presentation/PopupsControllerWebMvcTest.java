package com.api.show.popups.presentation;

import com.api.helper.MockBeanInjection;
import com.api.show.common.resolver.ClientIpFinderResolver;
import com.api.show.popups.application.request.PopupsCreateRequest;
import com.api.show.popups.application.request.PopupsUpdateRequest;
import com.domain.show.popups.domain.response.PopupsSpecificResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static com.api.helper.RestDocsHelper.customDocument;
import static com.api.show.popups.fixture.request.PopupsRequestFixtures.팝업스토어_생성_요청;
import static com.api.show.popups.fixture.request.PopupsRequestFixtures.팝업스토어_업데이트_요청;
import static member.fixture.MemberFixture.어드민_멤버_생성_id_없음_kakao_oauth_가입;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
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
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static show.popups.domain.PopupsSpecificResponseFixture.팝업스토어_상세_조회_응답_생성;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@AutoConfigureRestDocs
@WebMvcTest(PopupsController.class)
class PopupsControllerWebMvcTest extends MockBeanInjection {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private ClientIpFinderResolver clientIpFinderResolver;

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
                                fieldWithPath("isFoodAllowed").description("식음료 반입 여부"),
                                fieldWithPath("isPetAllowed").description("반려 동물 출입 가능 여부"),
                                fieldWithPath("isKidsZone").description("키즈존 유무"),
                                fieldWithPath("isWifiAvailable").description("와이파이 사용가능 여부"),
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
    void 팝업스토어_상세조회를_한다() throws Exception {
        // given
        PopupsSpecificResponse response = 팝업스토어_상세_조회_응답_생성();
        when(popupsQueryService.findById(anyLong(), anyString())).thenReturn(response);
        when(clientIpFinderResolver.supportsParameter(any())).thenReturn(true);
        when(clientIpFinderResolver.resolveArgument(any(), any(), any(), any())).thenReturn("123.11.1.1");

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
                                fieldWithPath("startDate").description("팝업스토어 시작일"),
                                fieldWithPath("endDate").description("팝업스토어 종료일"),
                                fieldWithPath("openTimes").description("팝업스토어 운영 시간"),
                                fieldWithPath("location").description("팝업스토어 장소명"),
                                fieldWithPath("latitude").description("위도"),
                                fieldWithPath("longitude").description("경도"),
                                fieldWithPath("isParkingAvailable").description("주차 가능 여부"),
                                fieldWithPath("isFoodAllowed").description("식음료 반입 여부"),
                                fieldWithPath("isPetAllowed").description("반려 동물 출입 가능 여부"),
                                fieldWithPath("isKidsZone").description("키즈존 유무"),
                                fieldWithPath("isWifiAvailable").description("와이파이 사용가능 여부"),
                                fieldWithPath("fee").description("팝업스토어 입장요금"),
                                fieldWithPath("publicTag").description("공용 퍼블릭 태그"),
                                fieldWithPath("visitedCount").description("팝업스토어 게시글 방문자 수"),
                                fieldWithPath("likedCount").description("팝업스토어 게시글 좋아요 수"),
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
                                fieldWithPath("isFoodAllowed").description("식음료 반입 여부"),
                                fieldWithPath("isPetAllowed").description("반려 동물 출입 가능 여부"),
                                fieldWithPath("isKidsZone").description("키즈존 유무"),
                                fieldWithPath("isWifiAvailable").description("와이파이 사용가능 여부"),
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

    @Test
    void 팝업스토어를_좋아요_처리한다() throws Exception {
        // given
        when(popupsService.likes(any(), any())).thenReturn(true);

        // when & then
        mockMvc.perform(post("/popups/{popupsId}/likes", 1)
                        .header(AUTHORIZATION, "Bearer tokenInfo ~~")
                        .contentType(MediaType.APPLICATION_JSON)
                ).andExpect(status().isOk())
                .andDo(customDocument("likes_popups",
                        requestHeaders(
                                headerWithName(AUTHORIZATION).description("유저 토큰 정보")
                        ),
                        pathParameters(
                                parameterWithName("popupsId").description("팝업스토어 id")
                        ),
                        responseFields(
                                fieldWithPath("popupsId").description("팝업스토어 id"),
                                fieldWithPath("isStatusLiked").description("팝업스토어 좋아요 상태 (true면 좋아요 처리되고, false면 좋아요 취소 처리됨)")
                        )
                ));
    }
}
