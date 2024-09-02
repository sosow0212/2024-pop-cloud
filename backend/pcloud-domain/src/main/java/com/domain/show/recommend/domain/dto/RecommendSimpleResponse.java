package com.domain.show.recommend.domain.dto;

import com.domain.show.common.ShowType;
import com.domain.show.recommend.domain.Recommends;

import java.time.LocalDateTime;
import java.util.List;

public record RecommendSimpleResponse(
        Long id,
        ShowType showType,
        String title,
        String location,
        LocalDateTime startDate,
        LocalDateTime endDate
) {

    public static List<RecommendSimpleResponse> from(final Recommends recommends) {
        return recommends.getRecommends().stream()
                .map(recommend -> new RecommendSimpleResponse(
                        recommend.getId(),
                        recommend.getShowType(),
                        recommend.getShowDetails().getTitle(),
                        recommend.getShowDetails().getDescription(),
                        recommend.getShowSchedule().getStartDate(),
                        recommend.getShowSchedule().getEndDate()
                )).toList();
    }
}
