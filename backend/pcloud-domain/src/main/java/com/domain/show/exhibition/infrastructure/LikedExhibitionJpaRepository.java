package com.domain.show.exhibition.infrastructure;

import com.domain.show.exhibition.domain.LikedExhibition;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikedExhibitionJpaRepository extends JpaRepository<LikedExhibition, Long> {

    LikedExhibition save(LikedExhibition likedExhibition);

    boolean existsByExhibitionIdAndMemberId(Long exhibitionId, Long memberId);

    void deleteByExhibitionIdAndMemberId(Long exhibitionId, Long memberId);
}
