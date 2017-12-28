package com.andrei.b_project.net.book;

import io.reactivex.Observable;
import retrofit2.http.GET;

/**
 * Created by munte on 12/28/2017.
 */

public interface BookResource {
    @GET("/books/get")
    Observable<BooksList> getAllBooks();
}
