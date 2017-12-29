package com.andrei.b_project.views;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import com.andrei.b_project.R;
import com.andrei.b_project.net.book.BookClient;
import com.andrei.b_project.net.book.BookDTO;
import com.andrei.b_project.net.book.BooksList;

import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.disposables.CompositeDisposable;
import io.reactivex.schedulers.Schedulers;

public class BooksActivity extends AppCompatActivity {

    private static final String TAG = LoginActivity.class.getSimpleName();

    private BookClient bookClient;

    private CompositeDisposable disposables = new CompositeDisposable();

    private ListView listView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_books);

        this.listView = findViewById(R.id.booksListView);
        this.bookClient = new BookClient(this);
        getAll();

        Log.d(TAG, "The onCreate() event");
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

    private void getAll(){
        disposables.add(bookClient.getAllBooks()
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(
                        this::handleGetAll
                )
        );
    }

    private void handleGetAll(BooksList books){
        Log.d(TAG, "GetAll books");

        ArrayAdapter<BookDTO> adapter = new ArrayAdapter<BookDTO>(this, R.layout.activity_books_list_view, books.getBooks());
        this.listView.setAdapter(adapter);
    }
}
