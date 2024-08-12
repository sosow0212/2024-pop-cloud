package com.api.popups.application;

import com.domain.domains.popups.domain.PopupsRepository;
import com.domain.domains.popups.domain.response.PopupsSimpleResponse;
import com.domain.domains.popups.domain.response.PopupsSpecificResponse;
import com.domain.domains.popups.exception.PopupsException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.domain.domains.popups.exception.PopupsExceptionType.POPUPS_NOT_FOUND_EXCEPTION;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class PopupsQueryService {

    private final PopupsRepository popupsRepository;

    public PopupsSpecificResponse findById(final Long popupsId) {
        return popupsRepository.findSpecificById(popupsId)
                .orElseThrow(() -> new PopupsException(POPUPS_NOT_FOUND_EXCEPTION));
    }

    public List<PopupsSimpleResponse> findAll(final Long popupsId, final Integer pageSize) {
        return popupsRepository.findAllWithPaging(popupsId, pageSize);
    }
}
