package com.domain.show.popups.cache;

import com.domain.show.popups.domain.response.PopupsSpecificResponse;

import java.time.LocalDateTime;

public interface PopupsCacheRepository {

    boolean isPopupsIdAlreadyCachedWithIp(Long popupsId, String ip);

    void cachePopupsIdWithIp(Long popupsId, String ip);

    boolean isPopupCached(Long popupsId);

    PopupsSpecificResponse findCacheById(Long popupsId);

    LocalDateTime findCacheEvictedTimeById(Long popupsId);

    void cachePopups(Long popupsId, PopupsSpecificResponse popupsSpecificResponse);

    void evictCache(Long popupsId);
}
