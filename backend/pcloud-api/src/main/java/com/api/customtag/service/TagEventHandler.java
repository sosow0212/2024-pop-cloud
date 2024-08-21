package com.api.customtag.service;

import com.domain.common.CustomTagType;
import com.domain.customtag.domain.CustomTag;
import com.domain.customtag.domain.CustomTagRepository;
import com.domain.exhibition.event.ExhibitionTagsCreatedEvents;
import com.domain.exhibition.event.ExhibitionTagsUpdatedEvents;
import com.domain.popups.event.PopupsTagsCreatedEvents;
import com.domain.popups.event.PopupsTagsUpdatedEvents;
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
        List<CustomTag> customTags = getCustomTag(event.tags(), event.type(), event.popupsId());
        customTagRepository.saveAll(customTags);
    }

    private List<CustomTag> getCustomTag(
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
        List<CustomTag> customTags = getCustomTag(event.tags(), event.type(), event.popupsId());
        customTagRepository.deleteAllByTypeAndTargetId(event.type(), event.popupsId());
        customTagRepository.saveAll(customTags);
    }

    @EventListener(ExhibitionTagsCreatedEvents.class)
    public void saveExhibitionTags(final ExhibitionTagsCreatedEvents event) {
        List<CustomTag> customTags = getCustomTag(event.tags(), event.type(), event.exhibitionId());
        customTagRepository.saveAll(customTags);
    }

    @EventListener(ExhibitionTagsUpdatedEvents.class)
    public void updateExhibitionTags(final ExhibitionTagsUpdatedEvents event) {
        List<CustomTag> customTags = getCustomTag(event.tags(), event.type(), event.exhibitionId());
        customTagRepository.deleteAllByTypeAndTargetId(event.type(), event.exhibitionId());
        customTagRepository.saveAll(customTags);
    }
}
