package com.api.show.popups.application;

import com.domain.annotation.RetryOptimisticLock;
import com.domain.show.popups.domain.Popups;
import com.domain.show.popups.domain.PopupsRepository;
import com.domain.show.popups.event.PopupsFoundEvent;
import com.domain.show.popups.exception.PopupsException;
import com.domain.show.popups.exception.PopupsExceptionType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import static org.springframework.transaction.annotation.Propagation.REQUIRES_NEW;

@Slf4j
@RequiredArgsConstructor
@Service
public class PopupsEventHandler {

    private final PopupsRepository popupsRepository;

    @Async
    @RetryOptimisticLock
    @TransactionalEventListener(value = PopupsFoundEvent.class, phase = TransactionPhase.AFTER_COMMIT)
    @Transactional(propagation = REQUIRES_NEW)
    public void addViewCount(final PopupsFoundEvent event) {
        Popups popups = findPopupsWithOptimisticLock(event);
        popups.addViewCount();
    }

    private Popups findPopupsWithOptimisticLock(final PopupsFoundEvent event) {
        return popupsRepository.findByIdWithOptimisticLock(event.popupsId())
                .orElseThrow(() -> new PopupsException(PopupsExceptionType.POPUPS_NOT_FOUND_EXCEPTION));
    }
}
