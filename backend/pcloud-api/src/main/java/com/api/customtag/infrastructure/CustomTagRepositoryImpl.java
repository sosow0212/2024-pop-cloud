package com.api.customtag.infrastructure;

import com.domain.common.CustomTagType;
import com.domain.customtag.domain.CustomTag;
import com.domain.customtag.domain.CustomTagRepository;
import com.domain.customtag.infrastructure.CustomTagJpaRepository;
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
