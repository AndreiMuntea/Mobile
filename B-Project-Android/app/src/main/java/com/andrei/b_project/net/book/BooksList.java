package com.andrei.b_project.net.book;

import com.google.gson.annotations.SerializedName;

import java.util.List;

/**
 * Created by munte on 12/28/2017.
 */

public class BooksList {
    @SerializedName("books")
    private List<BookDTO> books;

    public BooksList(List<BookDTO> books) {
        this.books = books;
    }

    public BooksList() {
    }

    public List<BookDTO> getBooks() {
        return books;
    }

    public void setBooks(List<BookDTO> books) {
        this.books = books;
    }
}
