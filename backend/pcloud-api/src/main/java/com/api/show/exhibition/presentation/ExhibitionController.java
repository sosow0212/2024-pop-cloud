package com.api.show.exhibition.presentation;

import com.api.show.common.annotation.ClientIpFinder;
import com.api.show.exhibition.application.ExhibitionQueryService;
import com.api.show.exhibition.application.ExhibitionService;
import com.api.show.exhibition.application.dto.ExhibitionCreateRequest;
import com.api.show.exhibition.application.dto.ExhibitionUpdateRequest;
import com.api.show.exhibition.presentation.dto.ExhibitionLikedStatusResponse;
import com.domain.annotation.AuthMember;
import com.domain.annotation.AuthMembers;
import com.domain.show.exhibition.domain.dto.ExhibitionSimpleResponse;
import com.domain.show.exhibition.domain.dto.ExhibitionSpecificResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.List;

import static com.domain.member.domain.vo.MemberRole.ADMIN;
import static com.domain.member.domain.vo.MemberRole.MANAGER;

@RequiredArgsConstructor
@RequestMapping("/exhibitions")
@RestController
public class ExhibitionController {

    private static final String URI_PREFIX = "/exhibitions/";

    private final ExhibitionService exhibitionService;
    private final ExhibitionQueryService exhibitionQueryService;

    /**
     * TODO: 이미지 처리
     */
    @PostMapping
    public ResponseEntity<Void> create(
            @AuthMembers(permit = {MANAGER, ADMIN}) final Long memberId,
            @RequestBody final ExhibitionCreateRequest request
    ) {
        Long createdExhibitionId = exhibitionService.create(memberId, request);
        return ResponseEntity.created(URI.create(URI_PREFIX + createdExhibitionId))
                .build();
    }

    @GetMapping("/{exhibitionId}")
    public ResponseEntity<ExhibitionSpecificResponse> findById(
            @PathVariable final Long exhibitionId,
            @ClientIpFinder final String clientIp) {
        return ResponseEntity.ok(exhibitionQueryService.findById(exhibitionId, clientIp));
    }

    @GetMapping
    public ResponseEntity<List<ExhibitionSimpleResponse>> findAll(
            @RequestParam(name = "exhibitionId", required = false) final Long exhibitionId,
            @RequestParam(name = "pageSize") final Integer pageSize
    ) {
        return ResponseEntity.ok(exhibitionQueryService.findAll(exhibitionId, pageSize));
    }

    @PatchMapping("/{exhibitionId}")
    public ResponseEntity<Void> patchById(
            @AuthMembers(permit = {ADMIN, MANAGER}) final Long memberId,
            @PathVariable final Long exhibitionId,
            @RequestBody final ExhibitionUpdateRequest request
    ) {
        exhibitionService.patchById(
                memberId,
                exhibitionId,
                request
        );

        return ResponseEntity.noContent()
                .build();
    }

    @DeleteMapping("/{exhibitionId}")
    public ResponseEntity<Void> deleteById(
            @AuthMembers(permit = {ADMIN, MANAGER}) final Long memberId,
            @PathVariable final Long exhibitionId
    ) {
        exhibitionService.deleteById(memberId, exhibitionId);
        return ResponseEntity.noContent()
                .build();
    }

    @PostMapping("/{exhibitionId}/likes")
    public ResponseEntity<ExhibitionLikedStatusResponse> toggleLike(
            @AuthMember final Long memberId,
            @PathVariable final Long exhibitionId
    ) {
        boolean likedStatusAfterActing = exhibitionService.toggleLike(memberId, exhibitionId);
        return ResponseEntity.ok(new ExhibitionLikedStatusResponse(exhibitionId, likedStatusAfterActing));
    }
}
