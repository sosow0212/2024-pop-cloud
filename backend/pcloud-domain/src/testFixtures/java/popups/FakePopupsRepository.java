package popups;

import com.domain.popups.domain.LikedPopups;
import com.domain.popups.domain.Popups;
import com.domain.popups.domain.PopupsRepository;
import com.domain.popups.domain.response.CustomTagSimpleResponse;
import com.domain.popups.domain.response.PopupsSimpleResponse;
import com.domain.popups.domain.response.PopupsSpecificResponse;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public class FakePopupsRepository implements PopupsRepository {

    private final Map<Long, LikedPopups> likedPopupsDB = new HashMap<>();
    private final Map<Long, Popups> popupsDB = new HashMap<>();
    private Long popupsId = 0L;
    private Long likedPopupsId = 0L;

    @Override
    public Optional<Popups> findById(final Long id) {
        return Optional.ofNullable(popupsDB.get(id));
    }

    @Override
    public Popups save(final Popups popups) {
        popupsId++;

        Popups savedPopups = Popups.builder()
                .id(popupsId)
                .ownerId(popups.getOwnerId())
                .storeDetails(popups.getStoreDetails())
                .availableTime(popups.getAvailableTime())
                .latitude(popups.getLatitude())
                .longitude(popups.getLongitude())
                .publicTag(popups.getPublicTag())
                .statistic(popups.getStatistic())
                .build();

        popupsDB.put(popupsId, savedPopups);
        return savedPopups;
    }

    @Override
    public Optional<PopupsSpecificResponse> findSpecificById(final Long id) {
        if (!popupsDB.containsKey(id)) {
            return Optional.empty();
        }

        Popups popups = popupsDB.get(id);
        PopupsSpecificResponse response = new PopupsSpecificResponse(
                popups.getId(),
                popups.getOwnerId(),
                popups.getStoreDetails().getTitle(),
                popups.getStoreDetails().getDescription(),
                popups.getStoreDetails().getLocation(),
                popups.getStoreDetails().getIsParkingAvailable(),
                popups.getStoreDetails().getFee().getValue(),
                popups.getAvailableTime().getStartDate(),
                popups.getAvailableTime().getEndDate(),
                popups.getAvailableTime().getOpenTimes(),
                popups.getLatitude().getValue(),
                popups.getLongitude().getValue(),
                popups.getPublicTag(),
                popups.getStatistic().getVisitedCount(),
                popups.getStatistic().getLikedCount(),
                List.of(new CustomTagSimpleResponse("빵빵이"))
        );

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
                .anyMatch(likedPopups -> likedPopups.getPopupsId().equals(popupsId) && likedPopups.getMemberId().equals(memberId));
    }

    @Override
    public void deleteLikedPopupsByPopupsIdAndMemberId(final Long popupsId, final Long memberId) {
        likedPopupsDB.entrySet().stream()
                .filter(entry -> entry.getValue().getPopupsId().equals(popupsId) && entry.getValue().getMemberId().equals(memberId))
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
