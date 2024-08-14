package com.api.popups.application;

import com.api.popups.application.request.PopupsCreateRequest;
import com.api.popups.application.request.PopupsUpdateRequest;
import com.common.config.event.Events;
import com.domain.domains.common.CustomTagType;
import com.domain.domains.popups.domain.Popups;
import com.domain.domains.popups.domain.PopupsRepository;
import com.domain.domains.popups.event.PopupsTagsCreatedEvents;
import com.domain.domains.popups.event.PopupsTagsUpdatedEvents;
import com.domain.domains.popups.exception.PopupsException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.domain.domains.popups.exception.PopupsExceptionType.POPUPS_NOT_FOUND_EXCEPTION;

@RequiredArgsConstructor
@Transactional
@Service
public class PopupsService {

    private final PopupsRepository popupsRepository;

    public Long create(final Long memberId, final PopupsCreateRequest request) {
        Popups popups = popupsRepository.save(request.toDomain(memberId));
        Events.raise(new PopupsTagsCreatedEvents(popups.getId(), request.tags(), CustomTagType.POPUPS));
        return popups.getId();
    }

    public void patchById(
            final Long memberId,
            final Long popupsId,
            final PopupsUpdateRequest request
    ) {
        Popups popups = findPopups(popupsId);
        Popups updatedPopups = request.toDomain(memberId);
        popups.update(updatedPopups);
        Events.raise(new PopupsTagsUpdatedEvents(popups.getId(), request.tags(), CustomTagType.POPUPS));
    }

    private Popups findPopups(final Long popupsId) {
        return popupsRepository.findById(popupsId)
                .orElseThrow(() -> new PopupsException(POPUPS_NOT_FOUND_EXCEPTION));
    }
}
