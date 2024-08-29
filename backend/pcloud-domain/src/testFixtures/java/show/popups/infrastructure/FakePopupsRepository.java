package show.popups.infrastructure;

import com.domain.show.popups.domain.LikedPopups;
import com.domain.show.popups.domain.Popups;
import com.domain.show.popups.domain.PopupsRepository;
import com.domain.show.popups.domain.response.PopupsSimpleResponse;
import com.domain.show.popups.domain.response.PopupsSpecificResponse;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static show.popups.domain.PopupsSpecificResponseFixture.팝업스토어_상세_조회_응답_생성_팝업스토어;

@SuppressWarnings("NonAsciiCharacters")
public class FakePopupsRepository implements PopupsRepository {

    private final Map<Long, LikedPopups> likedPopupsDB = new HashMap<>();
    private final Map<Long, Popups> popupsDB = new HashMap<>();
    private Long popupsId = 1L;
    private Long likedPopupsId = 1L;

    @Override
    public Optional<Popups> findById(final Long id) {
        return Optional.ofNullable(popupsDB.get(id));
    }

    @Override
    public Popups save(final Popups popups) {
        Popups savedPopups = Popups.builder()
                .id(popupsId)
                .ownerId(popups.getOwnerId())
                .showDetails(popups.getShowDetails())
                .showSchedule(popups.getShowSchedule())
                .position(popups.getPosition())
                .showRules(popups.getShowRules())
                .statistic(popups.getStatistic())
                .publicTag(popups.getPublicTag())
                .build();
        popupsDB.put(popupsId++, savedPopups);

        return savedPopups;
    }

    @Override
    public Optional<PopupsSpecificResponse> findSpecificById(final Long id) {
        if (!popupsDB.containsKey(id)) {
            return Optional.empty();
        }

        Popups popups = popupsDB.get(id);
        PopupsSpecificResponse response = 팝업스토어_상세_조회_응답_생성_팝업스토어(popups);

        return Optional.of(response);
    }

    @Override
    public List<PopupsSimpleResponse> findAllWithPaging(final Long popupsId, final Integer pageSize) {
        return List.of(
                new PopupsSimpleResponse(
                        1L,
                        "빵빵이 전시회",
                        "서울시 마포구",
                        LocalDateTime.now().minusDays(100),
                        LocalDateTime.now(),
                        0,
                        0
                )
        );
    }

    @Override
    public boolean existsByProductIdAndMemberId(final Long popupsId, final Long memberId) {
        return likedPopupsDB.values().stream()
                .anyMatch(likedPopups -> likedPopups.getPopupsId().equals(popupsId) && likedPopups.getMemberId()
                        .equals(memberId));
    }

    @Override
    public void deleteLikedPopupsByPopupsIdAndMemberId(final Long popupsId, final Long memberId) {
        likedPopupsDB.entrySet().stream()
                .filter(entry -> entry.getValue().getPopupsId().equals(popupsId) && entry.getValue().getMemberId()
                        .equals(memberId))
                .findAny()
                .ifPresent(longLikedPopupsEntry -> likedPopupsDB.remove(longLikedPopupsEntry.getKey()));
    }

    @Override
    public LikedPopups saveLikedPopups(final LikedPopups likedPopups) {
        LikedPopups savedPopups = LikedPopups.builder()
                .id(likedPopupsId)
                .popupsId(likedPopups.getPopupsId())
                .memberId(likedPopups.getMemberId())
                .build();

        likedPopupsDB.put(likedPopupsId, savedPopups);
        likedPopupsId++;

        return savedPopups;
    }
}
