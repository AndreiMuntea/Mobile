package com.andrei.b_project.views;

import android.animation.ObjectAnimator;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.RatingBar;
import android.widget.Toast;

import com.andrei.b_project.R;
import com.andrei.b_project.domain.Book;
import com.andrei.b_project.domain.Tag;
import com.andrei.b_project.domain.User;
import com.andrei.b_project.net.book.BookClient;
import com.andrei.b_project.net.book.Responses.BookDTO;
import com.andrei.b_project.net.book.Responses.BookDetails;
import com.andrei.b_project.net.book.Responses.Rating;
import com.andrei.b_project.net.book.Responses.TagDTO;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Locale;

import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.disposables.CompositeDisposable;
import io.reactivex.schedulers.Schedulers;
import io.realm.Realm;
import retrofit2.HttpException;

public class SingleBookActivity extends AppCompatActivity {
    private static final String TAG = SingleBookActivity.class.getSimpleName();
    private static final SimpleDateFormat FORMAT = new SimpleDateFormat("yyyy-MM-dd", Locale.US);

    private CompositeDisposable disposables = new CompositeDisposable();
    private BookClient bookClient;
    private Realm realm;

    private BookDTO book;
    private ListView tagsView;
    private RatingBar ratingBar;

    private User user;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_single_book);

        Bundle bundle = getIntent().getExtras();
        String bookId = bundle.getString("bookId");
        this.tagsView = findViewById(R.id.tagsView);
        this.bookClient = new BookClient(this);
        this.ratingBar = findViewById(R.id.ratingBar);
        this.realm = Realm.getDefaultInstance();

        realm.executeTransaction(realm -> this.user = realm.where(User.class).findFirst());

        getBook(bookId);

        this.ratingBar.setOnRatingBarChangeListener((ratingBar, v, b) -> {
            if(!b) return;  // not user input

            disposables.add(bookClient.rateBook(this.user.getUsername(), bookId, new Rating(v))
                    .subscribeOn(Schedulers.io())
                    .observeOn(AndroidSchedulers.mainThread())
                    .subscribe(
                            this::handleRatingChange,
                            this::handleError
                    )
            );
        });

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
        this.book = book.getBook();

        ((EditText) findViewById(R.id.titleTextField)).setText(this.book.getTitle());
        ((EditText) findViewById(R.id.authorTextField)).setText(this.book.getAuthor());
        ((EditText) findViewById(R.id.publicationDateTextField)).setText(FORMAT.format(this.book.getDate()));
        ((EditText) findViewById(R.id.descriptionTextField)).setText(this.book.getDescription());
        this.ratingBar.setRating(book.getRating());

        realm.executeTransaction(realm -> {
            Book b = realm.where(Book.class).equalTo("id", this.book.getId()).findFirst();
            for (TagDTO t : book.getTags()){
                b.getTags().add(new Tag(t.getTag()));
            }
        });

        ArrayAdapter<TagDTO> adapter = new ArrayAdapter<>(this, R.layout.list_view, book.getTags());
        this.tagsView.setAdapter(adapter);
    }


    private void handleRatingChange(Rating rating){
        ObjectAnimator anim = ObjectAnimator.ofFloat(ratingBar, "rating", 0, rating.getRating());
        anim.setDuration(1000);
        anim.start();

        this.ratingBar.setRating(rating.getRating());
    }

    private void handleError(Throwable error) {
        String errorMessage = error.getMessage();

        if (error instanceof HttpException) {
            try {
                errorMessage = ((HttpException) error).response().errorBody().string();
            } catch (Exception e) {
                Log.d(TAG, "FATAL EXCEPTION: " + e.getMessage());
            }
        }

        Log.d(TAG, errorMessage);

        Toast toast = Toast.makeText(this, errorMessage, Toast.LENGTH_SHORT);
        toast.show();

        startActivity(new Intent(this, BooksActivity.class));
    }
}
