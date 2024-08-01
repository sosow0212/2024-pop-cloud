package com.api.member.application;

import com.api.member.application.request.LoginRequest;
import com.api.member.application.request.SignupRequest;
import com.common.auth.TokenProvider;
import com.domain.domains.member.domain.Member;
import com.domain.domains.member.domain.MemberRepository;
import com.domain.domains.member.exception.MemberAlreadyExistedException;
import com.domain.domains.member.exception.MemberNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final TokenProvider tokenProvider;
    private final MemberRepository memberRepository;

    @Transactional
    public String signup(final SignupRequest signupRequest) {
        validateAlreadyExistedMember(signupRequest);

        Member member = Member.builder()
                .email(signupRequest.email())
                .password(signupRequest.password())
                .build();

        memberRepository.save(member);
        return tokenProvider.create(member.getId());
    }

    private void validateAlreadyExistedMember(final SignupRequest signupRequest) {
        if (memberRepository.existsByEmail(signupRequest.email())) {
            throw new MemberAlreadyExistedException();
        }
    }

    @Transactional(readOnly = true)
    public String login(final LoginRequest loginRequest) {
        Member member = findMemberByEmail(loginRequest);
        member.validatePassword(loginRequest.password());
        return tokenProvider.create(member.getId());
    }

    private Member findMemberByEmail(final LoginRequest loginRequest) {
        return memberRepository.findByEmail(loginRequest.email())
                .orElseThrow(MemberNotFoundException::new);
    }
}
