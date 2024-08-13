package com.api.tag.infrastructure;

import com.domain.domains.common.CustomTagType;
import com.domain.domains.customtag.domain.CustomTag;
import com.domain.domains.customtag.domain.CustomTagRepository;
import com.domain.domains.customtag.infrastructure.CustomTagJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class CustomTagRepositoryImpl implements CustomTagRepository {

    private final CustomTagJpaRepository customTagJpaRepository;

    @Override
    public Optional<CustomTag> findByTypeAndTargetId(final CustomTagType type, final Long targetId) {
        return customTagJpaRepository.findByTypeAndTargetId(type, targetId);
    }

    @Override
    public List<CustomTag> saveAll(final List<CustomTag> customTags) {
        return customTagJpaRepository.saveAll(customTags);
    }

    @Override
    public void deleteAllByTypeAndTargetId(final CustomTagType type, final Long targetId) {
        customTagJpaRepository.deleteAllByTypeAndTargetId(type, targetId);
    }
}
