package com.domain.domains.customtag.domain;

import com.domain.domains.common.CustomTagType;

import java.util.List;
import java.util.Optional;

public interface CustomTagRepository {

    Optional<CustomTag> findByTypeAndTargetId(CustomTagType type, Long targetId);

    List<CustomTag> saveAll(List<CustomTag> customTags);

    void deleteAllByTypeAndTargetId(CustomTagType type, Long targetId);
}
