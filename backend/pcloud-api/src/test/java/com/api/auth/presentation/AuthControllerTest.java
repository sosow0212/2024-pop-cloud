package com.api.auth.presentation;

import com.api.helper.MockBeanInjection;
import com.domain.domains.member.domain.vo.OAuthPlatform;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;

import static com.api.helper.RestDocsHelper.customDocument;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@AutoConfigureRestDocs
@WebMvcTest(AuthController.class)
class AuthControllerTest extends MockBeanInjection {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void 회원가입을_진행한다() throws Exception {
        // given
        String oAuthPermittedCode = "permitted_code";
        String platform = "kakao";

        when(authService.loginWithOAuth(OAuthPlatform.findPlatform(platform), oAuthPermittedCode))
                .thenReturn("response_token_info");

        // when & then
        mockMvc.perform(post("/auth/login/oauth/{platform}", platform)
                        .header("OAuthPermittedCode", oAuthPermittedCode)
                ).andExpect(status().isOk())
                .andDo(customDocument("oauth_login",
                        requestHeaders(
                                headerWithName("OAuthPermittedCode").description("카카오에서 발급 받은 인증코드")
                        ),
                        pathParameters(
                                parameterWithName("platform").description("OAuth 인증 플랫픔")
                        ),
                        responseFields(
                                fieldWithPath("accessToken").description("발급되는 토큰")
                        )
                ));
    }
}
