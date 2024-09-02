package com.domain.show.recommend.domain;

import com.domain.show.popups.domain.service.PopularityCalculator;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Comparator;
import java.util.List;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Recommends {

    private List<Recommend> recommends;

    public static Recommends from(final List<Recommend> recommends) {
        return new Recommends(recommends);
    }

    public Recommends findPopularityShows(final PopularityCalculator popularityCalculator, final int limit) {
        return new Recommends(recommends.stream()
                .sorted(makeReverseOrder(popularityCalculator))
                .limit(limit)
                .toList());
    }

    private Comparator<Recommend> makeReverseOrder(final PopularityCalculator popularityCalculator) {
        return (o1, o2) -> Double.compare(
                o2.calculatePopularScore(popularityCalculator),
                o1.calculatePopularScore(popularityCalculator)
        );
    }
}
