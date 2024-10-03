package com.domain.show.exhibition.domain;

import com.domain.show.exhibition.domain.dto.ExhibitionSpecificResponse;

import java.util.Optional;

public interface ExhibitionRepository {

    Exhibition save(Exhibition exhibition);

    LikedExhibition saveLikedExhibition(LikedExhibition likedExhibition);

    Optional<Exhibition> findById(Long exhibitionId);

    Optional<Exhibition> findByIdWithOptimisticLock(Long exhibitionId);

    Optional<ExhibitionSpecificResponse> findSpecificById(Long exhibitionId);

    boolean existsByExhibitionIdAndMemberId(Long exhibitionId, Long memberId);

    void deleteLikedExhibitionByExhibitionIdAndMemberId(Long exhibitionId, Long memberId);

    void deleteById(Long exhibitionId);
}
