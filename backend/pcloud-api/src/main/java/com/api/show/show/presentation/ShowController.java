package com.api.show.show.presentation;

import com.api.show.show.application.ShowQueryService;
import com.api.show.show.application.dto.ShowPagingFilterRequest;
import com.domain.show.show.domain.dto.ShowSimpleResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/shows")
@RestController
public class ShowController {

    private final ShowQueryService showQueryService;

    @GetMapping
    public ResponseEntity<List<ShowSimpleResponse>> findAll(
            @RequestParam(required = false) final Long showId,
            @RequestParam(required = false, defaultValue = "10") final Integer pageSize,
            @RequestParam(required = false, defaultValue = "popups") final String showType,
            @RequestParam(required = false, defaultValue = "") final List<String> publicTags,
            @RequestParam(required = false, defaultValue = "") final String city,
            @RequestParam(required = false, defaultValue = "") final List<String> country,
            @RequestParam(required = true) final String startDate,
            @RequestParam(required = true) final String endDate
    ) {
        ShowPagingFilterRequest request = ShowPagingFilterRequest.of(showId, pageSize, showType, publicTags, city, country, startDate, endDate);
        return ResponseEntity.ok(showQueryService.findAll(request));
    }
}
