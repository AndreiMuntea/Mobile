package com.example.munte.alta;

import android.app.Activity;
import android.content.ContentValues;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.widget.TextView;
import android.widget.Toast;

public class DisplayQueryResult extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_display_query_result);

        Intent intent = getIntent();
        String message = intent.getStringExtra(MainActivity.EXTRA_MESSAGE);

        TextView textView =  (TextView) findViewById(R.id.textView);
        textView.setText(message);

        populate();
        query();
    }

    public void populate() {
        ContentValues values = new ContentValues();
        values.put(StudentsProvider.NAME, "Ana Maria");
        values.put(StudentsProvider.GRADE, 10);

        getContentResolver().insert(StudentsProvider.CONTENT_URI, values);

        values.put(StudentsProvider.NAME, "Ioana Avramut");
        values.put(StudentsProvider.GRADE, 9.0);

        getContentResolver().insert(StudentsProvider.CONTENT_URI, values);

        values.put(StudentsProvider.NAME, "Marcel Stan");
        values.put(StudentsProvider.GRADE, 3.0);

        getContentResolver().insert(StudentsProvider.CONTENT_URI, values);
    }


    public void query(){
        String URL = "content://com.example.munte.alta.StudentsProvider";
        Uri students = Uri.parse(URL);
        Cursor c = managedQuery(students, null, null, null, "name");
        if (c.moveToFirst()) {
            do{
                Toast.makeText(this,
                        c.getString(c.getColumnIndex(StudentsProvider._ID)) +
                                ", " +  c.getString(c.getColumnIndex( StudentsProvider.NAME)) +
                                ", " + c.getString(c.getColumnIndex( StudentsProvider.GRADE)),
                        Toast.LENGTH_SHORT).show();
            } while (c.moveToNext());
        }
    }
}
