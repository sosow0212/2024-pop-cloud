package com.domain.show.exhibition.cache;

public interface ExhibitionCacheRepository {

    void cacheExhibitionIdWithIp(Long exhibitionId, String ip);

    boolean isExhibitionIdWithIpNotCached(Long exhibitionId, String ip);
}
