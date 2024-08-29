package com.domain.show.common;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Lob;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Embeddable
public class ShowSchedule {

    @Column(nullable = false)
    private LocalDateTime startDate;

    @Column(nullable = false)
    private LocalDateTime endDate;

    @Lob
    @Column(nullable = false)
    private String openTimes;

    public static ShowSchedule of(
            final LocalDateTime startDate,
            final LocalDateTime endDate,
            final String openTimes
    ) {
        return ShowSchedule.builder()
                .startDate(startDate)
                .endDate(endDate)
                .openTimes(openTimes)
                .build();
    }
}
