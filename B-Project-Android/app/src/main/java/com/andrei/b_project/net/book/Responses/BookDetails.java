package com.andrei.b_project.net.book.Responses;

import com.google.gson.annotations.SerializedName;

import java.util.List;

/**
 * Created by munte on 12/30/2017.
 */

public class BookDetails {
    @SerializedName("tags")
    private List<TagDTO> tags;

    @SerializedName("rating")
    private Float rating;

    @SerializedName("book")
    private BookDTO book;

    public BookDetails(List<TagDTO> tags, Float rating, BookDTO book) {
        this.tags = tags;
        this.rating = rating;
        this.book = book;
    }

    public BookDetails() {
    }

    public List<TagDTO> getTags() {
        return tags;
    }

    public void setTags(List<TagDTO> tags) {
        this.tags = tags;
    }

    public Float getRating() {
        return rating;
    }

    public void setRating(Float rating) {
        this.rating = rating;
    }

    public BookDTO getBook() {
        return book;
    }

    public void setBook(BookDTO book) {
        this.book = book;
    }
}
