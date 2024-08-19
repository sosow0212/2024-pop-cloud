package com.domain.domains.customtag.infrastructure;

import com.domain.customtag.domain.CustomTag;
import com.domain.customtag.infrastructure.CustomTagJpaRepository;
import com.domain.helper.IntegrationHelper;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

import static customtag.fixture.CustomTagFixture.팝업_태그_생성_타겟_아이디_1L;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class CustomTagJpaRepositoryTest extends IntegrationHelper {

    @Autowired
    private CustomTagJpaRepository customTagJpaRepository;

    @Test
    void 타입과_타겟_아이디로_찾는다() {
        // given
        CustomTag customTag = 팝업_태그_생성_타겟_아이디_1L();
        customTagJpaRepository.save(customTag);

        // when
        Optional<CustomTag> result = customTagJpaRepository.findByTypeAndTargetId(customTag.getType(), customTag.getTargetId());

        // then
        assertSoftly(softly -> {
            softly.assertThat(result).isPresent();
            softly.assertThat(result.get())
                    .usingRecursiveComparison()
                    .ignoringFields("id")
                    .isEqualTo(customTag);
        });
    }

    @Test
    void 타입과_타겟_아이디로_지운다() {
        // given
        CustomTag customTag = 팝업_태그_생성_타겟_아이디_1L();
        customTagJpaRepository.save(customTag);

        // when
        customTagJpaRepository.deleteAllByTypeAndTargetId(customTag.getType(), customTag.getTargetId());

        // then
        Optional<CustomTag> result = customTagJpaRepository.findByTypeAndTargetId(customTag.getType(), customTag.getTargetId());
        assertThat(result).isEmpty();
    }
}
