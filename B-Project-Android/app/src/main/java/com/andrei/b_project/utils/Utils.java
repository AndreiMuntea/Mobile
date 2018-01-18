package com.andrei.b_project.utils;

import com.andrei.b_project.domain.User;

/**
 * Created by munte on 1/18/2018.
 */

public class Utils {
    public static String getAuthorization(User user){
        return "Bearer " + user.getToken();
    }
}
