package com.domain.popups.infrastructure;

import com.domain.popups.domain.Popups;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PopupsJpaRepository extends JpaRepository<Popups, Long> {

    Optional<Popups> findById(Long id);

    Popups save(Popups popups);
}
