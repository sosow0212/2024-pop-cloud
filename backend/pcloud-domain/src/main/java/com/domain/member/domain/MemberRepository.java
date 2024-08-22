package com.domain.member.domain;

import com.domain.member.domain.vo.OauthId;

import java.util.Optional;

public interface MemberRepository {

    Member save(Member member);

    Optional<Member> findById(Long id);

    Optional<Member> findByEmail(String email);

    boolean existsByEmail(String email);

    Optional<Member> findByOauthId(OauthId oAuthId);
}
