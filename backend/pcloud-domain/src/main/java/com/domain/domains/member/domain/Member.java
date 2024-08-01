package com.domain.domains.member.domain;

import com.domain.domains.base.BaseEntity;
import com.domain.domains.member.exception.MemberException;
import com.domain.domains.member.exception.MemberExceptionType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Builder
@EqualsAndHashCode(of = "id", callSuper = false)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@ToString
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String email;

    @Column
    private String password;

    public void validatePassword(final String password) {
        if (!this.password.equals(password)) {
            throw new MemberException(MemberExceptionType.PASSWORD_INVALID_EXCEPTION);
        }
    }
}
