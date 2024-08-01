package com.common.auth;

import com.common.exception.ExpiredTokenException;
import com.common.exception.SignatureInvalidException;
import com.common.exception.TokenFormInvalidException;
import com.common.exception.TokenInvalidException;
import com.common.exception.UnsupportedTokenException;
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
            throw new SignatureInvalidException();
        } catch (final MalformedJwtException e) {
            throw new TokenFormInvalidException();
        } catch (final ExpiredJwtException e) {
            throw new ExpiredTokenException();
        } catch (final UnsupportedJwtException e) {
            throw new UnsupportedTokenException();
        } catch (final IllegalArgumentException e) {
            throw new TokenInvalidException();
        }
    }
}
