package com.api.show.popups.infrastructure;

import com.domain.show.popups.cache.PopupsCacheRepository;
import com.domain.show.popups.domain.response.PopupsSpecificResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.time.Duration;
import java.time.LocalDateTime;

@RequiredArgsConstructor
@Repository
public class PopupsCacheRepositoryImpl implements PopupsCacheRepository {

    private static final String IP_PREFIX = ":ip";
    private static final String CACHE_PREFIX = "popups:";
    private static final String EVICT_TIME_PREFIX = "popup:evictTime:";

    private final RedisTemplate<String, Object> redisTemplate;

    @Override
    public void cachePopupsIdWithIp(final Long popupsId, final String ip) {
        String key = makePopupsIdWithIpKeyName(popupsId);
        redisTemplate.opsForSet().add(key, ip);
    }

    private String makePopupsIdWithIpKeyName(final Long popupsId) {
        return CACHE_PREFIX + popupsId + IP_PREFIX;
    }

    @Override
    public boolean isPopupsIdAlreadyCachedWithIp(final Long popupsId, final String ip) {
        String key = makePopupsIdWithIpKeyName(popupsId);
        return Boolean.TRUE.equals(redisTemplate.opsForSet().isMember(key, ip));
    }

    @Override
    public boolean isPopupCached(final Long popupsId) {
        return Boolean.TRUE.equals(redisTemplate.hasKey(CACHE_PREFIX + popupsId));
    }

    @Override
    public PopupsSpecificResponse findCacheById(final Long popupsId) {
        return (PopupsSpecificResponse) redisTemplate.opsForValue()
                .get(CACHE_PREFIX + popupsId);
    }

    @Override
    public void cachePopups(final Long popupsId, final PopupsSpecificResponse popupsSpecificResponse) {
        redisTemplate.opsForValue()
                .set(CACHE_PREFIX + popupsId, popupsSpecificResponse, Duration.ofHours(1));
    }

    @Override
    public void evictCache(final Long popupsId) {
        redisTemplate.delete(CACHE_PREFIX + popupsId);
        redisTemplate.opsForValue()
                .set(EVICT_TIME_PREFIX + popupsId, LocalDateTime.now());
        redisTemplate.expire(EVICT_TIME_PREFIX + popupsId, Duration.ofSeconds(10));
    }

    @Override
    public LocalDateTime findCacheEvictedTimeById(final Long popupsId) {
        return (LocalDateTime) redisTemplate.opsForValue()
                .get(EVICT_TIME_PREFIX + popupsId);
    }
}
