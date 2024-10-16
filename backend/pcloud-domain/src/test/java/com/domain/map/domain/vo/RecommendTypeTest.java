package com.domain.map.domain.vo;

import com.domain.map.exception.MapException;
import com.domain.map.exception.MapExceptionType;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class RecommendTypeTest {

    @Test
    void 추천_경로_타입을_enum으로_변경한다() {
        // given
        String type = "shortest";

        // when
        RecommendType result = RecommendType.from(type);

        // then
        assertThat(result).isEqualTo(RecommendType.SHORTEST);
    }

    @Test
    void 잘못된_값이_오면_예외를_반환한다() {
        // given
        String wrongType = "wrong";

        // when & then
        assertThatThrownBy(() -> RecommendType.from(wrongType))
                .isInstanceOf(MapException.class)
                .hasMessageContaining(MapExceptionType.RECOMMEND_TYPE_INVALID_EXCEPTION.message());
    }
}
