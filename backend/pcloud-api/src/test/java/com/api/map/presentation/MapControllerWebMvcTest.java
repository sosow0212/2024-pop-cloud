package com.api.map.presentation;

import com.api.helper.MockBeanInjection;
import com.api.map.application.request.MyCoordinateRequestWithDelta;
import com.api.map.application.request.ShowsCoordinateRequest;
import com.domain.map.domain.RouteSelector;
import com.domain.map.domain.vo.RecommendType;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.List;

import static com.api.helper.RestDocsHelper.customDocument;
import static map.fixture.맵_응답_픽스처.쇼_주변_좌표_응답_픽스처.주변_좌표_응답_생성_용마산;
import static map.fixture.맵_픽스처.추천_경로_픽스처.추천_경로_생성_인기순;
import static map.맵_요청_픽스처.내_위치와_델타_요청_픽스처.용마산_위치와_델타_생성;
import static map.맵_요청_픽스처.추천_경로_생성_픽스처.나의_위치_요청_생성;
import static map.맵_요청_픽스처.추천_경로_생성_픽스처.주변_쇼의_위치_생성;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.queryParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@AutoConfigureRestDocs
@WebMvcTest(MapController.class)
class MapControllerWebMvcTest extends MockBeanInjection {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void 팝업스토어_상세조회를_한다() throws Exception {
        // given
        MyCoordinateRequestWithDelta request = 용마산_위치와_델타_생성();
        when(mapQueryService.findShowsAroundLocation(request))
                .thenReturn(List.of(주변_좌표_응답_생성_용마산()));

        // when
        mockMvc.perform(get("/maps/recommendation-location")
                        .queryParam("latitude", String.valueOf(request.latitude()))
                        .queryParam("longitude", String.valueOf(request.longitude()))
                        .queryParam("latitudeDelta", String.valueOf(request.latitudeDelta()))
                        .queryParam("longitudeDelta", String.valueOf(request.latitudeDelta()))
                ).andExpect(status().isOk())
                .andDo(customDocument("find_around_shows",
                        queryParameters(
                                parameterWithName("latitude").description("현재 위도 (latitude)"),
                                parameterWithName("longitude").description("현재 경도 (longitude)"),
                                parameterWithName("latitudeDelta").description("위도의 범위를 정하는 변수"),
                                parameterWithName("longitudeDelta").description("경도의 범위를 정하는 변수")
                        ),
                        responseFields(
                                fieldWithPath("[].searchTarget").description("쇼의 타입 (POPUPS or EXHIBITION)"),
                                fieldWithPath("[].id").description("show id"),
                                fieldWithPath("[].title").description("show 타이틀"),
                                fieldWithPath("[].position.location").description("show의 위치"),
                                fieldWithPath("[].position.latitude.value").description("show의 위도").type(BigDecimal.class),
                                fieldWithPath("[].position.longitude.value").description("show의 경도").type(BigDecimal.class),
                                fieldWithPath("[].startDate").description("show 시작 날짜"),
                                fieldWithPath("[].endDate").description("show 종료 날짜"),
                                fieldWithPath("[].visitedCount").description("쇼 조회수"),
                                fieldWithPath("[].likedCount").description("쇼 좋아요 클릭 수")
                        )
                ));
    }

    @Test
    void 추천_경로를_반환한다() throws Exception {
        // given
        ShowsCoordinateRequest request = new ShowsCoordinateRequest(
                RecommendType.POPULAR.getName(),
                나의_위치_요청_생성(),
                List.of(주변_쇼의_위치_생성())
        );

        RouteSelector routeSelector = 추천_경로_생성_인기순();

        when(mapQueryService.findShowsByRouteRecommendation(eq(request)))
                .thenReturn(routeSelector);

        // when
        mockMvc.perform(get("/maps/recommendation-route")
                        .contentType(APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
                ).andExpect(status().isOk())
                .andDo(customDocument("find_recommend_shows_routes",
                        requestFields(
                                fieldWithPath("recommendType").description("추천 검색 방법 (shortest OR popular)"),
                                fieldWithPath("myCoordinate.latitude").description("기준 좌표의 위도"),
                                fieldWithPath("myCoordinate.longitude").description("기준 좌표의 경도"),
                                fieldWithPath("showsCoordinates[].searchTarget").description("쇼의 타입 (POPUPS or EXHIBITION)"),
                                fieldWithPath("showsCoordinates[].id").description("show id"),
                                fieldWithPath("showsCoordinates[].title").description("show 타이틀"),
                                fieldWithPath("showsCoordinates[].location").description("show의 위치"),
                                fieldWithPath("showsCoordinates[].latitude").description("show의 위도").type(BigDecimal.class),
                                fieldWithPath("showsCoordinates[].longitude").description("show의 경도").type(BigDecimal.class),
                                fieldWithPath("showsCoordinates[].startDate").description("show 시작 날짜"),
                                fieldWithPath("showsCoordinates[].endDate").description("show 종료 날짜"),
                                fieldWithPath("showsCoordinates[].visitedCount").description("쇼 조회수"),
                                fieldWithPath("showsCoordinates[].likedCount").description("쇼 좋아요 클릭 수")
                        ),
                        responseFields(
                                fieldWithPath("[].searchTarget").description("쇼의 타입 (POPUPS or EXHIBITION)"),
                                fieldWithPath("[].id").description("show id"),
                                fieldWithPath("[].title").description("show 타이틀"),
                                fieldWithPath("[].position.location").description("show의 위치"),
                                fieldWithPath("[].position.latitude.value").description("show의 위도").type(BigDecimal.class),
                                fieldWithPath("[].position.longitude.value").description("show의 경도").type(BigDecimal.class),
                                fieldWithPath("[].startDate").description("show 시작 날짜"),
                                fieldWithPath("[].endDate").description("show 종료 날짜"),
                                fieldWithPath("[].visitedCount").description("쇼 조회수"),
                                fieldWithPath("[].likedCount").description("쇼 좋아요 클릭 수")
                        )
                ));
    }
}
