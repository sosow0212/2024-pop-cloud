package show.popups.infrastructure;

import com.domain.show.popups.cache.PopupsCacheRepository;
import com.domain.show.popups.domain.response.PopupsSpecificResponse;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

public class FakePopupsCacheRepository implements PopupsCacheRepository {

    private static final String IP_PREFIX = ":ip";
    private static final String CACHE_PREFIX = "popups:";
    private static final String EVICT_TIME_PREFIX = "popup:evictTime:";

    private final Map<String, Object> popupsCache = new HashMap<>();
    private final Map<String, Object> ttlCache = new HashMap<>();

    @Override
    public boolean isPopupsIdAlreadyCachedWithIp(final Long popupsId, final String ip) {
        return popupsCache.containsKey(CACHE_PREFIX + popupsId + IP_PREFIX);
    }

    @Override
    public void cachePopupsIdWithIp(final Long popupsId, final String ip) {
        popupsCache.put(CACHE_PREFIX + popupsId + IP_PREFIX, ip);
    }

    @Override
    public boolean isPopupCached(final Long popupsId) {
        return popupsCache.containsKey(CACHE_PREFIX + popupsId);
    }

    @Override
    public PopupsSpecificResponse findCacheById(final Long popupsId) {
        return (PopupsSpecificResponse) popupsCache.get(CACHE_PREFIX + popupsId);
    }

    @Override
    public LocalDateTime findCacheEvictedTimeById(final Long popupsId) {
        return (LocalDateTime) ttlCache.get(EVICT_TIME_PREFIX + popupsId);
    }

    @Override
    public void cachePopups(final Long popupsId, final PopupsSpecificResponse popupsSpecificResponse) {
        popupsCache.put(CACHE_PREFIX + popupsId, popupsSpecificResponse);
    }

    @Override
    public void evictCache(final Long popupsId) {
        popupsCache.remove(CACHE_PREFIX + popupsId);
        ttlCache.put(EVICT_TIME_PREFIX + popupsId, LocalDateTime.now());
    }
}
