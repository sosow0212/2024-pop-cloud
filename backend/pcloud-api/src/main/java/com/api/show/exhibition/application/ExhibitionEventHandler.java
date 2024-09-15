package com.api.show.exhibition.application;

import com.domain.annotation.RetryOptimisticLock;
import com.domain.show.exhibition.cache.ExhibitionCacheRepository;
import com.domain.show.exhibition.domain.Exhibition;
import com.domain.show.exhibition.domain.ExhibitionRepository;
import com.domain.show.exhibition.event.ExhibitionFoundEvent;
import com.domain.show.exhibition.exception.ExhibitionException;
import com.domain.show.exhibition.exception.ExhibitionExceptionType;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@RequiredArgsConstructor
@Service
public class ExhibitionEventHandler {

    private final ExhibitionRepository exhibitionRepository;
    private final ExhibitionCacheRepository exhibitionCacheRepository;

    @Async
    @RetryOptimisticLock
    @TransactionalEventListener(value = ExhibitionFoundEvent.class, phase = TransactionPhase.AFTER_COMMIT)
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void addViewCount(final ExhibitionFoundEvent event) {
        String ip = event.clientIp();
        Long exhibitionId = event.exhibitionId();

        if (exhibitionCacheRepository.isExhibitionIdWithIpNotCached(exhibitionId, ip)) {
            Exhibition foundExhibition = findExhibitionWithOptimisticLock(exhibitionId);
            exhibitionCacheRepository.cacheExhibitionIdWithIp(exhibitionId, ip);
            foundExhibition.addViewCount();
        }
    }

    private Exhibition findExhibitionWithOptimisticLock(final Long exhibitionId) {
        return exhibitionRepository.findByIdWithOptimisticLock(exhibitionId)
                .orElseThrow(() -> new ExhibitionException(ExhibitionExceptionType.EXHIBITION_NOT_FOUND_EXCEPTION));
    }
}
