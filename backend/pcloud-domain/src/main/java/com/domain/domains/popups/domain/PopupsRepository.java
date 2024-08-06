package com.domain.domains.popups.domain;

import java.util.Optional;

public interface PopupsRepository {

    Optional<Popups> findById(Long id);

    Popups save(Popups popups);
}
