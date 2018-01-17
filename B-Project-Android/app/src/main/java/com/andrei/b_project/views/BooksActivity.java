package com.andrei.b_project.views;

import android.content.ComponentName;
import android.content.Intent;
import android.content.ServiceConnection;
import android.graphics.Color;
import android.os.IBinder;
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
import com.andrei.b_project.net.SocketService;
import com.andrei.b_project.net.book.BookClient;
import com.andrei.b_project.net.book.Responses.BookDTO;
import com.andrei.b_project.net.book.Responses.BookDetails;
import com.andrei.b_project.net.book.Responses.TagDTO;
import com.github.mikephil.charting.charts.PieChart;
import com.github.mikephil.charting.data.Entry;
import com.github.mikephil.charting.data.PieData;
import com.github.mikephil.charting.data.PieDataSet;
import com.github.mikephil.charting.utils.ColorTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.disposables.CompositeDisposable;
import io.reactivex.schedulers.Schedulers;
import io.realm.Realm;
import io.realm.RealmChangeListener;
import io.realm.RealmList;

public class BooksActivity extends AppCompatActivity  implements ServiceConnection{

    private static final String TAG = BooksActivity.class.getSimpleName();
    private BookClient bookClient;

    private CompositeDisposable disposables = new CompositeDisposable();
    private RealmChangeListener realmChangeListener = realm -> solveView();

    private ListView listView;
    private List<Book> displayedBooks;
    private AutoCompleteTextView autoCompleteTextView;

    private PieChart pieChart;
    private Realm realm;

    private User user;
    private Boolean myBooksOnly;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_books);

        this.realm = Realm.getDefaultInstance();
        this.bookClient = new BookClient(this);

        this.listView = findViewById(R.id.booksListView);
        this.autoCompleteTextView = findViewById(R.id.authorNameTextField);
        this.pieChart = findViewById(R.id.piechart);
        this.pieChart.setUsePercentValues(true);

        this.displayedBooks = new ArrayList<>();

        realm.executeTransaction(realm -> this.user = realm.where(User.class).findFirst());

        this.myBooksOnly = getIntent().getExtras().getBoolean("myBooks");

        getAll();

        Log.d(TAG,user.getUsername());

        solveView();


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

        bindService(new Intent(this, SocketService.class), this, BIND_AUTO_CREATE);
        realm.addChangeListener(realmChangeListener);

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
        unbindService(this);
        realm.removeAllChangeListeners();
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
                        this::handleGetAll,
                        this::handleGetError
                )
        );
    }

    private void getMyBooks(){
        disposables.add(bookClient.getAllBooksForUser(user.getUsername())
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(
                        this::handleGetMyBooks,
                        this::handleGetError
                )
        );
    }

    private void handleGetError(Throwable error){

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
                            bookDTO.getTitle(),
                            bd.getRating()
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

    private void solveView(){
        List<Book> books = (myBooksOnly) ? user.getBooks() : realm.where(Book.class).findAll();
        Set<String> authors = new HashSet<>();

        for(Book b : books){
            authors.add(b.getAuthor());
        }

        ArrayAdapter<String> adapter = new ArrayAdapter<>(this, R.layout.list_view, new ArrayList<>(authors));
        this.autoCompleteTextView.setAdapter(adapter);

        ArrayAdapter<Book> adapter1 = new ArrayAdapter<>(this, R.layout.list_view, books);
        this.listView.setAdapter(adapter1);

        this.displayedBooks = books;

        getPieData(adapter1);
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

    private void getPieData(ArrayAdapter<Book> adapter){
        HashMap<String, Integer> values = new HashMap<>();

        for(int i = 0; i < adapter.getCount(); ++i){
            Book b = adapter.getItem(i);
            for (Tag t : b.getTags()){
                if (!values.containsKey(t.getTag())){
                    values.put(t.getTag(), 0);
                }
                Integer lastValue = values.get(t.getTag());
                values.put(t.getTag(), lastValue + 1);
            }
        }

        ArrayList<Entry> yValues = new ArrayList<>();
        ArrayList<String> xValues = new ArrayList<>();
        Integer idx = 0;

        for(String key : values.keySet()){
            xValues.add(key);
            yValues.add(new Entry(Float.valueOf(values.get(key)), idx));
            idx += 1;

            if(idx > 4) break;
        }

        PieDataSet dataSet = new PieDataSet(yValues, "");

        dataSet.setColors(ColorTemplate.VORDIPLOM_COLORS);
        dataSet.setColors(ColorTemplate.JOYFUL_COLORS);
        dataSet.setColors(ColorTemplate.COLORFUL_COLORS);
        dataSet.setColors(ColorTemplate.LIBERTY_COLORS);
        dataSet.setColors(ColorTemplate.PASTEL_COLORS);

        PieData data = new PieData(xValues, dataSet);
        data.setValueTextSize(16f);
        data.setValueTextColor(Color.DKGRAY);

        this.pieChart.setData(data);
        this.pieChart.setDrawHoleEnabled(false);
        this.pieChart.setCenterTextSize(24);
        this.pieChart.setDescription("Hottest books");
        this.pieChart.setDescriptionTextSize(16);

    }

    @Override
    public void onServiceConnected(ComponentName name, IBinder service) {

    }

    @Override
    public void onServiceDisconnected(ComponentName name) {

    }
}
