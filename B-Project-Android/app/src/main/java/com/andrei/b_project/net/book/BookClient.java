package com.andrei.b_project.net.book;

import android.content.Context;

import com.andrei.b_project.R;
import com.andrei.b_project.net.book.Responses.BookDTO;
import com.andrei.b_project.net.book.Responses.BookDetails;
import com.andrei.b_project.net.book.Responses.BooksList;
import com.andrei.b_project.net.book.Responses.EmptyResponse;
import com.andrei.b_project.net.book.Responses.Rating;

import java.util.List;

import io.reactivex.Observable;
import retrofit2.Retrofit;
import retrofit2.adapter.rxjava2.RxJava2CallAdapterFactory;
import retrofit2.converter.gson.GsonConverterFactory;
import retrofit2.http.Body;
import retrofit2.http.PUT;
import retrofit2.http.Path;

/**
 * Created by munte on 12/28/2017.
 */

public class BookClient {
    private BookResource bookResource;
    private Context context;

    public BookClient(Context context) {
        this.context = context;

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(context.getString(R.string.server_url))
                .addCallAdapterFactory(RxJava2CallAdapterFactory.create())
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        this.bookResource = retrofit.create(BookResource.class);
    }

    public Observable<List<BookDetails>> getAllBooks(){
        return bookResource.getAllBooks();
    }

    public Observable<BookDetails> getBook(String bookId){
        return bookResource.getBook(bookId);
    }

    public Observable<Rating> rateBook(String username, String bookId, Rating rating){
        return bookResource.rateBook(username, bookId, rating);
    }

    public Observable<List<BookDetails>> getAllBooksForUser(String username){
        return bookResource.getAllBooksForUser(username);
    }

    public Observable<BooksList> getAllBooksByAuthor(String authorName){
        return bookResource.getAllBooksByAuthor(authorName);
    }

    public Observable<BookDTO> addBook(BookDTO book){
        return bookResource.addBook(book);
    }


    public Observable<EmptyResponse> tagBook(String bookId, String tag){
        return bookResource.tagBook(bookId, tag);
    }
}
