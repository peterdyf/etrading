package com.xiaoqi.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.concurrent.ConcurrentMapCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@Configuration
@EnableCaching
@EnableScheduling
public class CachingConfig {

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    public static final String SF = "SF";

    @Bean
    public CacheManager cacheManager() {
        return new ConcurrentMapCacheManager(SF);
    }

    @CacheEvict(allEntries = true, value = {SF})
    @Scheduled(fixedDelay = 60 * 60 * 1000, initialDelay = 500)
    public void reportCacheEvict() {
        log.info("Flush Cache");
    }
}