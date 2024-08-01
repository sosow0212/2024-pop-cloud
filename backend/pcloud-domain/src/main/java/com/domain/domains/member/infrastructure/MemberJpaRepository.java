package com.domain.domains.member.infrastructure;

import com.domain.domains.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberJpaRepository extends JpaRepository<Member, Long> {

    Member save(Member member);

    Optional<Member> findById(Long id);

    Optional<Member> findByEmail(String email);

    boolean existsByEmail(String email);
}
