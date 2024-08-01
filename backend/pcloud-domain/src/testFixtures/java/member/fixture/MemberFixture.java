package member.fixture;

import com.domain.domains.member.domain.Member;

public class MemberFixture {

    public static Member 일반_멤버_생성_id_없음() {
        return Member.builder()
                .email("email@email.com")
                .password("1234")
                .build();
    }
}
