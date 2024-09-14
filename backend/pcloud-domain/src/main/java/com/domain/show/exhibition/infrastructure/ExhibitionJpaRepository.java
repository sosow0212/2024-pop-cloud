package com.domain.show.exhibition.infrastructure;

import com.domain.show.exhibition.domain.Exhibition;
import io.lettuce.core.dynamic.annotation.Param;
import jakarta.persistence.LockModeType;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;

public interface ExhibitionJpaRepository extends JpaRepository<Exhibition, Long> {

    Exhibition save(Exhibition exhibition);

    Optional<Exhibition> findById(Long exhibitionId);

    @Lock(LockModeType.OPTIMISTIC)
    @Query(value = "select e from Exhibition e where e.id = :exhibitionId")
    Optional<Exhibition> findByIdWithOptimisticLock(@Param("exhibitionId") Long exhibitionId);

    void deleteById(Long exhibitionId);
}
