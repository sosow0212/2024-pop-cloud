package com.api.show.recommend.presentation.resolver.util;

import com.domain.show.common.ShowType;
import com.domain.show.recommend.exception.RecommendException;
import com.domain.show.recommend.exception.RecommendExceptionType;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullAndEmptySource;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import static com.domain.show.recommend.exception.RecommendExceptionType.START_DATE_AFTER_END_DATE_EXCEPTION;
import static com.domain.show.recommend.exception.RecommendExceptionType.START_PARAM_DATE_NULL_EXCEPTION;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class PopularShowRequestHelperTest {

    private final PopularShowRequestHelper helper = new PopularShowRequestHelper();

    @NullAndEmptySource
    @ParameterizedTest
    void 필수_파라미터_빈값_검증(final String startDate) {
        // when & then
        assertThatThrownBy(() -> helper.validateParameterRequirement(startDate))
                .isInstanceOf(RecommendException.class)
                .hasMessageContaining(START_PARAM_DATE_NULL_EXCEPTION.message());
    }

    @Test
    void 시작날짜가_종료날짜를_넘어가면_예외를_발생시킨다() {
        // given
        LocalDateTime endDate = LocalDateTime.of(1000, 01, 01, 01, 01);
        LocalDateTime startDate = LocalDateTime.of(2000, 01, 01, 01, 01);

        // when & then
        assertThatThrownBy(() -> helper.validateDateRange(startDate, endDate))
                .isInstanceOf(RecommendException.class)
                .hasMessageContaining(START_DATE_AFTER_END_DATE_EXCEPTION.message());
    }

    @Nested
    class ShowTypes_검증 {

        @Test
        void ShowTypes가_없다면_기본_값으로_전체_선택을_한다() {
            // when
            List<ShowType> showTypes = helper.findShowTypes(null);

            // then
            assertSoftly(softly -> {
                softly.assertThat(showTypes).hasSize(1);
                softly.assertThat(showTypes).containsExactly(ShowType.ALL);
            });
        }

        @Test
        void ShowTypes의_요소가_모두_포함_됐다면_전체_선택으로_변경한다() {
            // given
            String givenParam = "popups, exhibition";

            // when
            List<ShowType> showTypes = helper.findShowTypes(givenParam);

            // then
            assertSoftly(softly -> {
                softly.assertThat(showTypes).hasSize(1);
                softly.assertThat(showTypes).containsExactly(ShowType.ALL);
            });
        }

        @Test
        void showTypes의_특정_요소를_선택한다() {
            // given
            String givenParam = "popups";

            // when
            List<ShowType> showTypes = helper.findShowTypes(givenParam);

            // then
            assertSoftly(softly -> {
                softly.assertThat(showTypes).hasSize(1);
                softly.assertThat(showTypes).containsExactly(ShowType.POPUPS);
            });
        }

        @Test
        void 중복된_요소가_있다면_중복을_제거해준다() {
            // given
            String givenParam = "popups, popups";

            // when
            List<ShowType> showTypes = helper.findShowTypes(givenParam);

            // then
            assertSoftly(softly -> {
                softly.assertThat(showTypes).hasSize(1);
                softly.assertThat(showTypes).containsExactly(ShowType.POPUPS);
            });
        }
    }

    @Nested
    class limit_검증 {

        @NullAndEmptySource
        @ParameterizedTest
        void limit_값이_null_이라면_기본_값을_반환한다(final String limit) {
            // given
            int defaultValue = 5;

            // when
            int result = helper.parseLimit(limit);

            // then
            assertThat(result).isEqualTo(defaultValue);
        }

        @Test
        void limit값에_문자가_섞이면_예외를_발생시킨다() {
            // given
            String limit = "1ab33";

            // when & then
            assertThatThrownBy(() -> helper.parseLimit(limit))
                    .isInstanceOf(RecommendException.class)
                    .hasMessageContaining(RecommendExceptionType.LIMIT_PARAM_NOT_NUMBER_EXCEPTION.message());
        }
    }

    @Nested
    class 날짜_검증 {

        private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        @NullAndEmptySource
        @ParameterizedTest
        void startDate_검증_후_날짜가_빈_값이_온다면_기본_값을_반환한다(final String date) {
            // when
            LocalDateTime result = helper.parseLocalDateTime(date, formatter);

            // then
            assertThat(result).isNotNull();
        }

        @Test
        void 포맷에_맞지_않으면_예외를_발생시킨다() {
            // given
            String date = "2024-08-12 10:32:19.379737";

            // when & then
            assertThatThrownBy(() -> helper.parseLocalDateTime(date, formatter))
                    .isInstanceOf(RecommendException.class)
                    .hasMessageContaining(RecommendExceptionType.DATE_FORMAT_INVALID_EXCEPTION.message());
        }
    }
}
