package com.phishguard.ai.network.model;

import com.google.gson.annotations.SerializedName;
import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 * Detailed response model matching Flask /predict API response structure.
 */
public class PredictionResponse implements Serializable {

    @SerializedName("message")
    private String message;

    @SerializedName("prediction")
    private String prediction;

    @SerializedName("label")
    private String label;

    @SerializedName("confidence")
    private Double confidence;

    @SerializedName("risk_score")
    private Integer riskScore;

    @SerializedName("risk_level")
    private String riskLevel;

    @SerializedName("detected_urls")
    private List<String> detectedUrls;

    @SerializedName("url_analysis")
    private UrlAnalysis urlAnalysis;

    @SerializedName("social_engineering")
    private Map<String, Boolean> socialEngineering;

    @SerializedName("indicators")
    private List<String> indicators;

    @SerializedName("explanation")
    private String explanation;

    @SerializedName("recommendation")
    private String recommendation;

    // Sender metadata added by Android SMS listener
    private String senderAddress;
    private long timestampMs;

    public PredictionResponse() {
        this.timestampMs = System.currentTimeMillis();
    }

    public boolean isPhishingThreat() {
        if ("Phishing".equalsIgnoreCase(label)) return true;
        if ("High Risk".equalsIgnoreCase(riskLevel) || "Critical Risk".equalsIgnoreCase(riskLevel)) return true;
        return riskScore != null && riskScore >= 60;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getPrediction() {
        return prediction;
    }

    public void setPrediction(String prediction) {
        this.prediction = prediction;
    }

    public String getLabel() {
        return label != null ? label : "Unknown";
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Double getConfidence() {
        return confidence;
    }

    public void setConfidence(Double confidence) {
        this.confidence = confidence;
    }

    public Integer getRiskScore() {
        return riskScore != null ? riskScore : 0;
    }

    public void setRiskScore(Integer riskScore) {
        this.riskScore = riskScore;
    }

    public String getRiskLevel() {
        return riskLevel != null ? riskLevel : "Low Risk";
    }

    public void setRiskLevel(String riskLevel) {
        this.riskLevel = riskLevel;
    }

    public List<String> getDetectedUrls() {
        return detectedUrls;
    }

    public void setDetectedUrls(List<String> detectedUrls) {
        this.detectedUrls = detectedUrls;
    }

    public UrlAnalysis getUrlAnalysis() {
        return urlAnalysis;
    }

    public void setUrlAnalysis(UrlAnalysis urlAnalysis) {
        this.urlAnalysis = urlAnalysis;
    }

    public Map<String, Boolean> getSocialEngineering() {
        return socialEngineering;
    }

    public void setSocialEngineering(Map<String, Boolean> socialEngineering) {
        this.socialEngineering = socialEngineering;
    }

    public List<String> getIndicators() {
        return indicators;
    }

    public void setIndicators(List<String> indicators) {
        this.indicators = indicators;
    }

    public String getExplanation() {
        return explanation != null ? explanation : "No explanation provided.";
    }

    public void setExplanation(String explanation) {
        this.explanation = explanation;
    }

    public String getRecommendation() {
        return recommendation != null ? recommendation : "Stay vigilant against unverified communications.";
    }

    public void setRecommendation(String recommendation) {
        this.recommendation = recommendation;
    }

    public String getSenderAddress() {
        return senderAddress;
    }

    public void setSenderAddress(String senderAddress) {
        this.senderAddress = senderAddress;
    }

    public long getTimestampMs() {
        return timestampMs;
    }

    public void setTimestampMs(long timestampMs) {
        this.timestampMs = timestampMs;
    }

    public static class UrlAnalysis implements Serializable {
        @SerializedName("has_url")
        private boolean hasUrl;

        @SerializedName("suspicious_url")
        private boolean suspiciousUrl;

        @SerializedName("reasons")
        private List<String> reasons;

        public boolean isHasUrl() {
            return hasUrl;
        }

        public void setHasUrl(boolean hasUrl) {
            this.hasUrl = hasUrl;
        }

        public boolean isSuspiciousUrl() {
            return suspiciousUrl;
        }

        public void setSuspiciousUrl(boolean suspiciousUrl) {
            this.suspiciousUrl = suspiciousUrl;
        }

        public List<String> getReasons() {
            return reasons;
        }

        public void setReasons(List<String> reasons) {
            this.reasons = reasons;
        }
    }
}
