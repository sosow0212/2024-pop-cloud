package com.domain.popups.domain.vo;

import com.domain.popups.exception.PopupsException;
import com.domain.popups.exception.PopupsExceptionType;
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
public class Longitude {

    private static final BigDecimal KOREA_MIN_LONGITUDE = BigDecimal.valueOf(125);
    private static final BigDecimal KOREA_MAX_LONGITUDE = BigDecimal.valueOf(132);

    // 경도
    @Column(name = "longitude", scale = 7, precision = 13, nullable = false)
    private BigDecimal value;

    private Longitude(final BigDecimal value) {
        validateKoreaLongitude(value);
        this.value = value;
    }

    public static Longitude from(final String value) {
        return new Longitude(new BigDecimal(value));
    }

    public static Longitude from(final BigDecimal value) {
        return new Longitude(value);
    }

    private void validateKoreaLongitude(final BigDecimal value) {
        if (value.compareTo(KOREA_MIN_LONGITUDE) < 0 || value.compareTo(KOREA_MAX_LONGITUDE) > 0) {
            throw new PopupsException(PopupsExceptionType.INVALID_LONGITUDE);
        }
    }
}
