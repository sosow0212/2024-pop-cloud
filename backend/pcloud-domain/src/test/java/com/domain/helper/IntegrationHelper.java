package com.domain.helper;

import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.support.AbstractTestExecutionListener;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@SpringBootTest
public class IntegrationHelper extends AbstractTestExecutionListener {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @BeforeEach
    void init() {
        validateH2Database();
        List<String> truncateAllTablesQuery = jdbcTemplate.queryForList("SELECT CONCAT('TRUNCATE TABLE ', TABLE_NAME, ';') AS q FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'PUBLIC'", String.class);
        truncateAllTables(truncateAllTablesQuery);
    }

    private void validateH2Database() {
        jdbcTemplate.queryForObject("SELECT H2VERSION() FROM DUAL", String.class);
    }

    private void truncateAllTables(List<String> truncateAllTablesQuery) {
        jdbcTemplate.execute("SET FOREIGN_KEY_CHECKS = 0");

        for (String truncateQuery : truncateAllTablesQuery) {
            jdbcTemplate.execute(truncateQuery);
        }

        jdbcTemplate.execute("SET FOREIGN_KEY_CHECKS = 1");
    }
}
