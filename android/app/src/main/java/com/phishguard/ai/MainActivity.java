package com.phishguard.ai;

import android.Manifest;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.google.android.material.switchmaterial.SwitchMaterial;
import com.phishguard.ai.adapter.RecentScanAdapter;
import com.phishguard.ai.alert.SecurityAlertManager;
import com.phishguard.ai.network.NetworkConfig;
import com.phishguard.ai.network.PhishGuardApiClient;
import com.phishguard.ai.network.model.PredictionResponse;
import com.phishguard.ai.receiver.SmsReceiver;
import com.phishguard.ai.service.DetectionService;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    private static final int PERMISSION_REQ_SMS = 101;

    // UI elements
    private SwitchMaterial switchProtection;
    private TextView tvEngineStatus;
    private TextView tvBackendStatus;
    private TextView tvCurrentBaseUrl;
    private Button btnTestConnection;
    private Button btnConfigureUrl;

    // Security Alert UI
    private View cardSecurityAlert;
    private TextView tvAlertTitle;
    private TextView tvAlertScore;
    private TextView tvAlertAnalysis;
    private TextView tvAlertRecommendation;
    private Button btnDismissAlert;

    // Recent Scans RecyclerView
    private RecyclerView rvRecentScans;
    private RecentScanAdapter scanAdapter;
    private List<PredictionResponse> scanList;
    private TextView tvEmptyScans;
    private Button btnClearScans;

    // Test simulation buttons
    private Button btnSimulateLegit;
    private Button btnSimulatePhish;

    private BroadcastReceiver newScanReceiver;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        initViews();
        setupRecyclerView();
        setupListeners();
        checkAndRequestPermissions();
        testBackendConnection();

        // Check if opened from a notification
        if (getIntent() != null && getIntent().hasExtra("alert_result")) {
            PredictionResponse alertRes = (PredictionResponse) getIntent().getSerializableExtra("alert_result");
            displaySecurityAlert(alertRes);
        }

        registerScanBroadcastReceiver();
    }

    private void initViews() {
        switchProtection = findViewById(R.id.switch_protection);
        tvEngineStatus = findViewById(R.id.tv_engine_status);
        tvBackendStatus = findViewById(R.id.tv_backend_status);
        tvCurrentBaseUrl = findViewById(R.id.tv_current_base_url);
        btnTestConnection = findViewById(R.id.btn_test_connection);
        btnConfigureUrl = findViewById(R.id.btn_configure_url);

        cardSecurityAlert = findViewById(R.id.card_security_alert);
        tvAlertTitle = findViewById(R.id.tv_alert_title);
        tvAlertScore = findViewById(R.id.tv_alert_score);
        tvAlertAnalysis = findViewById(R.id.tv_alert_analysis);
        tvAlertRecommendation = findViewById(R.id.tv_alert_recommendation);
        btnDismissAlert = findViewById(R.id.btn_dismiss_alert);

        rvRecentScans = findViewById(R.id.rv_recent_scans);
        tvEmptyScans = findViewById(R.id.tv_empty_scans);
        btnClearScans = findViewById(R.id.btn_clear_scans);

        btnSimulateLegit = findViewById(R.id.btn_sim_legit);
        btnSimulatePhish = findViewById(R.id.btn_sim_phish);

        // Load persisted state
        SharedPreferences prefs = getSharedPreferences("phishguard_app_prefs", MODE_PRIVATE);
        boolean isProtected = prefs.getBoolean(SmsReceiver.PREF_PROTECTION_ENABLED, true);
        switchProtection.setChecked(isProtected);
        updateProtectionStatusUI(isProtected);

        tvCurrentBaseUrl.setText("Host: " + NetworkConfig.getBaseUrl(this));
    }

    private void setupRecyclerView() {
        scanList = new ArrayList<>(DetectionService.getScanHistory(this));
        scanAdapter = new RecentScanAdapter(scanList, this::displaySecurityAlert);
        rvRecentScans.setLayoutManager(new LinearLayoutManager(this));
        rvRecentScans.setAdapter(scanAdapter);
        updateEmptyState();
    }

    private void setupListeners() {
        switchProtection.setOnCheckedChangeListener((btn, isChecked) -> {
            getSharedPreferences("phishguard_app_prefs", MODE_PRIVATE)
                    .edit()
                    .putBoolean(SmsReceiver.PREF_PROTECTION_ENABLED, isChecked)
                    .apply();
            updateProtectionStatusUI(isChecked);
        });

        btnTestConnection.setOnClickListener(v -> testBackendConnection());

        btnConfigureUrl.setOnClickListener(v -> showConfigureUrlDialog());

        btnDismissAlert.setOnClickListener(v -> cardSecurityAlert.setVisibility(View.GONE));

        btnClearScans.setOnClickListener(v -> {
            getSharedPreferences("phishguard_scans_cache", MODE_PRIVATE).edit().clear().apply();
            scanList.clear();
            scanAdapter.notifyDataSetChanged();
            updateEmptyState();
        });

        // Interactive simulation buttons for immediate testing
        btnSimulateLegit.setOnClickListener(v -> {
            String legitSample = "Hey, are we still meeting for lunch today?";
            DetectionService.processIncomingSms(this, "+1-555-0100", legitSample, new DetectionService.ScanListener() {
                @Override
                public void onScanCompleted(PredictionResponse result) {
                    refreshScans();
                    Toast.makeText(MainActivity.this, "Legitimate SMS processed: " + result.getLabel(), Toast.LENGTH_SHORT).show();
                }

                @Override
                public void onScanFailed(String errorMessage) {
                    Toast.makeText(MainActivity.this, errorMessage, Toast.LENGTH_SHORT).show();
                }
            });
        });

        btnSimulatePhish.setOnClickListener(v -> {
            String phishSample = "URGENT! Your bank account has been suspended. Verify your account immediately by clicking http://bit.ly/example";
            DetectionService.processIncomingSms(this, "+1-555-0999", phishSample, new DetectionService.ScanListener() {
                @Override
                public void onScanCompleted(PredictionResponse result) {
                    refreshScans();
                    displaySecurityAlert(result);
                }

                @Override
                public void onScanFailed(String errorMessage) {
                    Toast.makeText(MainActivity.this, errorMessage, Toast.LENGTH_SHORT).show();
                }
            });
        });
    }

    private void updateProtectionStatusUI(boolean active) {
        if (active) {
            tvEngineStatus.setText("🛡️ SMS Protection ACTIVE");
            tvEngineStatus.setTextColor(Color.parseColor("#10B981"));
        } else {
            tvEngineStatus.setText("⚠️ SMS Protection PAUSED");
            tvEngineStatus.setTextColor(Color.parseColor("#94A3B8"));
        }
    }

    private void testBackendConnection() {
        tvBackendStatus.setText("Connecting to Flask...");
        tvBackendStatus.setTextColor(Color.parseColor("#F59E0B"));

        PhishGuardApiClient.getInstance().testConnection(this, (isConnected, msg) -> {
            if (isConnected) {
                tvBackendStatus.setText("● Connected (" + NetworkConfig.getBaseUrl(this) + ")");
                tvBackendStatus.setTextColor(Color.parseColor("#10B981"));
            } else {
                tvBackendStatus.setText("● Disconnected: " + msg);
                tvBackendStatus.setTextColor(Color.parseColor("#EF4444"));
            }
        });
    }

    private void showConfigureUrlDialog() {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("Configure Backend Base URL");

        final EditText input = new EditText(this);
        input.setText(NetworkConfig.getBaseUrl(this));
        builder.setView(input);

        builder.setMessage("For Android Emulator, use: http://10.0.2.2:5000\nFor physical phone, use your PC LAN IP: http://192.168.X.X:5000");

        builder.setPositiveButton("Save", (dialog, which) -> {
            String newUrl = input.getText().toString();
            NetworkConfig.setBaseUrl(this, newUrl);
            tvCurrentBaseUrl.setText("Host: " + NetworkConfig.getBaseUrl(this));
            testBackendConnection();
        });

        builder.setNegativeButton("Cancel", (dialog, which) -> dialog.cancel());
        builder.show();
    }

    public void displaySecurityAlert(PredictionResponse result) {
        if (result == null || !result.isPhishingThreat()) {
            cardSecurityAlert.setVisibility(View.GONE);
            return;
        }

        tvAlertTitle.setText("🚨 Phishing Detected!");
        tvAlertScore.setText(String.format("Risk Score: %d/100 (%s)", result.getRiskScore(), result.getRiskLevel()));
        tvAlertAnalysis.setText("Analysis: " + result.getExplanation());
        tvAlertRecommendation.setText("Action: " + result.getRecommendation());

        cardSecurityAlert.setVisibility(View.VISIBLE);
        cardSecurityAlert.requestFocus();
    }

    private void refreshScans() {
        scanList.clear();
        scanList.addAll(DetectionService.getScanHistory(this));
        scanAdapter.notifyDataSetChanged();
        updateEmptyState();
    }

    private void updateEmptyState() {
        if (scanList.isEmpty()) {
            tvEmptyScans.setVisibility(View.VISIBLE);
            rvRecentScans.setVisibility(View.GONE);
        } else {
            tvEmptyScans.setVisibility(View.GONE);
            rvRecentScans.setVisibility(View.VISIBLE);
        }
    }

    private void checkAndRequestPermissions() {
        List<String> needed = new ArrayList<>();
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.RECEIVE_SMS) != PackageManager.PERMISSION_GRANTED) {
            needed.add(Manifest.permission.RECEIVE_SMS);
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
                needed.add(Manifest.permission.POST_NOTIFICATIONS);
            }
        }

        if (!needed.isEmpty()) {
            new AlertDialog.Builder(this)
                    .setTitle("SMS Protection Permission")
                    .setMessage("PhishGuard AI requires SMS broadcast interception to evaluate incoming messages against phishing threats in real time.\n\n" +
                            "Privacy Guarantee:\n" +
                            "• Only the message text of incoming SMS is analyzed.\n" +
                            "• Existing SMS messages in storage are NEVER read.\n" +
                            "• No personal information is stored on remote servers.")
                    .setPositiveButton("Grant Permission", (d, w) -> {
                        ActivityCompat.requestPermissions(this, needed.toArray(new String[0]), PERMISSION_REQ_SMS);
                    })
                    .setNegativeButton("Cancel", null)
                    .show();
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == PERMISSION_REQ_SMS) {
            boolean allGranted = true;
            for (int res : grantResults) {
                if (res != PackageManager.PERMISSION_GRANTED) {
                    allGranted = false;
                    break;
                }
            }
            if (allGranted) {
                Toast.makeText(this, "Permissions granted. Real-time protection active.", Toast.LENGTH_SHORT).show();
            } else {
                Toast.makeText(this, "Permissions denied. Real-time SMS interception will not function.", Toast.LENGTH_LONG).show();
            }
        }
    }

    private void registerScanBroadcastReceiver() {
        newScanReceiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                if (DetectionService.ACTION_NEW_SCAN.equals(intent.getAction())) {
                    refreshScans();
                    PredictionResponse res = (PredictionResponse) intent.getSerializableExtra(DetectionService.EXTRA_SCAN_RESULT);
                    if (res != null && res.isPhishingThreat()) {
                        displaySecurityAlert(res);
                    }
                }
            }
        };
        IntentFilter filter = new IntentFilter(DetectionService.ACTION_NEW_SCAN);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            registerReceiver(newScanReceiver, filter, Context.RECEIVER_NOT_EXPORTED);
        } else {
            registerReceiver(newScanReceiver, filter);
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (newScanReceiver != null) {
            unregisterReceiver(newScanReceiver);
        }
    }
}
