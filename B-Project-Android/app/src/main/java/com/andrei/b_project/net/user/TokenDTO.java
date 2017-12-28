package com.andrei.b_project.net.user;

import com.google.gson.annotations.SerializedName;

/**
 * Created by munte on 12/28/2017.
 */

public class TokenDTO {
    @SerializedName("token")
    private String token;

    public TokenDTO(String token) {
        this.token = token;
    }

    public TokenDTO() {
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
