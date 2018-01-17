package com.andrei.b_project.net;

import android.app.Service;
import android.content.Intent;
import android.os.Binder;
import android.os.IBinder;
import android.support.annotation.Nullable;
import android.util.Log;

import com.andrei.b_project.domain.Book;
import com.andrei.b_project.domain.Tag;
import com.andrei.b_project.net.book.Responses.BookDTO;

import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.disposables.CompositeDisposable;
import io.reactivex.schedulers.Schedulers;
import io.realm.Realm;

public class SocketService extends Service {
    private static final String TAG = SocketService.class.getSimpleName();

    private ServiceBinder mBinder = new ServiceBinder();
    private Realm mRealm;

    private SocketClient mSocketClient;
    private CompositeDisposable mCompositeDisposable = new CompositeDisposable();

    public SocketService() {
    }

    @Override
    public void onCreate() {
        super.onCreate();
        Log.d(TAG, "onCreate");
        super.onCreate();

        mRealm = Realm.getDefaultInstance();
        mSocketClient = new SocketClient(this);
        listenUpdates();
    }

    private void listenUpdates() {
        mCompositeDisposable.add(
                mSocketClient.eventSocket()
                        .subscribeOn(Schedulers.io())
                        .observeOn(AndroidSchedulers.mainThread())
                        .subscribe(notification -> mRealm.executeTransactionAsync(
                                realm -> handleNotification(realm, notification),
                                () -> Log.d(TAG, "update tag"),
                                error -> Log.e(TAG, "failed to persist tag", error)
                        )));
    }

    public void handleNotification(Realm realm, Notification notification){
        switch (notification.type){
            case ADD_BOOK:
                BookDTO bookDTO = notification.book;
                Book book = new Book(bookDTO.getId(), bookDTO.getDescription(), bookDTO.getAuthor(), bookDTO.getDate(), bookDTO.getTitle(), (float)0.0);
                realm.executeTransactionAsync(r -> r.copyToRealmOrUpdate(book));
                break;
            case TAG_BOOK:
                Book b = realm.where(Book.class).equalTo("id", notification.bookId).findFirst();
                b.getTags().add(new Tag(notification.tag.getTag()));
                realm.executeTransactionAsync(r -> r.copyToRealmOrUpdate(b));
                break;
            case RATE_BOOK:
                Book b1 = realm.where(Book.class).equalTo("id", notification.bookId).findFirst();
                b1.setRating(notification.rating.getRating());
                realm.executeTransactionAsync(r -> r.copyToRealmOrUpdate(b1));
                break;
            case DELETE_BOOK:
                realm.executeTransactionAsync(r -> r.where(Book.class).equalTo("id", notification.bookId).findFirst().deleteFromRealm());
                break;
            default:
                break;
        }
    }

    @Override
    public void onDestroy() {
        Log.d(TAG, "onDestroy");
        super.onDestroy();

        mCompositeDisposable.dispose();
        mSocketClient.shutdown();

        mRealm.close();
    }

    public class ServiceBinder extends Binder {
        public SocketService getService() {
            return SocketService.this;
        }
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return mBinder;
    }

}
