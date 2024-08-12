package com.api.popups.fixture.request;

import com.api.popups.application.request.PopupsCreateRequest;
import com.api.popups.application.request.PopupsUpdateRequest;
import com.domain.domains.common.PublicTag;

import java.time.LocalDateTime;
import java.util.List;

public class PopupsRequestFixtures {

    public static PopupsCreateRequest 팝업스토어_생성_요청() {
        return new PopupsCreateRequest(
                "빵빵이 팝업스토어",
                "빵빵이와 함께하는 체험형 팝업스토어입니다.",
                "서울 마포구 동교동 155-55",
                true,
                10000,
                LocalDateTime.now().minusDays(10),
                LocalDateTime.now(),
                """
                        평일 09:00 ~ 18:00,
                        주말 12:00 ~ 21:00 
                         """,
                "37.556725",
                "126.9234952",
                PublicTag.CHARACTER.getName(),
                List.of("빵빵이", "만원", "가족", "데이트")
        );
    }

    public static PopupsUpdateRequest 팝업스토어_업데이트_요청() {
        return new PopupsUpdateRequest(
                "빵빵이 팝업스토어",
                "빵빵이와 함께하는 체험형 팝업스토어입니다.",
                "서울 마포구 동교동 155-55",
                true,
                10000,
                LocalDateTime.now().minusDays(10),
                LocalDateTime.now(),
                """
                        평일 09:00 ~ 18:00,
                        주말 12:00 ~ 21:00 
                         """,
                "37.556725",
                "126.9234952",
                PublicTag.CHARACTER.getName(),
                List.of("빵빵이", "만원", "가족", "데이트")
        );
    }
}
