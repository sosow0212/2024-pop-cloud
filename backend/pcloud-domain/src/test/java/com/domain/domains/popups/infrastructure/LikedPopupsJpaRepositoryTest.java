package com.domain.domains.popups.infrastructure;

import com.domain.domains.popups.domain.LikedPopups;
import com.domain.helper.IntegrationHelper;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static popups.fixture.LikedPopupsFixture.팝업_좋아요_생성_팝업_아이디_1_멤버_아이디_1;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class LikedPopupsJpaRepositoryTest extends IntegrationHelper {

    @Autowired
    private LikedPopupsJpaRepository likedPopupsJpaRepository;

    @Test
    void 팝업_좋아요를_저장한다() {
        // given
        LikedPopups likedPopups = 팝업_좋아요_생성_팝업_아이디_1_멤버_아이디_1();

        // when
        LikedPopups savedLikedPopups = likedPopupsJpaRepository.save(likedPopups);

        // then
        assertThat(savedLikedPopups.getId()).isEqualTo(1L);
    }

    @Test
    void 팝업_좋아요가_존재하면_true를_반환한다() {
        // given
        LikedPopups likedPopups = likedPopupsJpaRepository.save(팝업_좋아요_생성_팝업_아이디_1_멤버_아이디_1());

        // when
        boolean result = likedPopupsJpaRepository.existsByPopupsIdAndMemberId(likedPopups.getId(), likedPopups.getMemberId());

        // then
        assertThat(result).isTrue();
    }

    @Test
    void 팝업_좋아요를_제거한다() {
        // given
        LikedPopups savedLikedPopups = likedPopupsJpaRepository.save(팝업_좋아요_생성_팝업_아이디_1_멤버_아이디_1());

        // when
        likedPopupsJpaRepository.deleteByPopupsIdAndMemberId(savedLikedPopups.getPopupsId(), savedLikedPopups.getMemberId());

        // then
        Optional<LikedPopups> result = likedPopupsJpaRepository.findById(savedLikedPopups.getId());
        assertThat(result).isEmpty();
    }
}
