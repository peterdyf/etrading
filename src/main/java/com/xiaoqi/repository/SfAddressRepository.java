package com.xiaoqi.repository;

import com.xiaoqi.entity.SfAddress;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "entities", path = "sfAddresses")
public interface SfAddressRepository extends CrudRepository<SfAddress, String> {

}