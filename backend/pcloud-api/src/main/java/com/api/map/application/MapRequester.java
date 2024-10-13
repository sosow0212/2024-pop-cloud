package com.api.map.application;

import com.domain.map.domain.CoordinateRange;
import com.domain.map.dto.ShowsCoordinateSimpleResponse;

import java.util.List;

public interface MapRequester {

    List<ShowsCoordinateSimpleResponse> findShowsAroundLocation(CoordinateRange coordinateRange);
}
