package com.domain.show.exhibition.domain;

import com.domain.show.exhibition.domain.dto.ExhibitionSimpleResponse;
import com.domain.show.exhibition.domain.dto.ExhibitionSpecificResponse;
import java.util.List;
import java.util.Optional;

public interface ExhibitionRepository {

    Exhibition save(Exhibition exhibition);

    LikedExhibition saveLikedExhibition(LikedExhibition likedExhibition);

    Optional<Exhibition> findById(Long exhibitionId);

    Optional<Exhibition> findByIdWithOptimisticLock(Long exhibitionId);

    Optional<ExhibitionSpecificResponse> findSpecificById(Long exhibitionId);

    List<ExhibitionSimpleResponse> findAllWithPaging(Long exhibitionId, Integer pageSize);

    boolean existsByExhibitionIdAndMemberId(Long exhibitionId, Long memberId);

    void deleteLikedExhibitionByExhibitionIdAndMemberId(Long exhibitionId, Long memberId);

    void deleteById(Long exhibitionId);
}
