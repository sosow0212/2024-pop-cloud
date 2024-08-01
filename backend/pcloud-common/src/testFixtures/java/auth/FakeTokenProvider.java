package auth;

import com.common.auth.TokenProvider;

public class FakeTokenProvider implements TokenProvider {

    @Override
    public String create(final Long id) {
        return "token";
    }

    @Override
    public Long extract(final String token) {
        return 1L;
    }
}
