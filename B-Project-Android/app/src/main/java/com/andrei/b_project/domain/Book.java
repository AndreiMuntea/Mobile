package com.andrei.b_project.domain;

import java.util.Date;

/**
 * Created by munte on 12/28/2017.
 */

public class Book {
    private String id;

    private String description;

    private String author;

    private Date date;

    private String title;

    public Book(String id, String description, String author, Date date, String title) {
        this.id = id;
        this.description = description;
        this.author = author;
        this.date = date;
        this.title = title;
    }

    public Book() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Override
    public String toString() {
        return author + " - " + title;
    }
}
