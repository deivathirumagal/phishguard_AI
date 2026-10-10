package com.phishguard.ai.util;

import java.util.Iterator;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * In-memory deduplication filter to prevent duplicate processing of identical SMS messages.
 * 
 * Carrier networks and multipart SMS retransmissions can trigger multiple broadcast intents
 * for the same message. This filter ensures each unique message is only processed once within
 * a 15-second time window.
 */
public class DuplicateFilter {

    private static final long DEDUPLICATION_WINDOW_MS = 15000; // 15 seconds
    private static final Map<String, Long> processedMessages = new ConcurrentHashMap<>();

    private DuplicateFilter() {}

    /**
     * Determines if a message was already processed within the deduplication window.
     * If not, marks it as processed now.
     * 
     * @param message The SMS text to check.
     * @return true if the message is a duplicate and should be skipped; false otherwise.
     */
    public static synchronized boolean isDuplicate(String message) {
        if (message == null || message.trim().isEmpty()) {
            return false;
        }

        cleanupExpired();

        String key = message.trim().toLowerCase();
        long now = System.currentTimeMillis();

        Long previousTimestamp = processedMessages.get(key);
        if (previousTimestamp != null && (now - previousTimestamp) < DEDUPLICATION_WINDOW_MS) {
            return true;
        }

        processedMessages.put(key, now);
        return false;
    }

    private static void cleanupExpired() {
        long now = System.currentTimeMillis();
        Iterator<Map.Entry<String, Long>> it = processedMessages.entrySet().iterator();
        while (it.hasNext()) {
            Map.Entry<String, Long> entry = it.next();
            if (now - entry.getValue() > DEDUPLICATION_WINDOW_MS) {
                it.remove();
            }
        }
    }

    /**
     * Clears the deduplication cache (useful for testing).
     */
    public static synchronized void reset() {
        processedMessages.clear();
    }
}
