package com.xiaoqi.entity;

import javax.persistence.Entity;

@Entity
public class SfAddress extends BaseEntity {

    private String value;

    public SfAddress() {
    }

    public SfAddress(String value) {

        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
