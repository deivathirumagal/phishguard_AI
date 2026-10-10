package com.phishguard.ai.alert;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.os.Build;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import com.phishguard.ai.MainActivity;
import com.phishguard.ai.R;
import com.phishguard.ai.network.model.PredictionResponse;

/**
 * Manages high-priority security notifications and in-app alerts when a phishing threat is detected.
 */
public class SecurityAlertManager {

    public static final String CHANNEL_ID_THREATS = "phishguard_threat_alerts";
    private static final String CHANNEL_NAME_THREATS = "Phishing Threat Interceptions";
    private static final int NOTIFICATION_ID_BASE = 5001;

    /**
     * Creates the notification channel on Android 8.0+ (API 26).
     */
    public static void createNotificationChannels(Context context) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                    CHANNEL_ID_THREATS,
                    CHANNEL_NAME_THREATS,
                    NotificationManager.IMPORTANCE_HIGH
            );
            channel.setDescription("High-priority alerts when incoming SMS contains phishing or social engineering threats");
            channel.enableLights(true);
            channel.setLightColor(Color.RED);
            channel.enableVibration(true);
            channel.setVibrationPattern(new long[]{0, 300, 150, 300});

            NotificationManager manager = context.getSystemService(NotificationManager.class);
            if (manager != null) {
                manager.createNotificationChannel(channel);
            }
        }
    }

    /**
     * Posts a prominent security notification if the SMS analysis detected a phishing threat.
     * For legitimate messages, no alert notification is posted.
     * 
     * @param context Application context.
     * @param result Prediction result from PhishGuard AI.
     */
    public static void processAlert(Context context, PredictionResponse result) {
        if (result == null || !result.isPhishingThreat()) {
            // For legitimate messages, do not generate a phishing warning.
            return;
        }

        createNotificationChannels(context);

        Intent intent = new Intent(context, MainActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        intent.putExtra("alert_result", result);

        PendingIntent pendingIntent = PendingIntent.getActivity(
                context,
                (int) System.currentTimeMillis(),
                intent,
                PendingIntent.FLAG_UPDATE_CURRENT | (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M ? PendingIntent.FLAG_IMMUTABLE : 0)
        );

        String title = "🚨 Phishing Detected";
        String summary = String.format("Risk Score: %d/100 (%s)", result.getRiskScore(), result.getRiskLevel());

        StringBuilder detailedBody = new StringBuilder();
        detailedBody.append(summary).append("\n\n");
        if (result.getExplanation() != null && !result.getExplanation().isEmpty()) {
            detailedBody.append("Analysis: ").append(result.getExplanation()).append("\n\n");
        }
        detailedBody.append("⚠️ CRITICAL SAFETY DIRECTIVE:\n");
        detailedBody.append("Do not click suspicious links or provide passwords, OTPs, or financial information.");

        NotificationCompat.Builder builder = new NotificationCompat.Builder(context, CHANNEL_ID_THREATS)
                .setSmallIcon(android.R.drawable.stat_sys_warning)
                .setContentTitle(title)
                .setContentText(summary)
                .setStyle(new NotificationCompat.BigTextStyle().bigText(detailedBody.toString()))
                .setPriority(NotificationCompat.PRIORITY_MAX)
                .setCategory(NotificationCompat.CATEGORY_ALARM)
                .setColor(Color.RED)
                .setAutoCancel(true)
                .setContentIntent(pendingIntent);

        try {
            NotificationManagerCompat notificationManager = NotificationManagerCompat.from(context);
            notificationManager.notify((int) (NOTIFICATION_ID_BASE + (System.currentTimeMillis() % 1000)), builder.build());
        } catch (SecurityException se) {
            // Handled when POST_NOTIFICATIONS runtime permission has not yet been granted on Android 13+
            se.printStackTrace();
        }
    }
}
