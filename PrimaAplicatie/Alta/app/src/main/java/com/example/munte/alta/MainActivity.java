package com.example.munte.alta;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;

public class MainActivity extends Activity {

    public static final String EXTRA_MESSAGE = "EXTRA";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Log.d("ACTIVITY-LOG", "onCreate() called");
    }

    @Override
    protected void onStart() {
        super.onStart();
        Log.d("ACTIVITY-LOG", "onStart() called");
    }

    @Override
    protected void onRestart() {
        super.onRestart();
        Log.d("ACTIVITY-LOG", "onRestart() called");
    }

    @Override
    protected void onResume() {
        super.onResume();
        Log.d("ACTIVITY-LOG", "onResume() called");
    }

    @Override
    protected void onPause() {
        super.onPause();
        Log.d("ACTIVITY-LOG", "onPause() called");
    }

    @Override
    protected void onStop() {
        super.onStop();
        Log.d("ACTIVITY-LOG", "onStop() called");
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        Log.d("ACTIVITY-LOG", "onDestroy() called");
    }

    public void startMiniService(View view) {
        startService(new Intent(getBaseContext(), MiniService.class));
    }

    public void stopMiniService(View view) {
        stopService(new Intent(getBaseContext(), MiniService.class));
    }

    public void broadcastIntent(View view){
        Intent intent = new Intent();
        intent.setAction("testing_intent.CUSTOM_INTENT");
        sendBroadcast(intent);
    }

    public void queryAllStuffs(View view){
        Intent intent = new Intent(this, DisplayQueryResult.class);
        intent.putExtra(EXTRA_MESSAGE, "EXTRA SCREEN");
        startActivity(intent);
    }
}
