package member.fixture;

import com.domain.member.domain.Member;
import com.domain.member.domain.vo.MemberRole;
import com.domain.member.domain.vo.OauthId;

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

    public static Member 어드민_멤버_생성_id_없음_kakao_oauth_가입() {
        return Member.builder()
                .email("email@email.com")
                .memberRole(MemberRole.ADMIN)
                .oauthId(new OauthId("1", "KAKAO"))
                .build();
    }
}
