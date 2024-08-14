package com.api.popups.presentation;

import com.api.popups.application.PopupsQueryService;
import com.api.popups.application.PopupsService;
import com.api.popups.application.request.PopupsCreateRequest;
import com.api.popups.application.request.PopupsUpdateRequest;
import com.domain.annotation.AuthMember;
import com.domain.annotation.AuthMembers;
import com.domain.domains.popups.domain.response.PopupsSimpleResponse;
import com.domain.domains.popups.domain.response.PopupsSpecificResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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

import static com.domain.domains.member.domain.vo.MemberRole.ADMIN;
import static com.domain.domains.member.domain.vo.MemberRole.MANAGER;

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

    @GetMapping
    public ResponseEntity<List<PopupsSimpleResponse>> findAll(
            @RequestParam(name = "popupsId", required = false) final Long popupsId,
            @RequestParam(name = "pageSize") final Integer pageSize
    ) {
        return ResponseEntity.ok(popupsQueryService.findAll(popupsId, pageSize));
    }

    @GetMapping("/{popupsId}")
    public ResponseEntity<PopupsSpecificResponse> findById(@PathVariable final Long popupsId) {
        return ResponseEntity.ok(popupsQueryService.findById(popupsId));
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
}
