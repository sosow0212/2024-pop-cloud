package com.domain.map.domain;

import com.domain.map.domain.vo.ShowIdentifier;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class ShowIdentifiers {

    private final List<ShowIdentifier> showIdentifiers;

    public static ShowIdentifiers from(final List<ShowIdentifier> showIdentifiers) {
        return new ShowIdentifiers(new ArrayList<>(showIdentifiers));
    }
}
