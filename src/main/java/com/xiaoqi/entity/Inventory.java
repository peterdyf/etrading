package com.xiaoqi.entity;

import org.hibernate.annotations.Formula;

import javax.persistence.Entity;
import java.math.BigDecimal;

@Entity
public class Inventory extends BaseEntity {

    private String name;

    private BigDecimal price;

    private BigDecimal cost;

    private int initQuantity;

    @Formula("(select sum(o.volume) from order_item o where o.inventory_id = id)")
    private Integer consumed;

    public int getInitQuantity() {
        return initQuantity;
    }

    public void setInitQuantity(int initQuantity) {
        this.initQuantity = initQuantity;
    }

    public Integer getConsumed() {
        return consumed;
    }

    public void setConsumed(Integer consumed) {
        this.consumed = consumed;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public BigDecimal getCost() {
        return cost;
    }

    public void setCost(BigDecimal cost) {
        this.cost = cost;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
