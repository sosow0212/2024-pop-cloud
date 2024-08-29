package com.api.exhibition.application;

import com.api.exhibition.application.dto.ExhibitionCreateRequest;
import com.api.exhibition.application.dto.ExhibitionUpdateRequest;
import com.common.config.event.Events;
import com.domain.common.CustomTagType;
import com.domain.show.exhibition.domain.Exhibition;
import com.domain.show.exhibition.domain.ExhibitionRepository;
import com.domain.show.exhibition.domain.LikedExhibition;
import com.domain.show.exhibition.event.ExhibitionTagsCreatedEvents;
import com.domain.show.exhibition.event.ExhibitionTagsUpdatedEvents;
import com.domain.show.exhibition.exception.ExhibitionException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.domain.show.exhibition.exception.ExhibitionExceptionType.EXHIBITION_NOT_FOUND_EXCEPTION;

@RequiredArgsConstructor
@Transactional
@Service
public class ExhibitionService {

    private final ExhibitionRepository exhibitionRepository;

    public Long create(final Long memberId, final ExhibitionCreateRequest request) {
        Exhibition savedExhibition = exhibitionRepository.save(request.toDomain(memberId));
        Events.raise(new ExhibitionTagsCreatedEvents(
                savedExhibition.getId(),
                request.tags(),
                CustomTagType.PERSONAL_EXHIBITION
        ));

        return savedExhibition.getId();
    }

    public void patchById(
            final Long memberId,
            final Long exhibitionId,
            final ExhibitionUpdateRequest request
    ) {
        Exhibition foundExhibition = findExhibition(exhibitionId);
        Exhibition updateExhibition = request.toDomain(memberId);
        foundExhibition.update(updateExhibition);
        Events.raise(new ExhibitionTagsUpdatedEvents(
                foundExhibition.getId(),
                request.tags(),
                CustomTagType.PERSONAL_EXHIBITION)
        );
    }

    private Exhibition findExhibition(final Long exhibitionId) {
        return exhibitionRepository.findById(exhibitionId)
                .orElseThrow(() -> new ExhibitionException(EXHIBITION_NOT_FOUND_EXCEPTION));
    }

    public void deleteById(final Long memberId, final Long exhibitionId) {
        Exhibition foundExhibition = findExhibition(exhibitionId);
        foundExhibition.validateOwnerEquals(memberId);
        exhibitionRepository.deleteById(foundExhibition.getId());
    }

    public boolean toggleLike(final Long memberId, final Long exhibitionId) {
        Exhibition foundExhibition = findExhibition(exhibitionId);
        boolean canAddLikes = toggleExhibitionLike(memberId, exhibitionId);
        foundExhibition.addLikedCount(canAddLikes);

        return canAddLikes;
    }

    private boolean toggleExhibitionLike(final Long memberId, final Long exhibitionId) {
        if (exhibitionRepository.existsByExhibitionIdAndMemberId(memberId, exhibitionId)) {
            exhibitionRepository.deleteLikedExhibitionByExhibitionIdAndMemberId(exhibitionId, memberId);
            return false;
        }

        exhibitionRepository.saveLikedExhibition(LikedExhibition.of(exhibitionId, memberId));
        return true;
    }
}
