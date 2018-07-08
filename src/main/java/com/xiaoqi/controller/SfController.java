package com.xiaoqi.controller;

import com.xiaoqi.entity.SfAddress;
import com.xiaoqi.service.SfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.stream.Stream;

@RestController
public class SfController {

    @Autowired
    SfService sfService;

    @RequestMapping("/sfAddresses/fromSF")
    public Stream<SfAddress> fromSF() {
        return SfService.read().map(SfAddress::new);
    }


    @RequestMapping(path = "/sfAddresses/update", method = RequestMethod.PUT)
    public ResponseEntity update() {
        sfService.update();
        return new ResponseEntity(HttpStatus.OK);
    }
}