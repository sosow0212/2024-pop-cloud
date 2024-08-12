package com.api.popups.application;

import com.api.popups.application.request.PopupsCreateRequest;
import com.api.popups.application.request.PopupsUpdateRequest;
import com.domain.domains.popups.domain.Popups;
import com.domain.domains.popups.domain.PopupsRepository;
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
        Popups popups = request.toDomain(memberId);
        return popupsRepository.save(popups)
                .getId();
    }

    public void patchById(final Long memberId, final Long popupsId, final PopupsUpdateRequest request) {
        Popups popups = findPopups(popupsId);
        Popups updatedPopups = request.toDomain(memberId);
        popups.update(updatedPopups);
    }

    private Popups findPopups(final Long popupsId) {
        return popupsRepository.findById(popupsId)
                .orElseThrow(() -> new PopupsException(POPUPS_NOT_FOUND_EXCEPTION));
    }
}
