package com.phishguard.ai.network.model;

import com.google.gson.annotations.SerializedName;

/**
 * Request payload model sent to Flask /predict API.
 */
public class PredictionRequest {

    @SerializedName("message")
    private String message;

    public PredictionRequest() {
    }

    public PredictionRequest(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
