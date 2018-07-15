package com.xiaoqi.repository;

import com.xiaoqi.entity.Inventory;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "entities", path = "inventories")
public interface InventoryRepository extends CrudRepository<Inventory, String> {

    @Query(value = "select distinct i from Inventory i left join fetch i.purchases")
    List<Inventory> getAll();

}