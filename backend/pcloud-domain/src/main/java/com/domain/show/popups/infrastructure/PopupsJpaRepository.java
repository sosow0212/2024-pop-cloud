package com.domain.show.popups.infrastructure;

import com.domain.show.popups.domain.Popups;
import io.lettuce.core.dynamic.annotation.Param;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface PopupsJpaRepository extends JpaRepository<Popups, Long> {

    Optional<Popups> findById(Long id);

    @Lock(LockModeType.OPTIMISTIC)
    @Query(value = "select p from Popups p where p.id = :id")
    Optional<Popups> findByIdWithOptimisticLock(@Param("id") Long id);

    Popups save(Popups popups);
}
