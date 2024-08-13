package popups;

import com.domain.domains.popups.domain.Popups;
import com.domain.domains.popups.domain.PopupsRepository;
import com.domain.domains.popups.domain.response.CustomTagSimpleResponse;
import com.domain.domains.popups.domain.response.PopupsSimpleResponse;
import com.domain.domains.popups.domain.response.PopupsSpecificResponse;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public class FakePopupsRepository implements PopupsRepository {

    private final Map<Long, Popups> map = new HashMap<>();
    private Long id = 0L;

    @Override
    public Optional<Popups> findById(final Long id) {
        return Optional.ofNullable(map.get(id));
    }

    @Override
    public Popups save(final Popups popups) {
        id++;

        Popups savedPopups = Popups.builder()
                .id(id)
                .ownerId(popups.getOwnerId())
                .storeDetails(popups.getStoreDetails())
                .availableTime(popups.getAvailableTime())
                .latitude(popups.getLatitude())
                .longitude(popups.getLongitude())
                .publicTag(popups.getPublicTag())
                .build();

        map.put(id, savedPopups);
        return savedPopups;
    }

    @Override
    public Optional<PopupsSpecificResponse> findSpecificById(final Long id) {
        if (!map.containsKey(id)) {
            return Optional.empty();
        }

        Popups popups = map.get(id);
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
                        LocalDateTime.now()
                )
        );
    }
}
