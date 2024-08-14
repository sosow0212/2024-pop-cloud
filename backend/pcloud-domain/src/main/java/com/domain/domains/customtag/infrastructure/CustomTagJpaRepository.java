package com.domain.domains.customtag.infrastructure;

import com.domain.domains.common.CustomTagType;
import com.domain.domains.customtag.domain.CustomTag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomTagJpaRepository extends JpaRepository<CustomTag, Long> {

    Optional<CustomTag> findByTypeAndTargetId(CustomTagType type, Long targetId);

    void deleteAllByTypeAndTargetId(CustomTagType type, Long targetId);
}
