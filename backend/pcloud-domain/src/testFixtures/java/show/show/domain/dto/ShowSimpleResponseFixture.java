package show.show.domain.dto;

import com.domain.show.common.PublicTag;
import com.domain.show.common.ShowType;
import com.domain.show.show.domain.dto.ShowSimpleResponse;

import java.time.LocalDateTime;

public class ShowSimpleResponseFixture {

    public static ShowSimpleResponse 쇼_페이징_요소_반환() {
        return new ShowSimpleResponse(
                1L,
                ShowType.EXHIBITION,
                PublicTag.ARTIST,
                "빵빵이와 놀아요",
                "서울 동작구",
                LocalDateTime.of(2024, 01, 01, 9, 00),
                LocalDateTime.of(2024, 03, 01, 6, 00),
                0,
                0
        );
    }
}
