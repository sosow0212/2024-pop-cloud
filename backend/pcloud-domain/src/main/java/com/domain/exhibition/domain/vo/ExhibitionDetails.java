package com.domain.exhibition.domain.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Lob;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PUBLIC)
@Embeddable
public class ExhibitionDetails {

    @Column(nullable = false)
    private String title;

    @Lob
    @Column(nullable = false)
    private String description;

    public static ExhibitionDetails of(final String title, final String description) {
        return ExhibitionDetails.builder()
                .title(title)
                .description(description)
                .build();
    }
}
