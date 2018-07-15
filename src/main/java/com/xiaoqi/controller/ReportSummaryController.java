package com.xiaoqi.controller;

import com.xiaoqi.entity.Order;
import com.xiaoqi.repository.OrderRepository;
import com.xiaoqi.service.Excel;
import com.xiaoqi.vo.SummaryReportOrderItemVO;
import com.xiaoqi.vo.SummaryReportOrderVO;
import com.xiaoqi.vo.SummaryReportVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@RestController
public class ReportSummaryController {

    @Autowired
    private OrderRepository repository;


    @RequestMapping("/report/summary")
    public List<Order> search(
            @RequestParam(name = "from") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam(name = "to") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to

    ) {
        return repository.findByPaymentDate(from, to);
    }

    @RequestMapping(value = "/report/exportSummary", method = RequestMethod.POST)
    public ResponseEntity<Resource> export(@RequestBody SummaryReportVO vo) {
        Excel excel = new Excel();
        createOrderDetails(vo, excel);
        createItemsDetails(vo, excel);

        return excel.download();
    }

    private void createOrderDetails(SummaryReportVO vo, Excel excel) {
        Excel.Sheet sheet = excel.createSheet("Orders");

        sheet.writeHeader(Arrays.asList("Range:", vo.getFrom(), vo.getTo()));
        sheet.writeHeader(Arrays.asList("FxRate:", vo.getFxRate()));
        sheet.writeHeader(Arrays.asList());

        List<String> headers = Arrays.asList(
                "Seq",
                "Date",
                "Platform",
                "Customer",
                "Phone",
                "Address",
                "Payment Method",
                "Waybill No",
                "Shipping By",
                "Shipping Fee in Billing ($)",
                "Inventory Total Cost (¥)",
                "Inventory Total Cost ($)",
                "Total Income ($)",
                "Shipping Fee Actually ($)",
                "P/L ($)"
        );
        sheet.writeHeader(headers);

        BigDecimal shippingFeeInBill = BigDecimal.valueOf(0);
        BigDecimal cost = BigDecimal.valueOf(0);
        BigDecimal costUsd = BigDecimal.valueOf(0);
        BigDecimal billing = BigDecimal.valueOf(0);
        BigDecimal shippingFeeActual = BigDecimal.valueOf(0);
        BigDecimal pl = BigDecimal.valueOf(0);

        for (SummaryReportOrderVO order : vo.getOrders()) {

            shippingFeeInBill = add(shippingFeeInBill, order.getShippingFeeInBill());
            cost = add(cost, order.getTotalCost());
            costUsd = add(costUsd, order.getTotalCostUsd());
            billing = add(billing, order.getTotalBilling());
            shippingFeeActual = add(shippingFeeActual, order.getShippingFeeActual());
            pl = add(pl, order.getPl());

            sheet.write(Arrays.asList(
                    order.getSeq(),
                    order.getPaymentDate(),
                    order.getSource(),
                    order.getCustomer(),
                    order.getTel(),
                    order.getAddress(),
                    order.getPaymentMethod(),
                    order.getWaybillNumber(),
                    order.getDeliveryDrawee(),
                    order.getShippingFeeInBill(),
                    order.getTotalCost(),
                    order.getTotalCostUsd(),
                    order.getTotalBilling(),
                    order.getShippingFeeActual(),
                    order.getPl()
            ));
        }
        sheet.writeHeader(Arrays.asList("Total:", "", "", "", "", "", "", "", "", shippingFeeInBill, cost, costUsd, billing, shippingFeeActual, pl));

    }

    private BigDecimal add(BigDecimal sum, BigDecimal other) {
        if (other == null) return sum;
        return sum.add(other);
    }

    private void createItemsDetails(SummaryReportVO vo, Excel excel) {
        Excel.Sheet sheet = excel.createSheet("Details");
        sheet.writeHeader(Arrays.asList("Range:", vo.getFrom(), vo.getTo()));
        sheet.writeHeader(Arrays.asList("FxRate:", vo.getFxRate()));
        sheet.writeHeader(Arrays.asList());

        List<String> headers = Arrays.asList(
                "Seq",
                "Date",
                "Platform",
                "Customer",
                "Phone",
                "Address",
                "Payment Method",
                "Waybill No",
                "Shipping By",
                "Shipping Fee in Billing ($)",
                "Inventory",
                "Quantity",
                "Price ($)",
                "Total Income ($)",
                "Cost (¥)",
                "Total Cost (¥)",
                "Total Cost ($)"
        );
        sheet.writeHeader(headers);

        Integer quantity = 0;
        BigDecimal totalIncome = BigDecimal.valueOf(0);
        BigDecimal cost = BigDecimal.valueOf(0);
        BigDecimal costUsd = BigDecimal.valueOf(0);

        for (SummaryReportOrderVO order : vo.getOrders()) {
            excel.changeBackgroundColor();
            for (SummaryReportOrderItemVO item : order.getItems()) {
                quantity = quantity + item.getQuantity();
                totalIncome = add(totalIncome, item.getTotalIncome());
                cost = add(cost, item.getTotalCost());
                costUsd = add(costUsd, item.getTotalCostUsd());
                sheet.write(Arrays.asList(
                        order.getSeq(),
                        order.getPaymentDate(),
                        order.getSource(),
                        order.getCustomer(),
                        order.getTel(),
                        order.getAddress(),
                        order.getPaymentMethod(),
                        order.getWaybillNumber(),
                        order.getDeliveryDrawee(),
                        order.getShippingFeeInBill(),
                        item.getInventoryName(),
                        item.getQuantity(),
                        item.getPrice(),
                        item.getTotalIncome(),
                        item.getCost(),
                        item.getTotalCost(),
                        item.getTotalCostUsd()
                ));
            }
        }
        sheet.writeHeader(Arrays.asList("Total:", "", "", "", "", "", "", "", "", "", "", quantity, "", totalIncome, "", cost, costUsd));
    }
}