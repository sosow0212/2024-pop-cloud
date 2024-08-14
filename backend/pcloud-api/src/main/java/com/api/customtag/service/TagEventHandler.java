package com.api.customtag.service;

import com.domain.domains.common.CustomTagType;
import com.domain.domains.customtag.domain.CustomTag;
import com.domain.domains.customtag.domain.CustomTagRepository;
import com.domain.domains.popups.event.PopupsTagsCreatedEvents;
import com.domain.domains.popups.event.PopupsTagsUpdatedEvents;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Transactional
@Service
public class TagEventHandler {

    private final CustomTagRepository customTagRepository;

    @EventListener(PopupsTagsCreatedEvents.class)
    public void savePopupsTags(final PopupsTagsCreatedEvents event) {
        List<CustomTag> customTags = getPopupsCustomTag(event.tags(), event.type(), event.popupsId());
        customTagRepository.saveAll(customTags);
    }

    private List<CustomTag> getPopupsCustomTag(
            final List<String> tagNames,
            final CustomTagType type,
            final Long targetId
    ) {
        return tagNames.stream()
                .map(tagName -> CustomTag.of(tagName, type, targetId))
                .toList();
    }

    @EventListener(PopupsTagsUpdatedEvents.class)
    public void updatePopupsTags(final PopupsTagsUpdatedEvents event) {
        List<CustomTag> customTags = getPopupsCustomTag(event.tags(), event.type(), event.popupsId());
        customTagRepository.deleteAllByTypeAndTargetId(event.type(), event.popupsId());
        customTagRepository.saveAll(customTags);
    }
}
