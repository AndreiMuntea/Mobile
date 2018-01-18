package com.andrei.b_project.net.book;

import com.andrei.b_project.net.book.Responses.BookDTO;
import com.andrei.b_project.net.book.Responses.BookDetails;
import com.andrei.b_project.net.book.Responses.BooksList;
import com.andrei.b_project.net.book.Responses.EmptyResponse;
import com.andrei.b_project.net.book.Responses.Rating;

import java.util.List;

import io.reactivex.Observable;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.PUT;
import retrofit2.http.Path;

/**
 * Created by munte on 12/28/2017.
 */

public interface BookResource {
    @GET("/books/get")
    Observable<List<BookDetails>> getAllBooks(@Header("Authorization") String authorization);

    @GET("/books/get/username/{username}")
    Observable<List<BookDetails>> getAllBooksForUser(@Header("Authorization") String authorization, @Path("username")String username);

    @GET("/books/get/{bookId}")
    Observable<BookDetails> getBook(@Header("Authorization") String authorization, @Path("bookId") String bookId);

    @PUT("/books/rate/{username}/{bookId}")
    Observable<Rating> rateBook(@Header("Authorization") String authorization, @Path("username") String username, @Path("bookId") String bookId, @Body Rating rating);

    @GET("/books/get/author/{authorName}")
    Observable<BooksList> getAllBooksByAuthor(@Header("Authorization") String authorization, @Path("authorName")String authorName);

    @PUT("/books/add")
    Observable<BookDTO> addBook(@Header("Authorization") String authorization, @Body BookDTO book);

    @PUT("/books/tagBook/{bookId}/{tag}")
    Observable<EmptyResponse> tagBook(@Header("Authorization") String authorization, @Path("bookId") String bookId, @Path("tag") String tag);
}
