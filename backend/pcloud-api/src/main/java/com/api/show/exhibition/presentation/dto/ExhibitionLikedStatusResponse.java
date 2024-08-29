package com.api.show.exhibition.presentation.dto;

public record ExhibitionLikedStatusResponse(
        Long exhibitionId,
        boolean isStatusLiked
) {
}
