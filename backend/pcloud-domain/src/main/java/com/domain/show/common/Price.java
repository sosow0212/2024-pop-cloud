package com.domain.show.common;

import com.domain.show.popups.exception.PopupsException;
import com.domain.show.popups.exception.PopupsExceptionType;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Embeddable
public class Price {

    private static final int MINIMUM_PRICE = 0;

    @Column(name = "price", nullable = false)
    private BigDecimal value;

    private Price(final BigDecimal value) {
        validateInvalidPrice(value);
        this.value = value;
    }

    public static Price from(final int value) {
        return new Price(new BigDecimal(value));
    }

    private void validateInvalidPrice(final BigDecimal price) {
        if (price.compareTo(BigDecimal.ZERO) < MINIMUM_PRICE) {
            throw new PopupsException(PopupsExceptionType.INVALID_PRICE);
        }
    }
}
