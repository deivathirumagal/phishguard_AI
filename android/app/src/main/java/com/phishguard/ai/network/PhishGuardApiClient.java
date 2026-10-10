package com.phishguard.ai.network;

import android.content.Context;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;

import com.google.gson.Gson;
import com.phishguard.ai.network.model.PredictionRequest;
import com.phishguard.ai.network.model.PredictionResponse;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

import okhttp3.Call;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

/**
 * Asynchronous HTTP client communicating with the Flask PhishGuard AI backend.
 */
public class PhishGuardApiClient {

    private static final String TAG = "PhishGuardApiClient";
    private static final MediaType JSON_MEDIA_TYPE = MediaType.get("application/json; charset=utf-8");

    private static PhishGuardApiClient instance;
    private final OkHttpClient httpClient;
    private final Gson gson;
    private final Handler mainHandler;

    public interface ApiCallback<T> {
        void onSuccess(T result);
        void onError(String errorMessage);
    }

    public interface ConnectionCallback {
        void onResult(boolean isConnected, String message);
    }

    private PhishGuardApiClient() {
        this.httpClient = new OkHttpClient.Builder()
                .connectTimeout(10, TimeUnit.SECONDS)
                .readTimeout(15, TimeUnit.SECONDS)
                .writeTimeout(10, TimeUnit.SECONDS)
                .build();
        this.gson = new Gson();
        this.mainHandler = new Handler(Looper.getMainLooper());
    }

    public static synchronized PhishGuardApiClient getInstance() {
        if (instance == null) {
            instance = new PhishGuardApiClient();
        }
        return instance;
    }

    /**
     * Sends an SMS message to the Flask /predict endpoint for AI analysis.
     * 
     * @param context Context for retrieving configured base URL.
     * @param messageText SMS text content.
     * @param callback Asynchronous callback delivered on the main UI thread.
     */
    public void predict(Context context, String messageText, ApiCallback<PredictionResponse> callback) {
        String endpoint = NetworkConfig.getPredictEndpoint(context);
        PredictionRequest reqPayload = new PredictionRequest(messageText);
        String jsonBody = gson.toJson(reqPayload);

        RequestBody body = RequestBody.create(jsonBody, JSON_MEDIA_TYPE);
        Request request = new Request.Builder()
                .url(endpoint)
                .post(body)
                .build();

        Log.d(TAG, "Dispatching SMS to PhishGuard AI: " + endpoint);

        httpClient.newCall(request).enqueue(new okhttp3.Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                Log.e(TAG, "Failed to reach PhishGuard backend: " + e.getMessage());
                mainHandler.post(() -> callback.onError("Network connection failure: " + e.getMessage()));
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                if (!response.isSuccessful()) {
                    String err = "Backend returned HTTP " + response.code();
                    Log.e(TAG, err);
                    mainHandler.post(() -> callback.onError(err));
                    return;
                }

                String responseBody = response.body() != null ? response.body().string() : "";
                try {
                    PredictionResponse result = gson.fromJson(responseBody, PredictionResponse.class);
                    mainHandler.post(() -> callback.onSuccess(result));
                } catch (Exception parseEx) {
                    Log.e(TAG, "JSON parsing error: " + parseEx.getMessage());
                    mainHandler.post(() -> callback.onError("Failed to parse backend AI response"));
                }
            }
        });
    }

    /**
     * Tests connectivity to the backend health endpoint (GET /).
     */
    public void testConnection(Context context, ConnectionCallback callback) {
        String endpoint = NetworkConfig.getHealthEndpoint(context);
        Request request = new Request.Builder()
                .url(endpoint)
                .get()
                .build();

        httpClient.newCall(request).enqueue(new okhttp3.Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                mainHandler.post(() -> callback.onResult(false, "Cannot reach " + endpoint + " (" + e.getMessage() + ")"));
            }

            @Override
            public void onResponse(Call call, Response response) {
                boolean ok = response.isSuccessful();
                mainHandler.post(() -> callback.onResult(ok, ok ? "Backend online at " + endpoint : "Backend responded with code " + response.code()));
            }
        });
    }
}
