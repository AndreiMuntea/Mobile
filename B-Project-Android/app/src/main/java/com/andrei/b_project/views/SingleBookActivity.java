package com.andrei.b_project.views;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import com.andrei.b_project.R;
import com.andrei.b_project.net.book.BookClient;
import com.andrei.b_project.net.book.BookDTO;
import com.andrei.b_project.net.book.BookDetails;

import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.disposables.CompositeDisposable;
import io.reactivex.schedulers.Schedulers;

public class SingleBookActivity extends AppCompatActivity {
    private static final String TAG = SingleBookActivity.class.getSimpleName();

    private CompositeDisposable disposables = new CompositeDisposable();
    private BookClient bookClient;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_single_book);

        Bundle bundle = getIntent().getExtras();
        String bookId = bundle.getString("bookId");

        this.bookClient = new BookClient(this);
        getBook(bookId);

        Log.d(TAG, "The OnCreate() event");
    }

    /**
     * Called when the activity is about to become visible.
     */
    @Override
    protected void onStart() {
        super.onStart();

        Log.d(TAG, "The onStart() event");
    }

    /**
     * Called when the activity has become visible.
     */
    @Override
    protected void onResume() {
        super.onResume();

        Log.d(TAG, "The onResume() event");
    }

    /**
     * Called when another activity is taking focus.
     */
    @Override
    protected void onPause() {
        super.onPause();

        Log.d(TAG, "The onPause() event");
    }

    /**
     * Called when the activity is no longer visible.
     */
    @Override
    protected void onStop() {
        super.onStop();

        Log.d(TAG, "The onStop() event");
    }

    /**
     * Called just before the activity is destroyed.
     */
    @Override
    public void onDestroy() {
        disposables.dispose();

        super.onDestroy();

        Log.d(TAG, "The onDestroy() event");
    }

    public void getBook(String bookId){

        disposables.add(bookClient.getBook(bookId)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(
                        this::handleGetBook,
                        this::handleError
                )
        );
    }

    public void handleGetBook(BookDetails book){
        Log.d(TAG, book.getBook().toString());
    }


    private void handleError(Throwable error) {
        Log.d(TAG, error.getMessage());

        Toast toast = Toast.makeText(this, "Bad request!", Toast.LENGTH_SHORT);
        toast.show();

        startActivity(new Intent(this, BooksActivity.class));
    }
}
