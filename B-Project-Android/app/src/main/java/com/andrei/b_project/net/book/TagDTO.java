package com.andrei.b_project.net.book;

import com.google.gson.annotations.SerializedName;

/**
 * Created by munte on 12/30/2017.
 */

public class TagDTO {
    @SerializedName("tag")
    private String tag;

    public TagDTO(String tag) {
        this.tag = tag;
    }

    public TagDTO() {
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    @Override
    public String toString() {
        return tag;
    }
}
