package com.andrei.b_project.domain;

import io.realm.RealmList;
import io.realm.RealmObject;
import io.realm.annotations.PrimaryKey;
import io.realm.annotations.Required;

/**
 * Created by munte on 12/28/2017.
 */

public class User extends RealmObject {
    @PrimaryKey
    private String username;

    @Required
    private String password;

    private String token;

    private RealmList<Book> books;

    public User(String username, String password) {
        this.username = username;
        this.password = password;
        this.books = new RealmList<>();
        this.token = "";
    }

    public User() {
        this.books = new RealmList<>();
        this.token = "";
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public RealmList<Book> getBooks() {
        return books;
    }

    public void setBooks(RealmList<Book> books) {
        this.books = books;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
