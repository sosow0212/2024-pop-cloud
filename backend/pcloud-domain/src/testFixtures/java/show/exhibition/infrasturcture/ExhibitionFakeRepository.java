package show.exhibition.infrasturcture;

import com.domain.show.exhibition.domain.Exhibition;
import com.domain.show.exhibition.domain.ExhibitionRepository;
import com.domain.show.exhibition.domain.LikedExhibition;
import com.domain.show.exhibition.domain.dto.ExhibitionSpecificResponse;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static show.exhibition.domain.ExhibitionSpecificResponseFixture.개인전시회_상세_조회_응답_생성_개인전시회;

@SuppressWarnings("NonAsciiCharacters")
public class ExhibitionFakeRepository implements ExhibitionRepository {

    private final Map<Long, Exhibition> exhibitionDB = new HashMap<>();
    private final Map<Long, LikedExhibition> likedExhibitionDB = new HashMap<>();
    private Long exhibitionId = 1L;
    private Long likedExhibitionId = 1L;

    @Override
    public Exhibition save(final Exhibition exhibition) {
        Exhibition savedExhibition = Exhibition.builder()
                .id(exhibitionId)
                .ownerId(exhibition.getOwnerId())
                .showDetails(exhibition.getShowDetails())
                .showSchedule(exhibition.getShowSchedule())
                .position(exhibition.getPosition())
                .showRules(exhibition.getShowRules())
                .statistic(exhibition.getStatistic())
                .publicTag(exhibition.getPublicTag())
                .build();
        exhibitionDB.put(exhibitionId++, savedExhibition);

        return savedExhibition;
    }

    @Override
    public LikedExhibition saveLikedExhibition(final LikedExhibition likedExhibition) {
        LikedExhibition savedLikedExhibition = LikedExhibition.builder()
                .id(likedExhibitionId)
                .exhibitionId(likedExhibition.getExhibitionId())
                .memberId(likedExhibition.getMemberId())
                .build();
        likedExhibitionDB.put(likedExhibitionId++, savedLikedExhibition);

        return savedLikedExhibition;
    }

    @Override
    public Optional<Exhibition> findById(final Long exhibitionId) {
        return Optional.ofNullable(exhibitionDB.get(exhibitionId));
    }

    @Override
    public Optional<Exhibition> findByIdWithOptimisticLock(final Long exhibitionId) {
        return Optional.ofNullable(exhibitionDB.get(exhibitionId));
    }

    @Override
    public Optional<ExhibitionSpecificResponse> findSpecificById(final Long exhibitionId) {
        if (!exhibitionDB.containsKey(exhibitionId)) {
            return Optional.empty();
        }
        Exhibition exhibition = exhibitionDB.get(exhibitionId);
        ExhibitionSpecificResponse response = 개인전시회_상세_조회_응답_생성_개인전시회(exhibition);

        return Optional.of(response);
    }

    @Override
    public boolean existsByExhibitionIdAndMemberId(final Long exhibitionId, final Long memberId) {
        return likedExhibitionDB.values().stream()
                .anyMatch(likedExhibition -> likedExhibition.getExhibitionId().equals(exhibitionId)
                        && likedExhibition.getMemberId().equals(memberId));
    }

    @Override
    public void deleteLikedExhibitionByExhibitionIdAndMemberId(final Long exhibitionId, final Long memberId) {
        likedExhibitionDB.entrySet().stream()
                .filter(entry -> entry.getValue().getExhibitionId().equals(exhibitionId)
                        && entry.getValue().getMemberId().equals(memberId))
                .findAny()
                .ifPresent(foundEntry -> likedExhibitionDB.remove(foundEntry.getKey()));
    }

    @Override
    public void deleteById(final Long exhibitionId) {
        exhibitionDB.remove(exhibitionId);
    }
}
