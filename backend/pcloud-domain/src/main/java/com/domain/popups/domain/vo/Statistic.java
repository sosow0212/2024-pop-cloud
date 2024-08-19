package com.domain.popups.domain.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Embeddable
public class Statistic {

    private static final int DEFAULT_STATISTIC_COUNT = 0;

    @Column(nullable = false)
    private Integer visitedCount;

    @Column(nullable = false)
    private Integer likedCount;

    public static Statistic createDefault() {
        return Statistic.builder()
                .visitedCount(DEFAULT_STATISTIC_COUNT)
                .likedCount(DEFAULT_STATISTIC_COUNT)
                .build();
    }

    public void addVisitedCount() {
        this.visitedCount++;
    }

    public void addLikedCount(final boolean canAdd) {
        if (canAdd) {
            this.likedCount++;
            return;
        }

        this.likedCount--;
    }
}
