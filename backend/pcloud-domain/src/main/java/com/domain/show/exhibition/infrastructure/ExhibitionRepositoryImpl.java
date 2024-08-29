package com.domain.show.exhibition.infrastructure;

import com.domain.show.exhibition.domain.Exhibition;
import com.domain.show.exhibition.domain.ExhibitionRepository;
import com.domain.show.exhibition.domain.LikedExhibition;
import com.domain.show.exhibition.domain.dto.ExhibitionSimpleResponse;
import com.domain.show.exhibition.domain.dto.ExhibitionSpecificResponse;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class ExhibitionRepositoryImpl implements ExhibitionRepository {

    private final ExhibitionJpaRepository exhibitionJpaRepository;
    private final LikedExhibitionJpaRepository likedExhibitionJpaRepository;
    private final ExhibitionQueryRepository exhibitionQueryRepository;

    @Override
    public Exhibition save(final Exhibition exhibition) {
        return exhibitionJpaRepository.save(exhibition);
    }

    @Override
    public LikedExhibition saveLikedExhibition(final LikedExhibition likedExhibition) {
        return likedExhibitionJpaRepository.save(likedExhibition);
    }

    @Override
    public Optional<Exhibition> findById(final Long exhibitionId) {
        return exhibitionJpaRepository.findById(exhibitionId);
    }

    @Override
    public Optional<ExhibitionSpecificResponse> findSpecificById(final Long exhibitionId) {
        return exhibitionQueryRepository.findSpecificById(exhibitionId);
    }

    @Override
    public List<ExhibitionSimpleResponse> findAllWithPaging(final Long exhibitionId, final Integer pageSize) {
        return exhibitionQueryRepository.findAllWithPaging(exhibitionId, pageSize);
    }

    @Override
    public boolean existsByExhibitionIdAndMemberId(final Long exhibitionId, final Long memberId) {
        return likedExhibitionJpaRepository.existsByExhibitionIdAndMemberId(exhibitionId, memberId);
    }

    @Override
    public void deleteLikedExhibitionByExhibitionIdAndMemberId(final Long exhibitionId, final Long memberId) {
        likedExhibitionJpaRepository.deleteByExhibitionIdAndMemberId(exhibitionId, memberId);
    }

    @Override
    public void deleteById(final Long exhibitionId) {
        exhibitionJpaRepository.deleteById(exhibitionId);
    }
}
