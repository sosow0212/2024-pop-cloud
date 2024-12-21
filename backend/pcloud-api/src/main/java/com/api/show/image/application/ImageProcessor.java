package com.api.show.image.application;

import java.util.List;

public interface ImageProcessor {

    void deleteImagesByUniqueNames(List<String> uniqueImageNames);
}
