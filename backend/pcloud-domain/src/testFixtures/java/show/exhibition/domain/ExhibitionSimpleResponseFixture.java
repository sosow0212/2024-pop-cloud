package show.exhibition.domain;

import com.domain.show.exhibition.domain.Exhibition;
import com.domain.show.exhibition.domain.dto.ExhibitionSimpleResponse;
import java.time.LocalDateTime;

@SuppressWarnings("NonAsciiCharacters")
public class ExhibitionSimpleResponseFixture {

    public static ExhibitionSimpleResponse 개인전시회_간단_조회_응답_생성() {
        return new ExhibitionSimpleResponse(
                1L,
                "빵빵이 전시회",
                "서울 마포구",
                LocalDateTime.now().minusDays(10),
                LocalDateTime.now(),
                0,
                0
        );
    }

    public static ExhibitionSimpleResponse 개인전시회_간단_조회_응답_생성_개인전시회(final Exhibition exhibition) {
        return new ExhibitionSimpleResponse(
                exhibition.getId(),
                exhibition.getShowDetails().getTitle(),
                exhibition.getPosition().getLocation(),
                exhibition.getShowSchedule().getStartDate(),
                exhibition.getShowSchedule().getEndDate(),
                exhibition.getStatistic().getVisitedCount(),
                exhibition.getStatistic().getLikedCount()
        );
    }
}
