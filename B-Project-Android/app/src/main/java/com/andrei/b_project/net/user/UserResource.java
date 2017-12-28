package com.andrei.b_project.net.user;

import io.reactivex.Observable;
import retrofit2.http.Body;
import retrofit2.http.POST;

/**
 * Created by munte on 12/28/2017.
 */

public interface UserResource {
    @POST("/login")
    Observable<TokenDTO> login(@Body UserDTO user);

    @POST("/register")
    Observable<TokenDTO> signUp(@Body UserDTO user);
}
