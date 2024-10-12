package com.api.map.presentation;

import com.api.map.application.MapQueryService;
import com.api.map.application.request.MyCoordinateRequestWithDelta;
import com.api.map.application.request.ShowsCoordinateRequest;
import com.api.map.presentation.dto.RecommendRouteResponse;
import com.domain.map.domain.RouteSelector;
import com.domain.map.dto.ShowsCoordinateSimpleResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/maps")
@RestController
public class MapController {

    private final MapQueryService mapQueryService;

    @GetMapping("/recommendation-location")
    public ResponseEntity<List<ShowsCoordinateSimpleResponse>> findShowsAroundLocation(@ModelAttribute @Valid final MyCoordinateRequestWithDelta request) {
        List<ShowsCoordinateSimpleResponse> response = mapQueryService.findShowsAroundLocation(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/recommendation-route")
    public ResponseEntity<List<RecommendRouteResponse>> findShowsByRouteRecommendation(@RequestBody @Valid final ShowsCoordinateRequest request) {
        RouteSelector routeSelector = mapQueryService.findShowsByRouteRecommendation(request);
        return ResponseEntity.ok(RecommendRouteResponse.from(routeSelector));
    }
}
