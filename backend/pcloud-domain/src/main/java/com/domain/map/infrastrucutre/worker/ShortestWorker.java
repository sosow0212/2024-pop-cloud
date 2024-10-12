package com.domain.map.infrastrucutre.worker;

import com.domain.map.domain.ShowIdentifiers;
import com.domain.map.domain.vo.Coordinate;
import com.domain.map.domain.vo.RecommendType;
import com.domain.map.domain.vo.ShowIdentifier;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
public class ShortestWorker implements PathFinderWorker {

    private static final int SQUARE_NUMBER_CONSTANT = 2;

    @Override
    public RecommendType getRecommendType() {
        return RecommendType.SHORTEST;
    }

    @Override
    public void work(final Coordinate myCoordinate, final ShowIdentifiers showIdentifiers) {
        List<ShowIdentifier> result = findShortestWithDijkstraAlgorithm(myCoordinate, showIdentifiers);
        updateShowIdentifiers(showIdentifiers, result);
    }

    private List<ShowIdentifier> findShortestWithDijkstraAlgorithm(final Coordinate myCoordinate, final ShowIdentifiers showIdentifiers) {
        List<ShowIdentifier> originIdentifiers = showIdentifiers.getShowIdentifiers();
        List<ShowIdentifier> identifiersOrderedByShortestPath = new ArrayList<>();
        Set<ShowIdentifier> visited = new HashSet<>();
        Coordinate currentCoordinate = myCoordinate;

        while (visited.size() < originIdentifiers.size()) {
            ShowIdentifier nearestShowIdentifier = findNearestShow(currentCoordinate, originIdentifiers, visited);

            if (nearestShowIdentifier == null) {
                break;
            }

            visited.add(nearestShowIdentifier);
            identifiersOrderedByShortestPath.add(nearestShowIdentifier);
            currentCoordinate = nearestShowIdentifier.getCoordinate();
        }

        return identifiersOrderedByShortestPath;
    }

    private ShowIdentifier findNearestShow(
            final Coordinate currentCoordinate,
            final List<ShowIdentifier> identifiers,
            final Set<ShowIdentifier> visited
    ) {
        return identifiers.stream()
                .filter(show -> !visited.contains(show))
                .min(Comparator.comparingDouble(show -> calculateDistance(currentCoordinate, show.getCoordinate())))
                .orElse(null);
    }

    private double calculateDistance(final Coordinate currentCoordinate, final Coordinate targetCoordinate) {
        BigDecimal latitudeDiff = currentCoordinate.getLatitude().getValue()
                .subtract(targetCoordinate.getLatitude().getValue());

        BigDecimal longDiff = currentCoordinate.getLongitude().getValue()
                .subtract(targetCoordinate.getLongitude().getValue());

        return Math.sqrt(
                latitudeDiff.pow(SQUARE_NUMBER_CONSTANT)
                        .add(longDiff.pow(SQUARE_NUMBER_CONSTANT))
                        .doubleValue()
        );
    }

    private void updateShowIdentifiers(final ShowIdentifiers showIdentifiers, final List<ShowIdentifier> newShowIdentifiers) {
        showIdentifiers.getShowIdentifiers()
                .clear();

        showIdentifiers.getShowIdentifiers()
                .addAll(newShowIdentifiers);
    }
}
