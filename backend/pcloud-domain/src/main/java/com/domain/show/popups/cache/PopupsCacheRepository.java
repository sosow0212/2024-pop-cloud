package com.domain.show.popups.cache;

public interface PopupsCacheRepository {

    boolean isPopupsIdAlreadyCachedWithIp(Long popupsId, String ip);

    void cachePopupsIdWithIp(Long popupsId, String ip);
}
