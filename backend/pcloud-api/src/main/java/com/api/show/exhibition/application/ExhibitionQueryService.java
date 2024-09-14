package com.api.show.exhibition.application;

import com.common.config.event.Events;
import com.domain.show.exhibition.domain.ExhibitionRepository;
import com.domain.show.exhibition.domain.dto.ExhibitionSimpleResponse;
import com.domain.show.exhibition.domain.dto.ExhibitionSpecificResponse;
import com.domain.show.exhibition.event.ExhibitionFoundEvent;
import com.domain.show.exhibition.exception.ExhibitionException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.domain.show.exhibition.exception.ExhibitionExceptionType.EXHIBITION_NOT_FOUND_EXCEPTION;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class ExhibitionQueryService {

    private final ExhibitionRepository exhibitionRepository;

    public ExhibitionSpecificResponse findById(final Long exhibitionId, final String clientIp) {
        Events.raise(new ExhibitionFoundEvent(exhibitionId, clientIp));
        return exhibitionRepository.findSpecificById(exhibitionId)
                .orElseThrow(() -> new ExhibitionException(EXHIBITION_NOT_FOUND_EXCEPTION));
    }

    public List<ExhibitionSimpleResponse> findAll(final Long exhibitionId, final Integer pageSize) {
        return exhibitionRepository.findAllWithPaging(exhibitionId, pageSize);
    }
}
