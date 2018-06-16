package com.xiaoqi.repository;

import com.xiaoqi.entity.Order;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "entities", path = "orders")
public interface OrderRepository extends PagingAndSortingRepository<Order, String> {

    List<Order> findByContentIgnoreCaseContaining(@Param("content") String content);
}