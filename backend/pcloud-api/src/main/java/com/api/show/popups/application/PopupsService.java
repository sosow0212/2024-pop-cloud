package com.api.show.popups.application;

import com.api.show.popups.application.request.PopupsCreateRequest;
import com.api.show.popups.application.request.PopupsUpdateRequest;
import com.common.config.event.Events;
import com.domain.common.CustomTagType;
import com.domain.show.popups.cache.PopupsCacheRepository;
import com.domain.show.popups.domain.LikedPopups;
import com.domain.show.popups.domain.Popups;
import com.domain.show.popups.domain.PopupsRepository;
import com.domain.show.popups.event.PopupsTagsCreatedEvent;
import com.domain.show.popups.event.PopupsTagsUpdatedEvent;
import com.domain.show.popups.exception.PopupsException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.domain.show.popups.exception.PopupsExceptionType.POPUPS_NOT_FOUND_EXCEPTION;

@RequiredArgsConstructor
@Transactional
@Service
public class PopupsService {

    private final PopupsRepository popupsRepository;
    private final PopupsCacheRepository popupsCacheRepository;

    public Long create(final Long memberId, final PopupsCreateRequest request) {
        Popups popups = popupsRepository.save(request.toDomain(memberId));
        Events.raise(new PopupsTagsCreatedEvent(popups.getId(), request.tags(), CustomTagType.POPUPS));
        return popups.getId();
    }

    public void patchById(
            final Long memberId,
            final Long popupsId,
            final PopupsUpdateRequest request
    ) {
        Popups popups = findPopups(popupsId);
        popups.update(request.toDomain(memberId));
        popupsCacheRepository.evictCache(popupsId);
        Events.raise(new PopupsTagsUpdatedEvent(popups.getId(), request.tags(), CustomTagType.POPUPS));
    }

    private Popups findPopups(final Long popupsId) {
        return popupsRepository.findById(popupsId)
                .orElseThrow(() -> new PopupsException(POPUPS_NOT_FOUND_EXCEPTION));
    }

    public boolean likes(final Long memberId, final Long popupsId) {
        Popups popups = findPopupsWithLock(popupsId);
        boolean canAddLikes = handlePopupsLikes(popupsId, memberId);
        popups.addLikedCount(canAddLikes);
        return canAddLikes;
    }

    private Popups findPopupsWithLock(final Long popupsId) {
        return popupsRepository.findByIdWithOptimisticLock(popupsId)
                .orElseThrow(() -> new PopupsException(POPUPS_NOT_FOUND_EXCEPTION));
    }

    private boolean handlePopupsLikes(final Long popupsId, final Long memberId) {
        if (popupsRepository.existsByProductIdAndMemberId(memberId, popupsId)) {
            popupsRepository.deleteLikedPopupsByPopupsIdAndMemberId(popupsId, memberId);
            return false;
        }

        popupsRepository.saveLikedPopups(LikedPopups.of(popupsId, memberId));
        return true;
    }
}
