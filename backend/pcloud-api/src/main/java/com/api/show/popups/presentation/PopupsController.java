package com.api.show.popups.presentation;

import com.api.show.common.annotation.ClientIpFinder;
import com.api.show.popups.application.PopupsQueryService;
import com.api.show.popups.application.PopupsService;
import com.api.show.popups.application.request.PopupsCreateRequest;
import com.api.show.popups.application.request.PopupsUpdateRequest;
import com.api.show.popups.presentation.response.PopupLikedStatusResponse;
import com.domain.annotation.AuthMember;
import com.domain.annotation.AuthMembers;
import com.domain.show.popups.domain.response.PopupsSpecificResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

import static com.domain.member.domain.vo.MemberRole.ADMIN;
import static com.domain.member.domain.vo.MemberRole.MANAGER;

@RequiredArgsConstructor
@RequestMapping("/popups")
@RestController
public class PopupsController {

    private final PopupsService popupsService;
    private final PopupsQueryService popupsQueryService;

    /**
     * TODO : 이미지 처리 방식 회의 필요
     */
    @PostMapping
    public ResponseEntity<Void> create(
            @AuthMembers(permit = {MANAGER, ADMIN}) final Long memberId,
            @RequestBody final PopupsCreateRequest request
    ) {
        Long createdPopupsId = popupsService.create(memberId, request);
        return ResponseEntity.created(URI.create("/popups/" + createdPopupsId))
                .build();
    }

    @GetMapping("/{popupsId}")
    public ResponseEntity<PopupsSpecificResponse> findById(
            @PathVariable final Long popupsId,
            @ClientIpFinder final String clientIp
    ) {
        return ResponseEntity.ok(popupsQueryService.findById(popupsId, clientIp));
    }

    @PatchMapping("/{popupsId}")
    public ResponseEntity<Void> patchById(
            @AuthMember final Long memberId,
            @PathVariable final Long popupsId,
            @RequestBody final PopupsUpdateRequest request
    ) {
        popupsService.patchById(memberId, popupsId, request);
        return ResponseEntity.noContent()
                .build();
    }

    @PostMapping("/{popupsId}/likes")
    public ResponseEntity<PopupLikedStatusResponse> likes(
            @AuthMember final Long memberId,
            @PathVariable final Long popupsId
    ) {
        boolean likedStatusAfterActing = popupsService.likes(memberId, popupsId);
        return ResponseEntity.ok(new PopupLikedStatusResponse(popupsId, likedStatusAfterActing));
    }
}
