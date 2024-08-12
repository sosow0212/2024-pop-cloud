package com.domain.domains.popups.domain;

import com.domain.domains.popups.domain.response.PopupsSimpleResponse;
import com.domain.domains.popups.domain.response.PopupsSpecificResponse;

import java.util.List;
import java.util.Optional;

public interface PopupsRepository {

    Optional<Popups> findById(Long id);

    Popups save(Popups popups);

    Optional<PopupsSpecificResponse> findSpecificById(Long id);

    List<PopupsSimpleResponse> findAllWithPaging(Long popupsId, Integer pageSize);
}