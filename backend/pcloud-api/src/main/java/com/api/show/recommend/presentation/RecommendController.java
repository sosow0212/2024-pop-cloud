package com.api.show.recommend.presentation;

import com.api.show.annotation.RequestForDateSearch;
import com.api.show.popups.application.request.DateSearchRequest;
import com.api.show.recommend.application.RecommendService;
import com.domain.show.recommend.domain.Recommend;
import com.domain.show.recommend.domain.dto.RecommendSimpleResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/recommends")
@RestController
public class RecommendController {

    private final RecommendService recommendService;

    @GetMapping("/popularity")
    public ResponseEntity<List<RecommendSimpleResponse>> findPopularShowsWithinDateRange(@RequestForDateSearch final DateSearchRequest dateSearchRequest) {
        List<Recommend> recommends = recommendService.findPopularShowsWithinDateRange(dateSearchRequest);
        return ResponseEntity.ok(RecommendSimpleResponse.from(recommends));
    }
}
