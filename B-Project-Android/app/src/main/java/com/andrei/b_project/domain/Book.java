package com.andrei.b_project.domain;

import java.util.Date;

import io.realm.RealmList;
import io.realm.RealmObject;
import io.realm.annotations.PrimaryKey;
import io.realm.annotations.Required;

/**
 * Created by munte on 12/28/2017.
 */

public class Book extends RealmObject{
    @PrimaryKey
    private String id;

    @Required
    private String description;

    @Required
    private String author;

    @Required
    private Date date;

    @Required
    private String title;

    private RealmList<Tag> tags;

    public Book(String id, String description, String author, Date date, String title) {
        this.id = id;
        this.description = description;
        this.author = author;
        this.date = date;
        this.title = title;
        this.tags = new RealmList<>();
    }

    public Book() {
        this.tags = new RealmList<>();
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

    public RealmList<Tag> getTags() {
        return tags;
    }

    public void setTags(RealmList<Tag> tags) {
        this.tags = tags;
    }
}
