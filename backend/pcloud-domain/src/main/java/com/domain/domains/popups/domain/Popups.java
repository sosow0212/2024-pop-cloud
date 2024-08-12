package com.domain.domains.popups.domain;

import com.common.exception.AuthException;
import com.domain.domains.common.BaseEntity;
import com.domain.domains.common.PublicTag;
import com.domain.domains.popups.domain.vo.AvailableTime;
import com.domain.domains.popups.domain.vo.Latitude;
import com.domain.domains.popups.domain.vo.Longitude;
import com.domain.domains.popups.domain.vo.StoreDetails;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

import static com.common.exception.AuthExceptionType.AUTH_NOT_EQUALS_EXCEPTION;

@Getter
@Builder
@EqualsAndHashCode(of = "id", callSuper = false)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Popups extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long ownerId;

    @Embedded
    private StoreDetails storeDetails;

    @Embedded
    private AvailableTime availableTime;

    @Embedded
    private Latitude latitude;

    @Embedded
    private Longitude longitude;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PublicTag publicTag;

    @JoinColumn(name = "tag_id")
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Tag> tags = new ArrayList<>();

    public void update(final Popups updatedPopups) {
        validateOwnerEquals(updatedPopups.getOwnerId());
        this.storeDetails = updatedPopups.storeDetails;
        this.availableTime = updatedPopups.availableTime;
        this.latitude = updatedPopups.latitude;
        this.longitude = updatedPopups.longitude;
        this.publicTag = updatedPopups.publicTag;
        this.tags = updatedPopups.tags;
    }

    private void validateOwnerEquals(final Long ownerId) {
        if (!this.getOwnerId().equals(ownerId)) {
            throw new AuthException(AUTH_NOT_EQUALS_EXCEPTION);
        }
    }
}
