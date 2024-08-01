package com.common.auth;

public interface TokenProvider {

    String create(Long id);

    Long extract(String token);
}
