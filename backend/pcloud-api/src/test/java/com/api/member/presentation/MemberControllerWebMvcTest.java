package com.api.member.presentation;

import com.api.helper.MockBeanInjection;
import com.api.member.application.request.LoginRequest;
import com.api.member.application.request.SignupRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static com.api.helper.RestDocsHelper.customDocument;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@AutoConfigureRestDocs
@WebMvcTest(MemberController.class)
class MemberControllerWebMvcTest extends MockBeanInjection {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void 회원가입을_진행한다() throws Exception {
        // given
        SignupRequest req = new SignupRequest("email@email.com", "passsword");
        when(memberService.signup(req)).thenReturn("response_token_info");

        // when & then
        mockMvc.perform(post("/members/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req))
                ).andExpect(status().isOk())
                .andDo(customDocument("do_signup",
                        requestFields(
                                fieldWithPath("email").description("이메일"),
                                fieldWithPath("password").description("패스워드")
                        ),
                        responseFields(
                                fieldWithPath("accessToken").description("발급되는 토큰")
                        )
                ));
    }

    @Test
    void 로그인을_진행한다() throws Exception {
        // given
        LoginRequest req = new LoginRequest("email@email.com", "password");
        when(memberService.login(req)).thenReturn("response_token_info");

        // when & then
        mockMvc.perform(post("/members/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req))
                ).andExpect(status().isOk())
                .andDo(customDocument("do_login",
                        requestFields(
                                fieldWithPath("email").description("이메일"),
                                fieldWithPath("password").description("패스워드")
                        ),
                        responseFields(
                                fieldWithPath("accessToken").description("발급되는 토큰")
                        )
                ));
    }
}
