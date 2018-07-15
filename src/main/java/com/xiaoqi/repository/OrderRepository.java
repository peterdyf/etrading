package com.xiaoqi.repository;

import com.xiaoqi.entity.Order;
import com.xiaoqi.entity.type.OrderStatus;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.time.LocalDate;
import java.util.List;

@RepositoryRestResource(collectionResourceRel = "entities", path = "orders")
public interface OrderRepository extends CrudRepository<Order, String> {


    @Query(value = "select distinct i from Order i left join fetch i.items where i.status = :status")
    List<Order> findByStatus(@Param("status") OrderStatus status);

    @Query(value = "select distinct i from Order i left join fetch i.items where i.paymentDate >= :from and i.paymentDate <= :to")
    List<Order> findByPaymentDate(@Param("from") LocalDate from, @Param("to") LocalDate to);

}