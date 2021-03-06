package com.xiaoqi.entity;

import com.xiaoqi.entity.type.OrderStatus;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "ORDERS")
public class Order extends BaseEntity {

    private String customer;

    private String address;

    private String tel;

    private String source;

    private String paymentMethod;

    private LocalDate paymentDate;

    private BigDecimal totalBilling;

    private BigDecimal discount;

    private BigDecimal shippingFeeInBill;

    private String calculator;

    private BigDecimal shippingFeeActual;

    private LocalDate deliveryDate;

    private String deliveryDrawee;

    private String waybillNumber;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    @JoinColumn(name = "orderId")
    private List<OrderItem> items;

    @Size(max = 65536)
    private String content;

    public String getCustomer() {
        return customer;
    }

    public void setCustomer(String customer) {
        this.customer = customer;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public LocalDate getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(LocalDate paymentDate) {
        this.paymentDate = paymentDate;
    }

    public BigDecimal getShippingFeeInBill() {
        return shippingFeeInBill;
    }

    public void setShippingFeeInBill(BigDecimal shippingFeeInBill) {
        this.shippingFeeInBill = shippingFeeInBill;
    }

    public BigDecimal getShippingFeeActual() {
        return shippingFeeActual;
    }

    public void setShippingFeeActual(BigDecimal shippingFeeActual) {
        this.shippingFeeActual = shippingFeeActual;
    }

    public BigDecimal getTotalBilling() {
        return totalBilling;
    }

    public void setTotalBilling(BigDecimal totalBilling) {
        this.totalBilling = totalBilling;
    }

    public String getCalculator() {
        return calculator;
    }

    public void setCalculator(String calculator) {
        this.calculator = calculator;
    }

    public BigDecimal getDiscount() {
        return discount;
    }

    public void setDiscount(BigDecimal discount) {
        this.discount = discount;
    }

    public List<OrderItem> getItems() {
        return items;
    }

    public void setItems(List<OrderItem> items) {
        items.forEach(item -> item.setOrderId(this.getId()));
        this.items = items;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }


    public LocalDate getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(LocalDate deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public String getDeliveryDrawee() {
        return deliveryDrawee;
    }

    public void setDeliveryDrawee(String deliveryDrawee) {
        this.deliveryDrawee = deliveryDrawee;
    }

    public String getWaybillNumber() {
        return waybillNumber;
    }

    public void setWaybillNumber(String waybillNumber) {
        this.waybillNumber = waybillNumber;
    }
}
