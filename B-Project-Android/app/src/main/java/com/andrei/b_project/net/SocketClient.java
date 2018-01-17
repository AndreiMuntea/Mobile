package com.andrei.b_project.net;

import android.content.Context;
import android.util.Log;

import com.andrei.b_project.R;
import com.andrei.b_project.net.book.Responses.BookDTO;
import com.andrei.b_project.net.book.Responses.Rating;
import com.andrei.b_project.net.book.Responses.TagDTO;

import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.Locale;

import io.reactivex.Observable;
import io.reactivex.ObservableEmitter;
import io.reactivex.ObservableOnSubscribe;
import io.socket.client.IO;
import io.socket.client.Socket;


public class SocketClient {
    public static final String TAG = SocketClient.class.getSimpleName();
    private static final SimpleDateFormat FORMAT = new SimpleDateFormat("yyyy-MM-dd", Locale.US);

    private Socket mSocket;
    private Context mContext;

    public SocketClient(Context context){
        mContext = context;
    }

    public Observable<Notification> eventSocket(){
        return Observable.create(new ObservableOnSubscribe<Notification>() {
            private ObservableEmitter<Notification> mObservableEmitter;

            @Override
            public void subscribe(ObservableEmitter<Notification> e) throws Exception {
                mObservableEmitter = e;

                mSocket = IO.socket(mContext.getString(R.string.server_url));
                mSocket.on("book-added", (args) -> handleEvent(Notification.Type.ADD_BOOK, args));
                mSocket.on("book-tagged", (args) -> handleEvent(Notification.Type.TAG_BOOK, args));
                mSocket.on("book-deleted", (args) -> handleEvent(Notification.Type.DELETE_BOOK, args));
                mSocket.on("book-rated", (args) -> handleEvent(Notification.Type.RATE_BOOK, args));
                mSocket.connect();
            }

            public void handleEvent(Notification.Type eventType, Object[] arguments) {
                Notification notification = null;

                switch (eventType){
                    case ADD_BOOK:
                        notification = new Notification(eventType, null, null, null, parseBook(arguments));
                        break;
                    case TAG_BOOK:
                       notification = new Notification(eventType, parseTag(arguments), null, parseId(arguments), null);
                        break;
                    case RATE_BOOK:
                        notification = new Notification(eventType, null, parseRating(arguments), parseId(arguments), null);
                        break;
                    case DELETE_BOOK:
                        notification = new Notification(eventType, null, null, parseId(arguments), null);
                        break;
                    default:
                        break;
                }

                mObservableEmitter.onNext(notification);
            }

            public BookDTO parseBook(Object[] arguments) {
                BookDTO bookDTO = new BookDTO();
                JSONObject obj = (JSONObject) arguments[0];
                try {
                    bookDTO.setId(obj.getString("_id"));
                    bookDTO.setDescription(obj.getString("description"));
                    bookDTO.setTitle(obj.getString("title"));
                    bookDTO.setAuthor(obj.getString("author"));
                    bookDTO.setDate(FORMAT.parse(obj.getString("date")));
                }catch (Exception ex){
                    Log.d(TAG, ex.getMessage());
                }

                return bookDTO;
            }

            public Rating parseRating(Object[] arguments){
                Rating r = new Rating();
                JSONObject obj = (JSONObject) arguments[0];

                try {
                    r.setRating((float) obj.getDouble("rating"));
                }catch (Exception ex){
                    Log.d(TAG, ex.getMessage());
                }

                return r;
            }

            public TagDTO parseTag(Object[] arguments){
                TagDTO t = new TagDTO();
                JSONObject obj = (JSONObject) arguments[0];

                try {
                    t.setTag(obj.getString("tag"));
                }catch (Exception ex){
                    Log.d(TAG, ex.getMessage());
                }

                return t;
            }

            public String parseId(Object[] arguments){
                String id = "";

                JSONObject obj = (JSONObject) arguments[0];
                try {
                    id = obj.getString("_id");
                }catch (Exception ex){
                    Log.d(TAG, ex.getMessage());
                }

                return id;
            }

        });
    }

    public void shutdown() {
        Log.d(TAG, "shutdown");
        if (mSocket != null) {
            mSocket.disconnect();
        }
    }
}
