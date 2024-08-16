package com.api.popups.presentation.response;

public record PopupLikedStatusResponse(
        Long popupsId,
        boolean isStatusLiked
) {
}
