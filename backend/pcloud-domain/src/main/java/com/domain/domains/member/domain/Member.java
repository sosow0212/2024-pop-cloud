package com.domain.domains.member.domain;

import com.domain.domains.base.BaseEntity;
import com.domain.domains.member.domain.vo.MemberRole;
import com.domain.domains.member.domain.vo.OauthId;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@EqualsAndHashCode(of = "id", callSuper = false)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(uniqueConstraints = {@UniqueConstraint(name = "UK_member_oauth_id", columnNames = {"oauth_id", "oauth_platform"})})
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Embedded
    private OauthId oauthId;

    @Column
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "member_role")
    private MemberRole memberRole;

    public static Member createWithNormalRole(
            final String oauthId,
            final String oauthPlatform,
            final String email
    ) {
        return Member.builder()
                .oauthId(new OauthId(oauthId, oauthPlatform))
                .email(email)
                .memberRole(MemberRole.NORMAL)
                .build();
    }
}
