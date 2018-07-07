package com.xiaoqi.repository;

import com.xiaoqi.entity.Inventory;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "entities", path = "inventories")
public interface InventoryRepository extends CrudRepository<Inventory, String> {

}