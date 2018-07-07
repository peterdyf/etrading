package com.xiaoqi.controller;

import com.xiaoqi.repository.ReportInventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
public class ReportInventoryController {

    @Autowired
    private ReportInventoryRepository repository;


    @RequestMapping("/report/inventories")
    public List<ReportInventoryRepository.InventoryReportVO> search(
            @RequestParam(name = "from") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam(name = "to") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to

    ) {
        return repository.report(from, to);
    }
}