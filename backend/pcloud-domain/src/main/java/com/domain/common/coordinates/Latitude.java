package com.domain.common.coordinates;

import com.domain.show.popups.exception.PopupsException;
import com.domain.show.popups.exception.PopupsExceptionType;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode(of = "value")
@Embeddable
public class Latitude {

    private static final BigDecimal KOREA_MIN_LATITUDE = BigDecimal.valueOf(33);
    private static final BigDecimal KOREA_MAX_LATITUDE = BigDecimal.valueOf(39);

    // 위도
    @Column(name = "latitude", scale = 7, precision = 13, nullable = false)
    private BigDecimal value;

    private Latitude(final BigDecimal value) {
        validateKoreaLatitude(value);
        this.value = value;
    }

    public static Latitude from(final String value) {
        return new Latitude(new BigDecimal(value));
    }

    public static Latitude from(BigDecimal value) {
        if (value.compareTo(KOREA_MIN_LATITUDE) < 0) {
            value = KOREA_MIN_LATITUDE;
        }

        if (value.compareTo(KOREA_MAX_LATITUDE) > 0) {
            value = KOREA_MAX_LATITUDE;
        }

        return new Latitude(value);
    }

    private void validateKoreaLatitude(final BigDecimal value) {
        if (value.compareTo(KOREA_MIN_LATITUDE) < 0 || value.compareTo(KOREA_MAX_LATITUDE) > 0) {
            throw new PopupsException(PopupsExceptionType.INVALID_LATITUDE);
        }
    }
}
