package com.xiaoqi.repository;

import com.xiaoqi.entity.Inventory;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;

public interface ReportSummaryRepository extends CrudRepository<Inventory, String> {

    @Query(value = "select \n" +
            "count(distinct o.id) AS orderQuantity,\n" +
            "sum(o.total_billing) AS income,\n" +
            "sum(t.quantity*ic.cost) AS cost\n" +
            " from orders o\n" +
            "join order_item t on o.id = t.order_id\n" +
            "left join (\n" +
            "select i.id, sum(p.cost)/sum(p.quantity) cost from inventory i join\n" +
            "purchase p on i.id = p.inventory_id\n" +
            "group by i.id\n" +
            " ) ic on ic.id= t.inventory_id\n" +
            " where o.payment_date >= :from and o.payment_date < :to\n", nativeQuery = true)
    SummaryVO report(@Param("from") LocalDate from, @Param("to") LocalDate to);

    interface SummaryVO {

        Long getOrderQuantity();

        BigDecimal getIncome();

        BigDecimal getCost();

    }
}