package com.xiaoqi.vo;

import java.math.BigDecimal;
import java.util.List;

public class SummaryReportVO{

    private String from;
    private String to;
    private BigDecimal fxRate;

    private List<SummaryReportOrderVO> orders;

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public BigDecimal getFxRate() {
        return fxRate;
    }

    public void setFxRate(BigDecimal fxRate) {
        this.fxRate = fxRate;
    }

    public List<SummaryReportOrderVO> getOrders() {
        return orders;
    }

    public void setOrders(List<SummaryReportOrderVO> orders) {
        this.orders = orders;
    }
}