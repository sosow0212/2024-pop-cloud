package com.api.show.exhibition.presentation;

import com.api.helper.MockBeanInjection;
import com.api.show.common.resolver.ClientIpFinderResolver;
import com.api.show.exhibition.application.dto.ExhibitionCreateRequest;
import com.api.show.exhibition.application.dto.ExhibitionUpdateRequest;
import com.domain.show.exhibition.domain.dto.ExhibitionSpecificResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static com.api.helper.RestDocsHelper.customDocument;
import static com.api.show.exhibition.fixture.ExhibitionRequestFixtures.개인전시회_생성_요청_생성;
import static com.api.show.exhibition.fixture.ExhibitionRequestFixtures.개인전시회_업데이트_요청_생성;
import static member.fixture.MemberFixture.어드민_멤버_생성_id_없음_kakao_oauth_가입;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.anyLong;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.delete;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.patch;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static show.exhibition.domain.ExhibitionSpecificResponseFixture.개인전시회_상세_조회_응답_생성;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@AutoConfigureRestDocs
@WebMvcTest(ExhibitionController.class)
class ExhibitionControllerWebMvcTest extends MockBeanInjection {

    private static final String BEARER_TOKEN = "Bearer tokenInfo ~~";

    @Autowired
    private ClientIpFinderResolver clientIpFinderResolver;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void 개인전시회를_생성한다() throws Exception {
        // given
        ExhibitionCreateRequest request = 개인전시회_생성_요청_생성();
        when(memberRepository.findById(anyLong())).thenReturn(Optional.of(어드민_멤버_생성_id_없음_kakao_oauth_가입()));
        when(exhibitionService.create(anyLong(), eq(request))).thenReturn(1L);

        // when & then
        mockMvc.perform(post("/exhibitions")
                        .header(AUTHORIZATION, BEARER_TOKEN)
                        .contentType(APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
                ).andExpect(status().isCreated())
                .andDo(customDocument("create_exhibitions",
                        requestHeaders(
                                headerWithName(AUTHORIZATION).description("유저 토큰 정보")
                        ),
                        requestFields(
                                fieldWithPath("title").description("개인전시회 이름"),
                                fieldWithPath("description").description("개인전시회 설명 (소개, 안내, 주의사항 등...)"),
                                fieldWithPath("startDate").description("개인전시회 시작 날짜"),
                                fieldWithPath("endDate").description("개인전시회 종료 날짜"),
                                fieldWithPath("openTimes").description("개인전시회 운영 시간"),
                                fieldWithPath("location").description("개인전시회 열리는 장소"),
                                fieldWithPath("latitude").description("latitude, 위도 정보 (String)"),
                                fieldWithPath("longitude").description("longitude, 경도 정보 (String)"),
                                fieldWithPath("isParkingAvailable").description("주차 가능 여부"),
                                fieldWithPath("isFoodAllowed").description("식음료 반입 여부"),
                                fieldWithPath("isPetAllowed").description("반려 동물 출입 가능 여부"),
                                fieldWithPath("isKidsZone").description("키즈존 유무"),
                                fieldWithPath("isWifiAvailable").description("와이파이 사용가능 여부"),
                                fieldWithPath("fee").description("입장 요금 (없다면 0)"),
                                fieldWithPath("publicTag").description("큰 범주 안에서 퍼블릭 태그"),
                                fieldWithPath("tags").description("업로더가 설정하는 커스텀 태그")
                        ),
                        responseHeaders(
                                headerWithName("location").description("생성된 개인전시회 redirection URL")
                        )
                ));
    }

    @Test
    void 개인전시회를_상세_조회한다() throws Exception {
        // given
        ExhibitionSpecificResponse response = 개인전시회_상세_조회_응답_생성();
        when(exhibitionQueryService.findById(anyLong(), anyString())).thenReturn(response);
        when(clientIpFinderResolver.supportsParameter(any())).thenReturn(true);
        when(clientIpFinderResolver.resolveArgument(any(), any(), any(), any())).thenReturn("123.11.1.1");

        // when & then
        mockMvc.perform(get("/exhibitions/{exhibitionId}", 1L)
                ).andExpect(status().isOk())
                .andDo(customDocument("find_exhibition",
                        pathParameters(
                                parameterWithName("exhibitionId").description("개인전시회 id")
                        ),
                        responseFields(
                                fieldWithPath("exhibitionId").description("개인전시회 id"),
                                fieldWithPath("ownerId").description("개인전시회 게시글 작성자 id"),
                                fieldWithPath("title").description("개인전시회 이름"),
                                fieldWithPath("description").description("개인전시회 설명"),
                                fieldWithPath("startDate").description("팝업스토어 시작일"),
                                fieldWithPath("endDate").description("팝업스토어 종료일"),
                                fieldWithPath("openTimes").description("팝업스토어 운영 시간"),
                                fieldWithPath("location").description("개인전시회 장소명"),
                                fieldWithPath("latitude").description("위도"),
                                fieldWithPath("longitude").description("경도"),
                                fieldWithPath("isParkingAvailable").description("주차 가능 여부"),
                                fieldWithPath("isFoodAllowed").description("식음료 반입 여부"),
                                fieldWithPath("isPetAllowed").description("반려 동물 출입 가능 여부"),
                                fieldWithPath("isKidsZone").description("키즈존 유무"),
                                fieldWithPath("isWifiAvailable").description("와이파이 사용가능 여부"),
                                fieldWithPath("fee").description("입장요금"),
                                fieldWithPath("publicTag").description("공용 퍼블릭 태그"),
                                fieldWithPath("visitedCount").description("개인전시회 게시글 방문자 수"),
                                fieldWithPath("likedCount").description("개인전시회 게시글 좋아요 수"),
                                fieldWithPath("tags[]").description("커스텀 태그")
                        )
                ));
    }

    @Test
    void 개인전시회를_업데이트한다() throws Exception {
        // given
        ExhibitionUpdateRequest request = 개인전시회_업데이트_요청_생성();
        when(memberRepository.findById(anyLong())).thenReturn(Optional.of(어드민_멤버_생성_id_없음_kakao_oauth_가입()));
        doNothing().when(exhibitionService).patchById(anyLong(), anyLong(), eq(request));

        // when & then
        mockMvc.perform(patch("/exhibitions/{exhibitionId}", 1L)
                        .header(AUTHORIZATION, BEARER_TOKEN)
                        .contentType(APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
                ).andExpect(status().isNoContent())
                .andDo(customDocument("patch_exhibition",
                        requestHeaders(
                                headerWithName(AUTHORIZATION).description("유저 토큰 정보")
                        ),
                        pathParameters(
                                parameterWithName("exhibitionId").description("개인전시회 id")
                        ),
                        requestFields(
                                fieldWithPath("title").description("개인전시회 이름"),
                                fieldWithPath("description").description("개인전시회 설명 (소개, 안내, 주의사항 등...)"),
                                fieldWithPath("startDate").description("개인전시회 시작 날짜"),
                                fieldWithPath("endDate").description("개인전시회 종료 날짜"),
                                fieldWithPath("openTimes").description("개인전시회 운영 시간"),
                                fieldWithPath("location").description("개인전시회 열리는 장소"),
                                fieldWithPath("latitude").description("latitude, 위도 정보 (String)"),
                                fieldWithPath("longitude").description("longitude, 경도 정보 (String)"),
                                fieldWithPath("isParkingAvailable").description("주차 가능 여부"),
                                fieldWithPath("isFoodAllowed").description("식음료 반입 여부"),
                                fieldWithPath("isPetAllowed").description("반려 동물 출입 가능 여부"),
                                fieldWithPath("isKidsZone").description("키즈존 유무"),
                                fieldWithPath("isWifiAvailable").description("와이파이 사용가능 여부"),
                                fieldWithPath("fee").description("입장 요금 (없다면 0)"),
                                fieldWithPath("publicTag").description("큰 범주 안에서 퍼블릭 태그"),
                                fieldWithPath("tags").description("업로더가 설정하는 커스텀 태그")
                        )
                ));

    }

    @Test
    void 개인전시회를_삭제한다() throws Exception {
        // given
        when(memberRepository.findById(anyLong())).thenReturn(Optional.of(어드민_멤버_생성_id_없음_kakao_oauth_가입()));
        doNothing().when(exhibitionService).deleteById(anyLong(), anyLong());

        // when & then
        mockMvc.perform(delete("/exhibitions/{exhibitionId}", 1L)
                        .header(AUTHORIZATION, BEARER_TOKEN)
                ).andExpect(status().isNoContent())
                .andDo(customDocument("delete_exhibition",
                        requestHeaders(
                                headerWithName(AUTHORIZATION).description("유저 토큰 정보")
                        ),
                        pathParameters(
                                parameterWithName("exhibitionId").description("개인전시회 id")
                        )
                ));
    }

    @Test
    void 개인전시회_좋아요를_처리한다() throws Exception {
        // given
        when(exhibitionService.toggleLike(anyLong(), anyLong())).thenReturn(true);

        // when & then
        mockMvc.perform(post("/exhibitions/{exhibitionId}/likes", 1L)
                        .header(AUTHORIZATION, BEARER_TOKEN)
                ).andExpect(status().isOk())
                .andDo(customDocument("toggle_exhibition_like",
                        requestHeaders(
                                headerWithName(AUTHORIZATION).description("유저 토큰 정보")
                        ),
                        pathParameters(
                                parameterWithName("exhibitionId").description("개인전시회 id")
                        ),
                        responseFields(
                                fieldWithPath("exhibitionId").description("개인전시회 id"),
                                fieldWithPath("isStatusLiked").description(
                                        "개인전시회 좋아요 상태 (true면 좋아요 처리되고, false면 좋아요 취소 처리됨)")
                        )
                ));
    }
}
