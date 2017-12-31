package com.andrei.b_project.views;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.Toast;

import com.andrei.b_project.R;
import com.andrei.b_project.net.book.BookClient;
import com.andrei.b_project.net.book.Responses.BookDTO;
import com.andrei.b_project.net.book.Responses.EmptyResponse;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Locale;

import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.disposables.CompositeDisposable;
import io.reactivex.schedulers.Schedulers;
import retrofit2.HttpException;

public class AddBookActivity extends AppCompatActivity {
    private static final String TAG = LoginActivity.class.getSimpleName();
    private static final SimpleDateFormat FORMAT = new SimpleDateFormat("yyyy-MM-dd", Locale.US);

    private CompositeDisposable disposables = new CompositeDisposable();

    private ArrayAdapter<String> tagsAdapter;
    private ListView tagsListView;
    private EditText addTagTextField;

    private BookClient bookClient;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_book);

        this.bookClient = new BookClient(this);
        this.tagsAdapter = new ArrayAdapter<>(this, R.layout.list_view, new ArrayList<>());
        this.tagsListView = findViewById(R.id.tagsListView);
        this.tagsListView.setAdapter(tagsAdapter);
        this.addTagTextField = findViewById(R.id.addTagTextField);

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

    public void addNewTagToListView(View view) {
        String text = addTagTextField.getText().toString();
        addTagTextField.setText("");
        tagsAdapter.add(text);
    }

    public void createBook(View view) {
        try {
            String title = ((EditText) findViewById(R.id.titleTextField)).getText().toString();
            String author = ((EditText) findViewById(R.id.authorTextField)).getText().toString();
            String date = ((EditText) findViewById(R.id.publicationDateTextField)).getText().toString();
            String description = ((EditText) findViewById(R.id.descriptionTextField)).getText().toString();

            BookDTO bookDTO = new BookDTO();
            bookDTO.setAuthor(author);
            bookDTO.setTitle(title);
            bookDTO.setDescription(description);
            bookDTO.setDate(FORMAT.parse(date));

            disposables.add(bookClient.addBook(bookDTO)
                    .subscribeOn(Schedulers.io())
                    .observeOn(AndroidSchedulers.mainThread())
                    .subscribe(
                            this::handleAddBook,
                            this::handleError
                    )
            );

        } catch (Exception ex){
            Toast toast = Toast.makeText(this, ex.getMessage(), Toast.LENGTH_SHORT);
            toast.show();
        }

    }

    public void tagBook(View view) {
        String id = ((EditText) findViewById(R.id.bookIdTextField)).getText().toString();

        for(int i = 0; i < tagsAdapter.getCount(); ++i){
            Log.d(TAG, tagsAdapter.getItem(i));
            disposables.add(bookClient.tagBook(id, tagsAdapter.getItem(i))
                    .subscribeOn(Schedulers.io())
                    .observeOn(AndroidSchedulers.mainThread())
                    .subscribe(
                            this::handleAddTag,
                            this::handleError
                    )
            );

        }
    }

    private void handleAddTag(EmptyResponse response){
        Toast toast = Toast.makeText(this, "Book was tagged ", Toast.LENGTH_SHORT);
        toast.show();
    }

    private void handleAddBook(BookDTO book){
        Toast toast = Toast.makeText(this, "A new book has been added " + book.getId(), Toast.LENGTH_SHORT);
        toast.show();

        ((EditText) findViewById(R.id.bookIdTextField)).setText(book.getId());
    }

    private void handleError(Throwable error) {
        String errorMessage = "Failed at authentication";

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
    }
}
