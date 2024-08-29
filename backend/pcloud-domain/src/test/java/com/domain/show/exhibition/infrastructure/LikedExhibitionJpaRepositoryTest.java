package com.domain.show.exhibition.infrastructure;

import com.domain.config.JpaConfig;
import com.domain.show.exhibition.domain.LikedExhibition;
import java.util.Optional;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

import static show.exhibition.domain.LikedExhibitionFixture.개인_전시회_좋아요_생성;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@DataJpaTest
@Import(JpaConfig.class)
class LikedExhibitionJpaRepositoryTest {

    @Autowired
    private LikedExhibitionJpaRepository likedExhibitionJpaRepository;

    @Test
    void 개인전시회_좋아요를_추가한다() {
        // given
        LikedExhibition likedExhibition = 개인_전시회_좋아요_생성();

        // when
        LikedExhibition savedLikedExhibition = likedExhibitionJpaRepository.save(likedExhibition);

        // then
        assertThat(likedExhibition).usingRecursiveComparison()
                .ignoringFields("id")
                .isEqualTo(savedLikedExhibition);
    }

    @Test
    void 개인전시회_좋아요가_존재하면_true를_반환한다() {
        // given
        LikedExhibition savedLikedExhibition = likedExhibitionJpaRepository.save(개인_전시회_좋아요_생성());
        Long exhibitionId = savedLikedExhibition.getExhibitionId();
        Long memberId = savedLikedExhibition.getMemberId();

        // when
        boolean result = likedExhibitionJpaRepository.existsByExhibitionIdAndMemberId(exhibitionId, memberId);

        // then
        assertThat(result).isTrue();
    }

    @Test
    void 개인전시회를_삭제한다() {
        // given
        LikedExhibition savedLikedExhibition = likedExhibitionJpaRepository.save(개인_전시회_좋아요_생성());
        Long exhibitionId = savedLikedExhibition.getExhibitionId();
        Long memberId = savedLikedExhibition.getMemberId();
        Long likedExhibitionId = savedLikedExhibition.getExhibitionId();
        Optional<LikedExhibition> foundBeforeDelete = likedExhibitionJpaRepository.findById(likedExhibitionId);

        // when
        likedExhibitionJpaRepository.deleteByExhibitionIdAndMemberId(exhibitionId, memberId);

        // then
        Optional<LikedExhibition> foundAfterDeleted = likedExhibitionJpaRepository.findById(likedExhibitionId);
        assertSoftly(softly -> {
            softly.assertThat(foundBeforeDelete).isPresent();
            softly.assertThat(foundAfterDeleted).isEmpty();

        });
    }
}
