package member.fixture;

import com.domain.domains.member.domain.Member;
import com.domain.domains.member.domain.vo.MemberRole;
import com.domain.domains.member.domain.vo.OauthId;

public class MemberFixture {

    public static Member 일반_멤버_생성_id_없음() {
        return Member.builder()
                .email("email@email.com")
                .memberRole(MemberRole.NORMAL)
                .build();
    }

    public static Member 일반_멤버_생성_id_없음_kakao_oauth_가입() {
        return Member.builder()
                .email("email@email.com")
                .memberRole(MemberRole.NORMAL)
                .oauthId(new OauthId("1", "KAKAO"))
                .build();
    }
}
