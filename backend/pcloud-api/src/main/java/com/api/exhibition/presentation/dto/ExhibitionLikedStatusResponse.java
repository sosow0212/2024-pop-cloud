package com.api.exhibition.presentation.dto;

public record ExhibitionLikedStatusResponse(
        Long exhibitionId,
        boolean isStatusLiked
) {
}
