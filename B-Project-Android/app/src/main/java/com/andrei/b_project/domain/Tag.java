package com.andrei.b_project.domain;

import io.realm.RealmObject;
import io.realm.annotations.PrimaryKey;

/**
 * Created by munte on 12/30/2017.
 */

public class Tag extends RealmObject{
    @PrimaryKey
    private String tag;

    public Tag(String tag) {
        this.tag = tag;
    }

    public Tag() {
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }
}
