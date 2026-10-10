package com.phishguard.ai.receiver;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.provider.Telephony;
import android.telephony.SmsMessage;
import android.util.Log;

import com.phishguard.ai.service.DetectionService;

/**
 * Android BroadcastReceiver that intercepts incoming SMS messages using the standard
 * Android telephony broadcast mechanism (android.provider.Telephony.SMS_RECEIVED).
 * 
 * Pipeline:
 * Incoming SMS
 *      ↓
 * Android SMS Receiver
 *      ↓
 * Extract sender + full concatenated message text
 *      ↓
 * PhishGuard Detection Service (Deduplication Check)
 *      ↓
 * POST /predict (Flask Backend)
 *      ↓
 * Receive AI result
 *      ↓
 * Display Security Alert / Notification
 */
public class SmsReceiver extends BroadcastReceiver {

    private static final String TAG = "SmsReceiver";
    public static final String PREF_PROTECTION_ENABLED = "pref_protection_enabled";

    @Override
    public void onReceive(Context context, Intent intent) {
        if (intent == null || !Telephony.Sms.Intents.SMS_RECEIVED_ACTION.equals(intent.getAction())) {
            return;
        }

        // Check if user has enabled real-time protection in the app settings
        SharedPreferences prefs = context.getSharedPreferences("phishguard_app_prefs", Context.MODE_PRIVATE);
        boolean isProtectionActive = prefs.getBoolean(PREF_PROTECTION_ENABLED, true);
        if (!isProtectionActive) {
            Log.d(TAG, "SMS received but PhishGuard real-time protection is disabled by user.");
            return;
        }

        try {
            SmsMessage[] messages = Telephony.Sms.Intents.getMessagesFromIntent(intent);
            if (messages == null || messages.length == 0) {
                Log.w(TAG, "No SMS messages found in broadcast intent.");
                return;
            }

            // Extract sender address from the first message segment
            String sender = messages[0].getDisplayOriginatingAddress();

            // Reconstruct full concatenated message from multi-part segments
            StringBuilder fullMessageBuilder = new StringBuilder();
            for (SmsMessage msg : messages) {
                if (msg != null && msg.getMessageBody() != null) {
                    fullMessageBuilder.append(msg.getMessageBody());
                }
            }

            String fullMessage = fullMessageBuilder.toString();
            Log.d(TAG, "SMS intercepted from " + sender + " (length: " + fullMessage.length() + ")");

            // Route through the detection pipeline
            DetectionService.processIncomingSms(context, sender, fullMessage, null);

        } catch (Exception e) {
            Log.e(TAG, "Error intercepting incoming SMS: " + e.getMessage(), e);
        }
    }
}
