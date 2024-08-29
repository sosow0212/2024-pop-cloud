package com.domain.show.common;

import com.domain.show.popups.exception.PopupsException;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;

import static com.domain.show.popups.exception.PopupsExceptionType.PUBLIC_TAG_NOT_FOUND_EXCEPTION;

@Getter
@AllArgsConstructor
public enum PublicTag {

    BRAND("브랜드"),
    FASHION("패션"),
    BEAUTY("뷰티"),
    FOOD("음식"),
    HOME("홈"),
    TOY("완구류"),
    LEISURE("레저"),
    BOOK("서적"),
    MUSIC("음악"),
    PET("펫"),
    SPORT("운동"),
    DIGITAL("디지털"),
    ARTIST("예술"),
    CHARACTER("캐릭터"),
    GOODS("굿즈"),
    EXHIBITION("전시"),
    ETC("기타");

    private final String name;

    public static PublicTag from(final String name) {
        return Arrays.stream(values())
                .filter(tag -> tag.name.equals(name))
                .findAny()
                .orElseThrow(() -> new PopupsException(PUBLIC_TAG_NOT_FOUND_EXCEPTION));
    }
}
