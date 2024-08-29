package com.api.show.popups.presentation.response;

public record PopupLikedStatusResponse(
        Long popupsId,
        boolean isStatusLiked
) {
}
