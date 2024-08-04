package com.api.auth.infrastructure;

import com.api.auth.application.JsonMapper;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class JackonJsonMapper implements JsonMapper {

    private static final String DELIMITER = "\\.";

    @Override
    public String getValueByKey(final String json, final String key) {
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            JsonNode jsonNode = objectMapper.readTree(json)
                    .get(key);
            return Optional.ofNullable(jsonNode.asText())
                    .orElseThrow(() -> new IllegalArgumentException("JSON 키 값이 유효하지 않습니다."));

        } catch (JsonProcessingException exception) {
            throw new IllegalArgumentException("유효하지 않은 JSON 데이터입니다.");
        }
    }
}
