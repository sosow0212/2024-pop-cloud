package member;

import com.domain.domains.member.domain.Member;
import com.domain.domains.member.domain.MemberRepository;
import com.domain.domains.member.domain.vo.OauthId;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class FakeMemberRepository implements MemberRepository {

    private final Map<Long, Member> map = new HashMap<>();
    private Long id = 0L;

    @Override
    public Member save(final Member member) {
        Member savedMember = Member.builder()
                .id(id)
                .email(member.getEmail())
                .oauthId(member.getOauthId())
                .build();

        map.put(id, savedMember);
        id++;

        return savedMember;
    }

    @Override
    public Optional<Member> findById(final Long id) {
        return Optional.ofNullable(map.get(id));
    }

    @Override
    public Optional<Member> findByEmail(final String email) {
        return map.values().stream()
                .filter(member -> member.getEmail().equals(email))
                .findAny();
    }

    @Override
    public boolean existsByEmail(final String email) {
        return map.values().stream()
                .anyMatch(member -> member.getEmail().equals(email));
    }

    @Override
    public Optional<Member> findByOauthId(final OauthId oAuthId) {
        return map.values().stream()
                .filter(member -> member.getOauthId().getOauthId().equals(oAuthId.getOauthId()))
                .findAny();
    }
}
