# PhishGuard AI ProGuard rules
-keep class com.phishguard.ai.network.model.** { *; }
-keepclassmembers class * {
    @com.google.gson.annotations.SerializedName <fields>;
}
