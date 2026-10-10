package com.phishguard.ai.adapter;

import android.graphics.Color;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.phishguard.ai.R;
import com.phishguard.ai.network.model.PredictionResponse;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

public class RecentScanAdapter extends RecyclerView.Adapter<RecentScanAdapter.ViewHolder> {

    private final List<PredictionResponse> scanList;
    private final OnItemClickListener listener;
    private final SimpleDateFormat dateFormat = new SimpleDateFormat("MMM dd, HH:mm", Locale.getDefault());

    public interface OnItemClickListener {
        void onItemClick(PredictionResponse item);
    }

    public RecentScanAdapter(List<PredictionResponse> scanList, OnItemClickListener listener) {
        this.scanList = scanList;
        this.listener = listener;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_recent_scan, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        PredictionResponse item = scanList.get(position);

        String sender = item.getSenderAddress() != null ? item.getSenderAddress() : "Incoming SMS";
        holder.tvSender.setText(sender);

        String msg = item.getMessage() != null ? item.getMessage() : "";
        holder.tvMessage.setText(msg);

        holder.tvTime.setText(dateFormat.format(new Date(item.getTimestampMs())));

        String label = item.getLabel();
        holder.tvVerdict.setText(label);

        int riskScore = item.getRiskScore();
        holder.tvRiskScore.setText(riskScore + "/100");

        // Styling based on risk level
        if ("Phishing".equalsIgnoreCase(label) || riskScore >= 60) {
            holder.tvVerdict.setTextColor(Color.parseColor("#EF4444")); // Red
            holder.tvRiskScore.setTextColor(Color.parseColor("#EF4444"));
            holder.badgeContainer.setBackgroundColor(Color.parseColor("#291212"));
        } else if ("Suspicious".equalsIgnoreCase(label) || riskScore >= 30) {
            holder.tvVerdict.setTextColor(Color.parseColor("#F59E0B")); // Amber
            holder.tvRiskScore.setTextColor(Color.parseColor("#F59E0B"));
            holder.badgeContainer.setBackgroundColor(Color.parseColor("#261B0B"));
        } else {
            holder.tvVerdict.setTextColor(Color.parseColor("#10B981")); // Emerald
            holder.tvRiskScore.setTextColor(Color.parseColor("#10B981"));
            holder.badgeContainer.setBackgroundColor(Color.parseColor("#0C2418"));
        }

        holder.itemView.setOnClickListener(v -> {
            if (listener != null) {
                listener.onItemClick(item);
            }
        });
    }

    @Override
    public int getItemCount() {
        return scanList.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        TextView tvSender, tvMessage, tvTime, tvVerdict, tvRiskScore;
        View badgeContainer;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            tvSender = itemView.findViewById(R.id.item_sender);
            tvMessage = itemView.findViewById(R.id.item_message_snippet);
            tvTime = itemView.findViewById(R.id.item_time);
            tvVerdict = itemView.findViewById(R.id.item_verdict);
            tvRiskScore = itemView.findViewById(R.id.item_risk_score);
            badgeContainer = itemView.findViewById(R.id.item_badge_container);
        }
    }
}
