package com.domain.domains.popups.infrastructure;

import com.domain.domains.popups.domain.Popups;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PopupsJpaRepository extends JpaRepository<Popups, Long> {

    Optional<Popups> findById(Long id);

    Popups save(Popups popups);
}
