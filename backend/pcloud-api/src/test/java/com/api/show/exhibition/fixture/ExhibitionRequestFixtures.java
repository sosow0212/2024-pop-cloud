package com.api.show.exhibition.fixture;

import com.api.show.exhibition.application.dto.ExhibitionCreateRequest;
import com.api.show.exhibition.application.dto.ExhibitionUpdateRequest;
import com.domain.show.common.PublicTag;
import java.time.LocalDateTime;
import java.util.List;

@SuppressWarnings("NonAsciiCharacters")
public class ExhibitionRequestFixtures {

    public static ExhibitionCreateRequest 개인전시회_생성_요청_생성() {
        return new ExhibitionCreateRequest(
                "빵빵이 개인전시회",
                "빵빵이와 함께하는 개인전시회입니다.",
                LocalDateTime.now().minusDays(10),
                LocalDateTime.now(),
                """
                        평일 09:00 ~ 18:00,
                        주말 12:00 ~ 21:00 
                         """,
                "서울 마포구 동교동 155-55",
                "37.556725",
                "126.9234952",
                true,
                true,
                true,
                true,
                true,
                10000,
                PublicTag.EXHIBITION.getName(),
                List.of("빵빵이", "만원", "가족", "데이트")
        );
    }

    public static ExhibitionUpdateRequest 개인전시회_업데이트_요청_생성() {
        return new ExhibitionUpdateRequest(
                "빵빵이 개인전시회",
                "빵빵이와 함께하는 개인전시회입니다.",
                LocalDateTime.now().minusDays(10),
                LocalDateTime.now(),
                """
                        평일 09:00 ~ 18:00,
                        주말 12:00 ~ 21:00 
                         """,
                "서울 마포구 동교동 155-55",
                "37.556725",
                "126.9234952",
                true,
                true,
                true,
                true,
                true,
                10000,
                PublicTag.EXHIBITION.getName(),
                List.of("빵빵이", "만원", "가족", "데이트")
        );
    }
}
