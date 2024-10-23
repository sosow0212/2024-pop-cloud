package com.domain.show.common.image.domain;

import com.domain.common.ShowType;
import com.domain.show.common.image.exception.ImageException;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;

import static com.domain.show.common.image.exception.ImageExceptionType.UNSUPPORTED_IMAGE_FORMAT_EXCEPTION;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class ImageTest {

    @Test
    void origin_이름을_uuid로_변환시킨다() {
        // when
        Image image = Image.of(ShowType.POPUPS, 1L, "hi.jpg");

        // then
        assertThat(image.getUniqueName()).isNotEqualTo(image.getOriginName());
    }

    @Test
    void 확장자가_지원하지_않으면_예외를_발생시킨다() {
        // when & then
        assertThatThrownBy(() -> Image.of(ShowType.POPUPS, 1L, "hi"))
                .isInstanceOf(ImageException.class)
                .hasMessageContaining(UNSUPPORTED_IMAGE_FORMAT_EXCEPTION.message());
    }
}
