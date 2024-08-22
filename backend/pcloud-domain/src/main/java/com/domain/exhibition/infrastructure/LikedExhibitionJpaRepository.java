package com.domain.exhibition.infrastructure;

import com.domain.exhibition.domain.LikedExhibition;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikedExhibitionJpaRepository extends JpaRepository<LikedExhibition, Long> {

    LikedExhibition save(LikedExhibition likedExhibition);

    boolean existsByExhibitionIdAndMemberId(Long exhibitionId, Long memberId);

    void deleteByExhibitionIdAndMemberId(Long exhibitionId, Long memberId);
}
