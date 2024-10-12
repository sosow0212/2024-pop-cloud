package com.api.map.application.request;

import com.domain.map.domain.RouteSelector;
import com.domain.map.domain.vo.RecommendType;
import com.domain.map.domain.vo.SearchTarget;
import com.domain.map.domain.vo.ShowIdentifier;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record ShowsCoordinateRequest(
        @NotNull(message = "추천 검색 방법을 선택해주세요.")
        String recommendType,

        @Valid
        @NotNull(message = "현재 유저의 중점 좌표를 입력해주세요.")
        MyCoordinateRequest myCoordinate,

        @Valid
        @NotNull(message = "현재 유저 주변에 있는 쇼케이스 좌표를 입력해주세요.")
        List<ShowCoordinateRequest> showsCoordinates
) {

    public RouteSelector toDomain() {
        return RouteSelector.of(
                RecommendType.from(recommendType),
                myCoordinate().latitude(),
                myCoordinate().longitude(),
                showsCoordinates().stream()
                        .map(showsCoordinate -> ShowIdentifier.of(
                                showsCoordinate.id(),
                                SearchTarget.from(showsCoordinate.searchTarget()),
                                showsCoordinate.title(),
                                showsCoordinate.location(),
                                showsCoordinate.latitude(),
                                showsCoordinate.longitude(),
                                showsCoordinate.startDate(),
                                showsCoordinate.endDate(),
                                showsCoordinate.visitedCount(),
                                showsCoordinate.likedCount()
                        )).toList());
    }
}
