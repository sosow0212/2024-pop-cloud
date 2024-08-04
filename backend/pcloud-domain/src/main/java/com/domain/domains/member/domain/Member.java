package com.domain.domains.member.domain;

import com.domain.domains.base.BaseEntity;
import com.domain.domains.member.domain.vo.OauthId;
import com.domain.domains.member.exception.MemberException;
import com.domain.domains.member.exception.MemberExceptionType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
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

    @Column(nullable = true)
    private String password;

    public static Member createWithOAuth(
            final String oauthId,
            final String oauthPlatform,
            final String email
    ) {
        return Member.builder()
                .oauthId(new OauthId(oauthId, oauthPlatform))
                .email(email)
                .build();
    }

    public void validatePassword(final String password) {
        if (!this.password.equals(password)) {
            throw new MemberException(MemberExceptionType.PASSWORD_INVALID_EXCEPTION);
        }
    }
}
