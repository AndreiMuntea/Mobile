package com.andrei.b_project.net.book.Responses;

import com.google.gson.annotations.SerializedName;

/**
 * Created by munte on 12/31/2017.
 */

public class Rating {
    @SerializedName("rating")
    private Float rating;

    public Rating(Float rating) {
        this.rating = rating;
    }

    public Rating() {
    }

    public Float getRating() {
        return rating;
    }

    public void setRating(Float rating) {
        this.rating = rating;
    }
}
