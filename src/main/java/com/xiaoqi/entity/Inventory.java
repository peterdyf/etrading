package com.xiaoqi.entity;

import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Entity
public class Inventory extends BaseEntity {

    private String name;

    private BigDecimal price;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    @JoinColumn(name = "inventoryId")
    private List<Purchase> purchases;

    @Formula("(select sum(o.volume) from order_item o where o.inventory_id = id)")
    private Integer consumed;

    @Formula("(select sum(p.quantity) from purchase p where p.inventory_id = id)")
    private Integer quantity;

    public int getStock() {
        return consumed == null ? quantity : quantity - consumed;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Purchase> getPurchases() {
        return purchases;
    }

    public void setPurchases(List<Purchase> purchases) {
        purchases.forEach(purchase -> purchase.setInventoryId(this.getId()));
        this.purchases = purchases;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
