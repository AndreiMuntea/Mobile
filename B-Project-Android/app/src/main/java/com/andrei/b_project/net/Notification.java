package com.andrei.b_project.net;

import com.andrei.b_project.net.book.Responses.BookDTO;
import com.andrei.b_project.net.book.Responses.Rating;
import com.andrei.b_project.net.book.Responses.TagDTO;

/**
 * Created by munte on 1/17/2018.
 */

public class Notification {
    public enum Type {ADD_BOOK, DELETE_BOOK, RATE_BOOK, TAG_BOOK};

    public Type type;
    public TagDTO tag;
    public Rating rating;
    public String bookId;
    public BookDTO book;

    public Notification(Type type, TagDTO tag, Rating rating, String bookId, BookDTO book) {
        this.type = type;
        this.tag = tag;
        this.rating = rating;
        this.bookId = bookId;
        this.book = book;
    }
}