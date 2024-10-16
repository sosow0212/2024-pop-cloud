package com.api.map.infrastructure;

import com.api.map.application.MapRequester;
import com.domain.map.domain.CoordinateRange;
import com.domain.map.dto.ShowsCoordinateSimpleResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@RequiredArgsConstructor
@Component
public class MapRequesterImpl implements MapRequester {

    private final MapQueryRepository mapQueryRepository;

    @Override
    public List<ShowsCoordinateSimpleResponse> findShowsAroundLocation(final CoordinateRange coordinateRange) {
        return mapQueryRepository.findShowsAroundLocation(coordinateRange);
    }
}
