package com.andrei.b_project.views;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.ListView;

import com.andrei.b_project.R;
import com.andrei.b_project.domain.Book;
import com.andrei.b_project.domain.Tag;
import com.andrei.b_project.domain.User;
import com.andrei.b_project.net.book.BookClient;
import com.andrei.b_project.net.book.Responses.BookDTO;
import com.andrei.b_project.net.book.Responses.BookDetails;
import com.andrei.b_project.net.book.Responses.BooksList;
import com.andrei.b_project.net.book.Responses.TagDTO;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.disposables.CompositeDisposable;
import io.reactivex.schedulers.Schedulers;
import io.realm.Realm;
import io.realm.RealmList;

public class BooksActivity extends AppCompatActivity {

    private static final String TAG = BooksActivity.class.getSimpleName();
    private BookClient bookClient;

    private CompositeDisposable disposables = new CompositeDisposable();

    private ListView listView;
    private List<Book> displayedBooks;
    private AutoCompleteTextView autoCompleteTextView;

    private Realm realm;

    private User user;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_books);

        this.realm = Realm.getDefaultInstance();
        this.bookClient = new BookClient(this);

        this.listView = findViewById(R.id.booksListView);
        this.autoCompleteTextView = findViewById(R.id.authorNameTextField);

        this.displayedBooks = new ArrayList<>();

        realm.executeTransaction(realm -> this.user = realm.where(User.class).findFirst());

        Boolean myBooksOnly = getIntent().getExtras().getBoolean("myBooks");

        getAll();

        Log.d(TAG,user.getUsername());

        if (!myBooksOnly){
            realm.executeTransaction(realm -> {
                solveView(realm.where(Book.class).findAll());
            });
        }else{
            solveView(user.getBooks());
        }

        listView.setOnItemClickListener((adapterView, view, i, l) -> {
            Book book = (Book) adapterView.getItemAtPosition(i);

            Intent intent = new Intent(this, SingleBookActivity.class);
            intent.putExtra("bookId", book.getId());
            startActivity(intent);
        });

        autoCompleteTextView.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {
                handleAuthorNameChange(charSequence);
            }

            @Override
            public void afterTextChanged(Editable editable) {
            }
        });

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

    private void getMyBooks(){
        disposables.add(bookClient.getAllBooksForUser(user.getUsername())
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(
                        this::handleGetMyBooks
                )
        );
    }

    private void handleGetAll(List<BookDetails> books){
        Log.d(TAG, "GetAll books");

        realm.executeTransaction(realm -> {
            realm.where(Book.class).findAll().deleteAllFromRealm();

            for(BookDetails bd : books){
                    BookDTO bookDTO = bd.getBook();
                    Book b = new Book(
                            bookDTO.getId(),
                            bookDTO.getDescription(),
                            bookDTO.getAuthor(),
                            bookDTO.getDate(),
                            bookDTO.getTitle()
                    );
                    for(TagDTO tagDTO : bd.getTags()){
                        b.getTags().add(new Tag(tagDTO.getTag()));
                    }
                    realm.copyToRealmOrUpdate(b);
                }
            }
        );

        getMyBooks();
    }

    private void handleGetMyBooks(List<BookDetails> books){
        Log.d(TAG, "handleGetMyBooks");

        realm.executeTransaction(realm -> user.setBooks(new RealmList<>()));

        for(BookDetails bd :books){
            BookDTO b = bd.getBook();
            realm.executeTransaction(realm->{
                Book book = realm.where(Book.class).equalTo("id", b.getId()).findFirst();
                Log.d(TAG, book.getTitle());
                user.getBooks().add(book);
            });
        }
    }

    private void solveView(List<Book> books){
        Set<String> authors = new HashSet<>();

        for(Book b : books){
            authors.add(b.getAuthor());
        }

        ArrayAdapter<String> adapter = new ArrayAdapter<>(this, R.layout.list_view, new ArrayList<>(authors));
        this.autoCompleteTextView.setAdapter(adapter);

        ArrayAdapter<Book> adapter1 = new ArrayAdapter<>(this, R.layout.list_view, books);
        this.listView.setAdapter(adapter1);

        this.displayedBooks = books;
    }

    private void handleAuthorNameChange(CharSequence sequence){
        List<Book> newBooks = new ArrayList<>();

        for (Book b : displayedBooks){
            if (b.getAuthor().contains(sequence)){
                newBooks.add(b);
            }
        }

        ArrayAdapter<Book> adapter1 = new ArrayAdapter<Book>(this, R.layout.list_view, newBooks);
        listView.setAdapter(adapter1);
    }
}
