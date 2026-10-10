package com.phishguard.ai.service;

import android.content.Context;
import android.content.Intent;
import android.util.Log;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.phishguard.ai.alert.SecurityAlertManager;
import com.phishguard.ai.network.PhishGuardApiClient;
import com.phishguard.ai.network.model.PredictionResponse;
import com.phishguard.ai.util.DuplicateFilter;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

/**
 * Core coordinator service for incoming SMS processing, duplicate rejection,
 * backend prediction invocation, security alert dispatch, and scan persistence.
 */
public class DetectionService {

    private static final String TAG = "DetectionService";
    public static final String ACTION_NEW_SCAN = "com.phishguard.ai.ACTION_NEW_SCAN";
    public static final String EXTRA_SCAN_RESULT = "extra_scan_result";
    private static final String PREF_SCANS = "phishguard_scans_cache";
    private static final String KEY_SCANS_LIST = "scans_list";

    public interface ScanListener {
        void onScanCompleted(PredictionResponse result);
        void onScanFailed(String errorMessage);
    }

    /**
     * Processes an incoming SMS message through the complete PhishGuard AI defense pipeline.
     */
    public static void processIncomingSms(Context context, String sender, String messageBody, ScanListener listener) {
        if (messageBody == null || messageBody.trim().isEmpty()) {
            Log.w(TAG, "Empty SMS body received, skipping.");
            return;
        }

        // 1. Check duplicate filter (15-second window)
        if (DuplicateFilter.isDuplicate(messageBody)) {
            Log.d(TAG, "Duplicate message suppressed within 15s window: " + messageBody);
            if (listener != null) {
                listener.onScanFailed("Duplicate message suppressed by deduplication filter.");
            }
            return;
        }

        Log.i(TAG, "Processing incoming SMS from " + sender + ": " + messageBody);

        // 2. Dispatch to Flask /predict API
        PhishGuardApiClient.getInstance().predict(context, messageBody, new PhishGuardApiClient.ApiCallback<PredictionResponse>() {
            @Override
            public void onSuccess(PredictionResponse result) {
                result.setSenderAddress(sender != null ? sender : "Unknown");

                // 3. Persist into local scan history
                saveScanToHistory(context, result);

                // 4. Trigger security notification if threat detected
                SecurityAlertManager.processAlert(context, result);

                // 5. Broadcast update to active UI components
                Intent broadcast = new Intent(ACTION_NEW_SCAN);
                broadcast.setPackage(context.getPackageName());
                broadcast.putExtra(EXTRA_SCAN_RESULT, result);
                context.sendBroadcast(broadcast);

                if (listener != null) {
                    listener.onScanCompleted(result);
                }
            }

            @Override
            public void onError(String errorMessage) {
                Log.e(TAG, "Detection failed: " + errorMessage);
                if (listener != null) {
                    listener.onScanFailed(errorMessage);
                }
            }
        });
    }

    public static synchronized void saveScanToHistory(Context context, PredictionResponse result) {
        List<PredictionResponse> list = getScanHistory(context);
        list.add(0, result);
        if (list.size() > 50) {
            list = list.subList(0, 50);
        }
        String json = new Gson().toJson(list);
        context.getSharedPreferences(PREF_SCANS, Context.MODE_PRIVATE)
                .edit()
                .putString(KEY_SCANS_LIST, json)
                .apply();
    }

    public static synchronized List<PredictionResponse> getScanHistory(Context context) {
        String json = context.getSharedPreferences(PREF_SCANS, Context.MODE_PRIVATE)
                .getString(KEY_SCANS_LIST, null);
        if (json == null) return new ArrayList<>();
        try {
            Type type = new TypeToken<ArrayList<PredictionResponse>>() {}.getType();
            List<PredictionResponse> list = new Gson().fromJson(json, type);
            return list != null ? list : new ArrayList<>();
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }
}
