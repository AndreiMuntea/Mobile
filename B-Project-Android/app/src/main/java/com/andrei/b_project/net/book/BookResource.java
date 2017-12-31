package com.andrei.b_project.net.book;

import com.andrei.b_project.net.book.Responses.BookDetails;
import com.andrei.b_project.net.book.Responses.BooksList;
import com.andrei.b_project.net.book.Responses.Rating;

import io.reactivex.Observable;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.PUT;
import retrofit2.http.Path;

/**
 * Created by munte on 12/28/2017.
 */

public interface BookResource {
    @GET("/books/get")
    Observable<BooksList> getAllBooks();

    @GET("/books/get/{bookId}")
    Observable<BookDetails> getBook(@Path("bookId") String bookId);

    @PUT("/books/rate/{username}/{bookId}")
    Observable<Rating> rateBook(@Path("username") String username, @Path("bookId") String bookId, @Body Rating rating);
}
