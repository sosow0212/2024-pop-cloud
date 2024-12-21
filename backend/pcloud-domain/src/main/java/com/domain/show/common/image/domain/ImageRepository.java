package com.domain.show.common.image.domain;

import com.domain.common.ShowType;
import java.util.List;

public interface ImageRepository {

    List<Image> saveAll(List<Image> images);
    
    List<String> findImageNamesByTargetIdAndShowType(Long targetId, ShowType showType);

    void deleteAllByTargetIdAndShowType(Long targetId, ShowType showType);
}
