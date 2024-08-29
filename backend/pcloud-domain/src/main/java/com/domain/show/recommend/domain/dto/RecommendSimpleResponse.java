package com.domain.show.recommend.domain.dto;

import com.domain.show.recommend.domain.Recommend;

import java.time.LocalDateTime;
import java.util.List;

public record RecommendSimpleResponse(
        Long id,
        String title,
        String location,
        LocalDateTime startDate,
        LocalDateTime endDate,
        Integer visitedCount,
        Integer likedCount
) {

    public static List<RecommendSimpleResponse> from(final List<Recommend> recommends) {
        return recommends.stream()
                .map(recommend -> new RecommendSimpleResponse(
                        recommend.getId(),
                        recommend.getShowDetails().getTitle(),
                        recommend.getShowDetails().getDescription(),
                        recommend.getShowSchedule().getStartDate(),
                        recommend.getShowSchedule().getEndDate(),
                        recommend.getStatistics().getVisitedCount(),
                        recommend.getStatistics().getLikedCount()
                )).toList();
    }
}
