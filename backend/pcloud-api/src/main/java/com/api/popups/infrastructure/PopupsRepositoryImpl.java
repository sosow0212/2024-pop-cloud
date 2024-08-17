package com.api.popups.infrastructure;

import com.domain.domains.popups.domain.LikedPopups;
import com.domain.domains.popups.domain.Popups;
import com.domain.domains.popups.domain.PopupsRepository;
import com.domain.domains.popups.domain.response.PopupsSimpleResponse;
import com.domain.domains.popups.domain.response.PopupsSpecificResponse;
import com.domain.domains.popups.infrastructure.LikedPopupsJpaRepository;
import com.domain.domains.popups.infrastructure.PopupsJpaRepository;
import com.domain.domains.popups.infrastructure.PopupsQueryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class PopupsRepositoryImpl implements PopupsRepository {

    private final PopupsJpaRepository popupsJpaRepository;
    private final PopupsQueryRepository popupsQueryRepository;
    private final LikedPopupsJpaRepository likedPopupsJpaRepository;

    @Override
    public Optional<Popups> findById(final Long id) {
        return popupsJpaRepository.findById(id);
    }

    @Override
    public Popups save(final Popups popups) {
        return popupsJpaRepository.save(popups);
    }

    @Override
    public Optional<PopupsSpecificResponse> findSpecificById(final Long id) {
        return popupsQueryRepository.findSpecificById(id);
    }

    @Override
    public List<PopupsSimpleResponse> findAllWithPaging(final Long popupsId, final Integer pageSize) {
        return popupsQueryRepository.findAllWithPaging(popupsId, pageSize);
    }

    @Override
    public boolean existsByProductIdAndMemberId(final Long popupsId, final Long memberId) {
        return likedPopupsJpaRepository.existsByPopupsIdAndMemberId(popupsId, memberId);
    }

    @Override
    public void deleteLikedPopupsByPopupsIdAndMemberId(final Long popupsId, final Long memberId) {
        likedPopupsJpaRepository.deleteByPopupsIdAndMemberId(popupsId, memberId);
    }

    @Override
    public LikedPopups saveLikedPopups(final LikedPopups likedPopups) {
        return likedPopupsJpaRepository.save(likedPopups);
    }
}
