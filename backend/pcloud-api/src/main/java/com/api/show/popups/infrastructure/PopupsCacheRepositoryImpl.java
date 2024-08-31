package com.api.show.popups.infrastructure;

import com.domain.show.popups.cache.PopupsCacheRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class PopupsCacheRepositoryImpl implements PopupsCacheRepository {

    private static final String CACHE_PREFIX = "popups:";

    private final RedisTemplate<String, String> redisTemplate;

    @Override
    public void cachePopupsIdWithIp(final Long popupsId, final String ip) {
        String key = makePopupsIdWithIpKeyName(popupsId);
        redisTemplate.opsForSet().add(key, ip);
    }

    private String makePopupsIdWithIpKeyName(final Long popupsId) {
        return CACHE_PREFIX + popupsId + ":ip";
    }

    @Override
    public boolean isPopupsIdAlreadyCachedWithIp(final Long popupsId, final String ip) {
        String key = makePopupsIdWithIpKeyName(popupsId);
        return Boolean.TRUE.equals(redisTemplate.opsForSet().isMember(key, ip));
    }
}
