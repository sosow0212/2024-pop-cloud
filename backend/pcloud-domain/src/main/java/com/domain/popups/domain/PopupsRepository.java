package com.domain.popups.domain;

import com.domain.popups.domain.response.PopupsSimpleResponse;
import com.domain.popups.domain.response.PopupsSpecificResponse;

import java.util.List;
import java.util.Optional;

public interface PopupsRepository {

    Optional<Popups> findById(Long id);

    Popups save(Popups popups);

    Optional<PopupsSpecificResponse> findSpecificById(Long id);

    List<PopupsSimpleResponse> findAllWithPaging(Long popupsId, Integer pageSize);

    boolean existsByProductIdAndMemberId(Long popupsId, Long memberId);

    void deleteLikedPopupsByPopupsIdAndMemberId(Long popupsId, Long memberId);

    LikedPopups saveLikedPopups(LikedPopups likedPopups);
}
