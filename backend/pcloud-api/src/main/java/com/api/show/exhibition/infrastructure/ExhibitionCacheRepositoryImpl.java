package com.api.show.exhibition.infrastructure;

import com.domain.show.exhibition.cache.ExhibitionCacheRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class ExhibitionCacheRepositoryImpl implements ExhibitionCacheRepository {

    private static final String CACHE_PREFIX = "exhibition:";
    private static final String CACHE_SUFFIX = ":ip";

    private final RedisTemplate<String, String> redisTemplate;


    @Override
    public void cacheExhibitionIdWithIp(final Long exhibitionId, final String ip) {
        String key = makeExhibitionIdWithIpKeyName(exhibitionId);
        redisTemplate.opsForSet().add(key, ip);
    }

    private String makeExhibitionIdWithIpKeyName(final Long exhibitionId) {
        return CACHE_PREFIX + exhibitionId + CACHE_SUFFIX;
    }

    @Override
    public boolean isExhibitionIdWithIpNotCached(final Long exhibitionId, final String ip) {
        String key = makeExhibitionIdWithIpKeyName(exhibitionId);
        return Boolean.FALSE.equals(redisTemplate.opsForSet().isMember(key, ip));
    }
}
