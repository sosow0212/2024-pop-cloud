package com.api.show.popups.application;

import com.common.config.event.Events;
import com.domain.show.popups.domain.PopupsRepository;
import com.domain.show.popups.domain.response.PopupsSimpleResponse;
import com.domain.show.popups.domain.response.PopupsSpecificResponse;
import com.domain.show.popups.event.PopupsFoundEvent;
import com.domain.show.popups.exception.PopupsException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.domain.show.popups.exception.PopupsExceptionType.POPUPS_NOT_FOUND_EXCEPTION;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class PopupsQueryService {

    private final PopupsRepository popupsRepository;

    public PopupsSpecificResponse findById(final Long popupsId, final String clientIp) {
        Events.raise(new PopupsFoundEvent(popupsId, clientIp));
        return popupsRepository.findSpecificById(popupsId)
                .orElseThrow(() -> new PopupsException(POPUPS_NOT_FOUND_EXCEPTION));
    }

    public List<PopupsSimpleResponse> findAll(final Long popupsId, final Integer pageSize) {
        return popupsRepository.findAllWithPaging(popupsId, pageSize);
    }
}
