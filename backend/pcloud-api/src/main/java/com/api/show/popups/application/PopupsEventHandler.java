package com.api.show.popups.application;

import com.domain.show.popups.domain.Popups;
import com.domain.show.popups.domain.PopupsRepository;
import com.domain.show.popups.event.PopupsFoundEvent;
import com.domain.show.popups.exception.PopupsException;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import static com.domain.show.popups.exception.PopupsExceptionType.POPUPS_NOT_FOUND_EXCEPTION;
import static org.springframework.transaction.annotation.Propagation.REQUIRES_NEW;

@RequiredArgsConstructor
@Service
public class PopupsEventHandler {

    private final PopupsRepository popupsRepository;

    @Async
    @Transactional(propagation = REQUIRES_NEW)
    @TransactionalEventListener(value = PopupsFoundEvent.class, phase = TransactionPhase.AFTER_COMMIT)
    public void addViewCount(final PopupsFoundEvent event) {
        Popups popups = findPopups(event.popupsId());
        popups.addViewCount();
    }

    private Popups findPopups(final Long popupsId) {
        return popupsRepository.findById(popupsId)
                .orElseThrow(() -> new PopupsException(POPUPS_NOT_FOUND_EXCEPTION));
    }
}
