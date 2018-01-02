package com.andrei.b_project.views;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.Toast;

import com.andrei.b_project.R;
import com.andrei.b_project.domain.User;
import com.andrei.b_project.net.user.TokenDTO;
import com.andrei.b_project.net.user.UserClient;
import com.andrei.b_project.net.user.UserDTO;


import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.disposables.CompositeDisposable;
import io.reactivex.schedulers.Schedulers;
import io.realm.Realm;
import retrofit2.HttpException;

public class LoginActivity extends AppCompatActivity {
    private static final String TAG = LoginActivity.class.getSimpleName();

    private UserClient userClient;

    private CompositeDisposable disposables = new CompositeDisposable();

    private Realm realm;

    private ProgressBar progressBar;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        this.userClient = new UserClient(this);
        this.realm = Realm.getDefaultInstance();
        this.progressBar = findViewById(R.id.progressBar);
        this.progressBar.setVisibility(View.GONE);

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

    public void login(View view) {
        UserDTO user = new UserDTO(getUserDetails());
        this.progressBar.setVisibility(View.VISIBLE);

        disposables.add(userClient.login(user)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(
                        this::handleLoginSuccessful,
                        this::handleLoginError
                )
        );
    }

    public void signUp(View view) {
        UserDTO user = new UserDTO(getUserDetails());
        this.progressBar.setVisibility(View.VISIBLE);

        disposables.add(userClient.signUp(user)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(
                        this::handleSignUpSuccessful,
                        this::handleSignupError
                )
        );
    }

    private User getUserDetails() {
        String username = ((EditText) findViewById(R.id.usernameTextField)).getText().toString();
        String password = ((EditText) findViewById(R.id.passwordTextField)).getText().toString();
        return new User(username, password);
    }

    private void handleLoginSuccessful(TokenDTO tokenDTO) {
        Log.d(TAG, "Successful login");
        this.progressBar.setVisibility(View.GONE);

        User user = getUserDetails();

        this.realm.executeTransaction(realm -> realm.where(User.class).findAll().deleteAllFromRealm());
        this.realm.executeTransactionAsync(realm -> realm.copyToRealmOrUpdate(user));

        startActivity(new Intent(this, MainMenuActivity.class));
    }

    private void handleSignUpSuccessful(TokenDTO tokenDTO) {
        this.progressBar.setVisibility(View.GONE);
        Log.d(TAG, "Successful signUp");

        Toast toast = Toast.makeText(this, "SUCCESSFUL SIGNUP " + tokenDTO.getToken(), Toast.LENGTH_SHORT);
        toast.show();
    }

    private void handleLoginError(Throwable error){
        this.progressBar.setVisibility(View.GONE);
        Log.d(TAG, "Successful login with local data");

        User user = getUserDetails();
        User foundUser = realm.where(User.class).equalTo("username", user.getUsername()).findFirst();

        if(foundUser == null || !foundUser.getPassword().equals(user.getPassword())) {
            Log.d(TAG, "No user found");
            Toast toast = Toast.makeText(this, "No user found", Toast.LENGTH_SHORT);
            toast.show();
        }  else{
            Log.d(TAG, "Starting offline");
            startActivity(new Intent(this, MainMenuActivity.class));
        }

    }

    private void handleSignupError(Throwable error) {
        this.progressBar.setVisibility(View.GONE);
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
