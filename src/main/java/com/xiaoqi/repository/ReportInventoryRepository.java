package com.xiaoqi.repository;

import com.xiaoqi.entity.Inventory;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;

public interface ReportInventoryRepository extends CrudRepository<Inventory, String> {

    @Query(value = "select i.name AS name, \n" +
            "sum(t.quantity) AS sellQty,\n" +
            "sum(p.cost) AS totalPurchaseCost,\n" +
            "sum(p.quantity) AS totalPurchaseQuantity,\n" +
            "sum(t.price) AS totalIncome\n" +
            "from inventory i \n" +
            "join purchase p on i.id = p.inventory_id \n" +
            "join order_item t on t.inventory_id = i.id\n" +
            "join orders o on o.id = t.order_id where o.payment_date >= :from and o.payment_date < :to \n" +
            "group by i.id", nativeQuery = true)
    List<InventoryReportVO> report(@Param("from") LocalDate from, @Param("to") LocalDate to);

    interface InventoryReportVO {

        String getName();

        Integer getSellQty();

        Integer getTotalPurchaseQuantity();

        BigDecimal getTotalPurchaseCost();

        default BigDecimal getTotalCost() {
            BigDecimal unitCost = getUnitCost();
            if (unitCost != null) {
                return unitCost.multiply(BigDecimal.valueOf(getSellQty()));
            }
            return null;
        }

        default BigDecimal getUnitCost() {
            Integer qty = getTotalPurchaseQuantity();
            if (qty != null && qty > 0) {
                return getTotalPurchaseCost().divide(BigDecimal.valueOf(qty), 2, RoundingMode.HALF_UP);
            }
            return null;
        }

        BigDecimal getTotalIncome();

        default BigDecimal getUnitIncome() {
            return getTotalIncome().divide(BigDecimal.valueOf(getSellQty()), 2, RoundingMode.HALF_UP);
        }

    }
}