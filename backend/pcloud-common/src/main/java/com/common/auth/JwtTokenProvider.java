package com.common.auth;

import com.common.exception.AuthException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

import static com.common.exception.AuthExceptionType.EXPIRED_TOKEN_EXCEPTION;
import static com.common.exception.AuthExceptionType.SIGNATURE_INVALID_EXCEPTION;
import static com.common.exception.AuthExceptionType.TOKEN_FORM_INVALID_EXCEPTION;
import static com.common.exception.AuthExceptionType.TOKEN_INVALID_EXCEPTION;
import static com.common.exception.AuthExceptionType.UNSUPPORTED_TOKEN_EXCEPTION;

@Getter
@NoArgsConstructor
@Component
public class JwtTokenProvider implements TokenProvider {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration-period}")
    private int expirationPeriod;

    private Key key;

    @PostConstruct
    private void init() {
        key = Keys.hmacShaKeyFor(secret.getBytes());
    }

    @Override
    public String create(final Long id) {
        Claims claims = Jwts.claims();
        claims.put("id", id);
        return createToken(claims);
    }

    private String createToken(final Claims claims) {
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(issuedAt())
                .setExpiration(expiredAt())
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    private Date issuedAt() {
        LocalDateTime now = LocalDateTime.now();

        return Date.from(now.atZone(ZoneId.systemDefault())
                .toInstant());
    }

    private Date expiredAt() {
        LocalDateTime now = LocalDateTime.now();

        return Date.from(now.plusHours(expirationPeriod)
                .atZone(ZoneId.systemDefault())
                .toInstant());
    }

    @Override
    public Long extract(final String token) {
        try {
            Long id = Jwts.parser()
                    .setSigningKey(secret.getBytes())
                    .parseClaimsJws(token)
                    .getBody()
                    .get("id", Long.class);
            return id;
        } catch (final SecurityException e) {
            throw new AuthException(SIGNATURE_INVALID_EXCEPTION);
        } catch (final MalformedJwtException e) {
            throw new AuthException(TOKEN_FORM_INVALID_EXCEPTION);
        } catch (final ExpiredJwtException e) {
            throw new AuthException(EXPIRED_TOKEN_EXCEPTION);
        } catch (final UnsupportedJwtException e) {
            throw new AuthException(UNSUPPORTED_TOKEN_EXCEPTION);
        } catch (final IllegalArgumentException e) {
            throw new AuthException(TOKEN_INVALID_EXCEPTION);
        }
    }
}
