package com.domain.member.infrastructure;

import com.domain.member.domain.Member;
import com.domain.member.domain.vo.OauthId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberJpaRepository extends JpaRepository<Member, Long> {

    Member save(Member member);

    Optional<Member> findById(Long id);

    Optional<Member> findByEmail(String email);

    boolean existsByEmail(String email);

    Optional<Member> findByOauthId(OauthId oAuthId);
}
