package com.xiaoqi.controller;

import com.xiaoqi.repository.ReportSummaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
public class ReportSummaryController {

    @Autowired
    private ReportSummaryRepository repository;


    @RequestMapping("/report/summary")
    public ReportSummaryRepository.SummaryVO search(
            @RequestParam(name = "from") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam(name = "to") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to

    ) {
        return repository.report(from, to);
    }
}