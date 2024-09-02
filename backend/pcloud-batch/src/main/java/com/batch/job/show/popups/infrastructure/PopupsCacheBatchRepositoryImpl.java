package com.batch.job.show.popups.infrastructure;

import com.batch.job.show.popups.domain.PopupsCacheBatchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.Cursor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.stereotype.Repository;

import java.nio.charset.StandardCharsets;

@RequiredArgsConstructor
@Repository
public class PopupsCacheBatchRepositoryImpl implements PopupsCacheBatchRepository {

    private static final String CACHE_PREFIX_PATTERN = "popups:*:ip";
    private static final int SCAN_COUNT = 1000;

    private final RedisTemplate<String, String> redisTemplate;

    @Override
    public void clearIpCache() {
        ScanOptions scanOption = ScanOptions.scanOptions()
                .count(SCAN_COUNT)
                .match(CACHE_PREFIX_PATTERN)
                .build();

        Cursor<byte[]> cursor = redisTemplate.getConnectionFactory()
                .getConnection()
                .scan(scanOption);

        while (cursor.hasNext()) {
            byte[] next = cursor.next();
            String key = new String(next, StandardCharsets.UTF_8);
            redisTemplate.delete(key);
        }
    }
}
