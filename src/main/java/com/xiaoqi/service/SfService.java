package com.xiaoqi.service;

import com.xiaoqi.entity.SfAddress;
import com.xiaoqi.repository.SfAddressRepository;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.nodes.TextNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class SfService {

    @Autowired
    private SfAddressRepository repository;

    public static Stream<String> read(){
        List<String> urls = Arrays.asList(
                "http://www.sf-express.com/hk/tc/dynamic_function/S.F.Network/SF_service_center_address/",
                "http://www.sf-express.com/hk/tc/dynamic_function/S.F.Network/SF_store_address/",
                "http://www.sf-express.com/hk/tc/dynamic_function/S.F.Network/EF-Locker/"

        );

        return urls.stream().flatMap(url -> {
            try {
                Document doc = Jsoup.connect(url).timeout(5000).get();
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
        });
    }

    private static String getString(Element valueEle) {
        return valueEle.childNodes().stream().map(node -> {
            if (node instanceof TextNode) {
                return ((TextNode) node).getWholeText();
            }
            return getString((Element) node);
        }).collect(Collectors.joining());
    }

    public void update() {
        repository.deleteAll();
        List<SfAddress> newSf = SfService.read().map(SfAddress::new).collect(Collectors.toList());
        repository.saveAll(newSf);
    }
}
