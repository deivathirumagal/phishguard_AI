package com.phishguard.ai.network;

import android.content.Context;
import android.content.SharedPreferences;

/**
 * Network configuration manager for PhishGuard AI.
 * 
 * IMPORTANT NETWORKING NOTES:
 * 1. Android Emulator:
 *    - The Android Emulator runs in a virtualized network sandbox.
 *    - To reach the development computer's localhost (127.0.0.1:5000), you MUST use 10.0.2.2:5000.
 *    - Calling 127.0.0.1 on the Android device refers to the phone/emulator itself, NOT the PC!
 * 
 * 2. Physical Android Device:
 *    - The physical phone and development PC must be on the same Wi-Fi network.
 *    - Use your PC's local LAN IP (e.g., http://192.168.1.100:5000).
 *    - Ensure your PC firewall permits inbound traffic on port 5000.
 */
public class NetworkConfig {

    private static final String PREF_NAME = "phishguard_network_prefs";
    private static final String KEY_BASE_URL = "backend_base_url";

    // Default target for Android Studio Emulator to access host machine's Flask backend
    public static final String DEFAULT_EMULATOR_BASE_URL = "http://10.0.2.2:5000";

    /**
     * Gets the configured backend base URL.
     */
    public static String getBaseUrl(Context context) {
        SharedPreferences prefs = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
        return prefs.getString(KEY_BASE_URL, DEFAULT_EMULATOR_BASE_URL);
    }

    /**
     * Updates the backend base URL (e.g., when testing on a physical device with a LAN IP).
     */
    public static void setBaseUrl(Context context, String newUrl) {
        if (newUrl == null) return;
        String trimmed = newUrl.trim();
        if (trimmed.endsWith("/")) {
            trimmed = trimmed.substring(0, trimmed.length() - 1);
        }
        SharedPreferences prefs = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
        prefs.edit().putString(KEY_BASE_URL, trimmed).apply();
    }

    /**
     * Returns the full URL for the prediction endpoint.
     */
    public static String getPredictEndpoint(Context context) {
        return getBaseUrl(context) + "/predict";
    }

    /**
     * Returns the full URL for the health check endpoint.
     */
    public static String getHealthEndpoint(Context context) {
        return getBaseUrl(context) + "/";
    }
}
