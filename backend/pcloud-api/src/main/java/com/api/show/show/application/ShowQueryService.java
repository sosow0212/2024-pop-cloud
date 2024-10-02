package com.api.show.show.application;

import com.api.show.show.application.dto.ShowPagingFilterRequest;
import com.domain.show.show.domain.ShowRepository;
import com.domain.show.show.domain.dto.ShowSimpleResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class ShowQueryService {

    private final ShowRepository showRepository;

    public List<ShowSimpleResponse> findAll(final ShowPagingFilterRequest request) {
        return showRepository.findAll(
                request.showId(),
                request.pageSize(),
                request.showType(),
                request.publicTags(),
                request.cities(),
                request.startDate(),
                request.endDate()
        );
    }
}
