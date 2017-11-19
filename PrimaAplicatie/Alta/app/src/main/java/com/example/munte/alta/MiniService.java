package com.example.munte.alta;

import android.app.Activity;
import android.app.Service;
import android.content.Intent;
import android.os.Handler;
import android.os.IBinder;
import android.os.Looper;
import android.os.Message;
import android.util.Log;
import android.widget.Toast;

class DisplayMessageThread extends Thread{

    private Boolean stop;
    private Handler handler;

    public DisplayMessageThread(final Service service){
        stop = false;
        handler = new Handler(Looper.getMainLooper()){
            @Override
            public void handleMessage(Message msg) {
                Toast.makeText(service,(String)msg.obj, Toast.LENGTH_SHORT).show();
            }
        };
    }

    public void setStop() {
        stop = true;
    }

    @Override
    public void run() {
        while(!stop) {
            Message m = handler.obtainMessage(1,"This message is shown every 10 seconds" );
            m.sendToTarget();
            Log.d("THREAD", "printing()");
            try {
                sleep(10000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

public class MiniService extends Service {

    DisplayMessageThread t;

    public MiniService() {
    }

    @Override
    public IBinder onBind(Intent intent) {
       return null;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {

        Toast.makeText(this, "Service Started", Toast.LENGTH_SHORT).show();
        if(t == null)
        {
            t = new DisplayMessageThread(this);
            t.start();
        }

        Log.d("SERVICE", "onStartCommand()");
        return START_STICKY;
    }

    @Override
    public void onDestroy() {
        super.onDestroy();

        t.setStop();
        try {
            t.join();
            t = null;
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        Log.d("SERVICE", "onDestroy()");
        Toast.makeText(this, "Service Destroyed", Toast.LENGTH_SHORT).show();
    }
}
