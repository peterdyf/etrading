package com.xiaoqi.vo;

import java.math.BigDecimal;

public class SummaryReportOrderItemVO {

    private String inventoryName;

    private Integer quantity;

    private BigDecimal price;

    private BigDecimal totalIncome;

    private BigDecimal cost;

    private BigDecimal totalCost;

    private BigDecimal totalCostUsd;


    public String getInventoryName() {
        return inventoryName;
    }

    public void setInventoryName(String inventoryName) {
        this.inventoryName = inventoryName;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public BigDecimal getTotalIncome() {
        return totalIncome;
    }

    public void setTotalIncome(BigDecimal totalIncome) {
        this.totalIncome = totalIncome;
    }

    public BigDecimal getCost() {
        return cost;
    }

    public void setCost(BigDecimal cost) {
        this.cost = cost;
    }

    public BigDecimal getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(BigDecimal totalCost) {
        this.totalCost = totalCost;
    }

    public BigDecimal getTotalCostUsd() {
        return totalCostUsd;
    }

    public void setTotalCostUsd(BigDecimal totalCostUsd) {
        this.totalCostUsd = totalCostUsd;
    }
}