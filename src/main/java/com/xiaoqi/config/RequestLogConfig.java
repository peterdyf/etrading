package com.xiaoqi.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.CommonsRequestLoggingFilter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Arrays;
import java.util.List;

@Configuration
public class RequestLogConfig {
    @Bean
    public CommonsRequestLoggingFilter requestLoggingFilter() {
        CommonsRequestLoggingFilter loggingFilter = new CommonsRequestLoggingFilter(){

            @Override
            protected String createMessage(HttpServletRequest request, String prefix, String suffix) {
                StringBuilder msg = new StringBuilder();
                msg.append(prefix);
                msg.append(request.getMethod());
                msg.append("=").append(request.getRequestURI());
                String payload = request.getQueryString();
                if (payload != null) {
                    msg.append('?').append(payload);
                }

                payload = request.getRemoteAddr();
                if (StringUtils.hasLength(payload)) {
                    msg.append(";").append(payload);
                }

                payload = request.getHeader("User-Agent");
                if (StringUtils.hasLength(payload)) {
                    msg.append(";").append(payload);
                }

                payload = this.getMessagePayload(request);
                if (payload != null) {
                    msg.append(";payload=").append(payload);
                }
                msg.append(suffix);
                return msg.toString();
            }

            @Override
            protected boolean shouldLog(HttpServletRequest request) {
                return !"GET".equals(request.getMethod());
            }

        };
        loggingFilter.setIncludePayload(true);
        loggingFilter.setMaxPayloadLength(65536);
        return loggingFilter;
    }
}
