package com.api.show.popups.application;

import com.api.show.common.event.ImageCreatedEvent;
import com.api.show.common.event.ImageDeletedEvent;
import com.api.show.common.event.ImageUpdatedEvent;
import com.api.show.popups.application.request.PopupsCreateRequest;
import com.api.show.popups.application.request.PopupsUpdateRequest;
import com.common.config.event.Events;
import com.domain.common.CustomTagType;
import com.domain.show.popups.cache.PopupsCacheRepository;
import com.domain.show.popups.domain.LikedPopups;
import com.domain.show.popups.domain.Popups;
import com.domain.show.popups.domain.PopupsRepository;
import com.domain.show.popups.event.PopupsTagsCreatedEvent;
import com.domain.show.popups.event.PopupsTagsDeletedEvent;
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
        Popups savedPopupsId = popupsRepository.save(request.toDomain(memberId));
        Events.raise(new PopupsTagsCreatedEvent(
                savedPopupsId.getId(),
                request.tags(),
                CustomTagType.POPUPS)
        );
        Events.raise(ImageCreatedEvent.createdPopupsImages(savedPopupsId.getId(), request.imageNames()));

        return savedPopupsId.getId();
    }

    public void patchById(
            final Long memberId,
            final Long popupsId,
            final PopupsUpdateRequest request
    ) {
        Popups foundPopups = findPopups(popupsId);
        foundPopups.validateOwnerEquals(memberId);
        foundPopups.update(request.toDomain(memberId));
        popupsCacheRepository.evictCache(popupsId);
        Events.raise(new PopupsTagsUpdatedEvent(
                foundPopups.getId(),
                request.tags(),
                CustomTagType.POPUPS)
        );
        Events.raise(ImageUpdatedEvent.updatedPopupsImages(foundPopups.getId(), request.imageNames()));
    }

    private Popups findPopups(final Long popupsId) {
        return popupsRepository.findById(popupsId)
                .orElseThrow(() -> new PopupsException(POPUPS_NOT_FOUND_EXCEPTION));
    }

    public void deleteById(final Long memberId, final Long popupsId) {
        Popups foundPopups = findPopups(popupsId);
        foundPopups.validateOwnerEquals(memberId);
        popupsRepository.deleteById(foundPopups.getId());
        Events.raise(new PopupsTagsDeletedEvent(popupsId, CustomTagType.POPUPS));
        Events.raise(ImageDeletedEvent.deletedPopupsImages(popupsId));
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
