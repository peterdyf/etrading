package com.xiaoqi.controller;

import com.xiaoqi.service.SfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SfController {

    @Autowired
    SfService sfService;

    @RequestMapping("/sfAddresses/fromSF")
    public List<String> fromSF() {
        return sfService.read();
    }
}