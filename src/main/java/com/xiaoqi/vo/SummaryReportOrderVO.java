package com.xiaoqi.vo;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public class SummaryReportOrderVO {

    private String seq;

    private String customer;

    private String address;

    private String tel;

    private String source;

    private String paymentMethod;

    private LocalDate paymentDate;

    private BigDecimal totalBilling;

    private BigDecimal discount;

    private BigDecimal shippingFeeInBill;

    private BigDecimal shippingFeeActual;

    private LocalDate deliveryDate;

    private String deliveryDrawee;

    private String waybillNumber;

    private BigDecimal totalCost;

    private BigDecimal totalCostUsd;

    private BigDecimal pl;

    private List<SummaryReportOrderItemVO> items;

    public String getSeq() {
        return seq;
    }

    public void setSeq(String seq) {
        this.seq = seq;
    }

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

    public BigDecimal getTotalBilling() {
        return totalBilling;
    }

    public void setTotalBilling(BigDecimal totalBilling) {
        this.totalBilling = totalBilling;
    }

    public BigDecimal getDiscount() {
        return discount;
    }

    public void setDiscount(BigDecimal discount) {
        this.discount = discount;
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

    public BigDecimal getPl() {
        return pl;
    }

    public void setPl(BigDecimal pl) {
        this.pl = pl;
    }

    public List<SummaryReportOrderItemVO> getItems() {
        return items;
    }

    public void setItems(List<SummaryReportOrderItemVO> items) {
        this.items = items;
    }
}