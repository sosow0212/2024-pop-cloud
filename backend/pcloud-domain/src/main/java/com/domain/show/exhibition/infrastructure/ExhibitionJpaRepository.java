package com.domain.show.exhibition.infrastructure;

import com.domain.show.exhibition.domain.Exhibition;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExhibitionJpaRepository extends JpaRepository<Exhibition, Long> {

    Exhibition save(Exhibition exhibition);

    Optional<Exhibition> findById(Long exhibitionId);

    void deleteById(Long exhibitionId);
}
