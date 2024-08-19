package com.domain.popups.infrastructure;

import com.domain.popups.domain.LikedPopups;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LikedPopupsJpaRepository extends JpaRepository<LikedPopups, Long> {

    @Query("SELECT CASE WHEN COUNT(lp) > 0 THEN true ELSE false END FROM LikedPopups lp WHERE lp.popupsId = :popupsId AND lp.memberId = :memberId")
    boolean existsByPopupsIdAndMemberId(@Param("popupsId") Long popupsId, @Param("memberId") Long memberId);

    void deleteByPopupsIdAndMemberId(Long popupsId, Long memberId);

    LikedPopups save(LikedPopups likedPopups);
}
