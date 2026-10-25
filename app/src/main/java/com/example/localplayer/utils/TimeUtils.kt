package com.example.localplayer.utils

import java.util.concurrent.TimeUnit

fun formatDuration(durationMs: Long): String {
    if (durationMs <= 0) return "0:00"
    val minutes = TimeUnit.MILLISECONDS.toMinutes(durationMs)
    val seconds = TimeUnit.MILLISECONDS.toSeconds(durationMs) % 60
    return String.format("%d:%02d", minutes, seconds)
}

fun formatFileSize(sizeBytes: Long): String {
    if (sizeBytes <= 0) return "0 MB"
    val mb = sizeBytes / (1024.0 * 1024.0)
    return String.format("%.1f MB", mb)
}
