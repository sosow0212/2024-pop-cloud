package customtag.fixture;

import com.domain.domains.common.CustomTagType;
import com.domain.domains.customtag.domain.CustomTag;

public class CustomTagFixture {

    public static CustomTag 팝업_태그_생성_타겟_아이디_1L() {
        return CustomTag.of("빵빵이", CustomTagType.POPUPS, 1L);
    }

    public static CustomTag 팝업_태그_생성_타겟_아이디_수동(final Long targetId) {
        return CustomTag.of("빵빵이", CustomTagType.POPUPS, targetId);
    }
}
