package com.xiaoqi.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
public class Purchase extends BaseEntity {

    private LocalDate purchaseDate;

    @Column(updatable = false)
    private String inventoryId;

    private BigDecimal cost;

    private int quantity;

    private String drawee;

    public LocalDate getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(LocalDate purchaseDate) {
        this.purchaseDate = purchaseDate;
    }

    public String getInventoryId() {
        return inventoryId;
    }

    public void setInventoryId(String inventoryId) {
        this.inventoryId = inventoryId;
    }

    public BigDecimal getCost() {
        return cost;
    }

    public void setCost(BigDecimal cost) {
        this.cost = cost;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getDrawee() {
        return drawee;
    }

    public void setDrawee(String drawee) {
        this.drawee = drawee;
    }
}
