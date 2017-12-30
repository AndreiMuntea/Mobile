package com.andrei.b_project.net.book;

import android.content.Context;

import com.andrei.b_project.R;

import java.util.List;

import io.reactivex.Observable;
import retrofit2.Retrofit;
import retrofit2.adapter.rxjava2.RxJava2CallAdapterFactory;
import retrofit2.converter.gson.GsonConverterFactory;

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

    public Observable<BooksList> getAllBooks(){
        return bookResource.getAllBooks();
    }

    public Observable<BookDetails> getBook(String bookId){
        return bookResource.getBook(bookId);
    }
}
