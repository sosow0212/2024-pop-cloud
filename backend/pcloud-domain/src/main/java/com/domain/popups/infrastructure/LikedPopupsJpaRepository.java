package com.domain.popups.infrastructure;

import com.domain.popups.domain.LikedPopups;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikedPopupsJpaRepository extends JpaRepository<LikedPopups, Long> {

    boolean existsByPopupsIdAndMemberId(Long popupsId, Long memberId);

    void deleteByPopupsIdAndMemberId(Long popupsId, Long memberId);

    LikedPopups save(LikedPopups likedPopups);
}
