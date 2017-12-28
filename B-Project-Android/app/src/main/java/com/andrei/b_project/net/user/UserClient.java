package com.andrei.b_project.net.user;

import android.content.Context;

import com.andrei.b_project.R;

import io.reactivex.Observable;
import retrofit2.Retrofit;
import retrofit2.adapter.rxjava2.RxJava2CallAdapterFactory;
import retrofit2.converter.gson.GsonConverterFactory;

/**
 * Created by munte on 12/28/2017.
 */

public class UserClient {
    private UserResource userResource;
    private Context context;

    public UserClient(Context context) {
        this.context = context;

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(context.getString(R.string.server_url))
                .addCallAdapterFactory(RxJava2CallAdapterFactory.create())
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        this.userResource = retrofit.create(UserResource.class);
    }

    public Observable<TokenDTO> login(UserDTO user){
        return userResource.login(user);
    }

    public Observable<TokenDTO> signUp(UserDTO user){
        return userResource.signUp(user);
    }

}
