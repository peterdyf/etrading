package com.xiaoqi.service;

import com.xiaoqi.config.CachingConfig;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.nodes.TextNode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SfService {

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @Cacheable(CachingConfig.SF)
    public List<String> read() {

        log.info("Search Address from SF");

        List<String> urls = Arrays.asList(
                "http://www.sf-express.com/hk/tc/dynamic_function/S.F.Network/SF_service_center_address/",
                "http://www.sf-express.com/hk/tc/dynamic_function/S.F.Network/SF_store_address/",
                "http://www.sf-express.com/hk/tc/dynamic_function/S.F.Network/EF-Locker/"

        );

        return urls.stream().flatMap(url -> {
            try {
                Document doc = Jsoup.connect(url).timeout(10000).get();
                return doc.select("tr").stream().map(tr -> tr.select("td")).filter(tds -> Arrays.asList(4, 5).contains(tds.size())).filter(tds -> {
                    String code;
                    if (tds.size() == 4) {
                        code = tds.get(0).html();
                    } else {
                        code = tds.get(1).html();
                    }
                    return code.matches("[A-Z0-9]+");
                }).map(tds -> {

                    String code;
                    Element valueEle;

                    if (tds.size() == 4) {
                        code = tds.get(0).html();
                        valueEle = tds.get(1);
                    } else {
                        code = tds.get(1).html();
                        valueEle = tds.get(2);
                    }
                    String value = getString(valueEle).replaceAll("\n", "").replaceAll("&nbsp;", "").replaceAll("&amp;", "&").replaceAll(String.valueOf((char) 160), "");
                    return code + " " + value;
                });

            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }).collect(Collectors.toList());
    }

    private static String getString(Element valueEle) {
        return valueEle.childNodes().stream().map(node -> {
            if (node instanceof TextNode) {
                return ((TextNode) node).getWholeText();
            }
            return getString((Element) node);
        }).collect(Collectors.joining());
    }
}
