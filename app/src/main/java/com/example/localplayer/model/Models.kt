package com.example.localplayer.model

import android.net.Uri
import android.os.Parcelable
import kotlinx.parcelize.Parcelize

@Parcelize
data class Song(
    val id: Long,
    val title: String,
    val artist: String,
    val album: String,
    val albumId: Long,
    val duration: Long,
    val contentUri: String,
    val albumArtUri: String?,
    val folderName: String,
    val size: Long
) : Parcelable

data class Album(
    val id: Long,
    val name: String,
    val artist: String,
    val songCount: Int,
    val albumArtUri: String?
)

data class Artist(
    val name: String,
    val songCount: Int,
    val albumsCount: Int
)

data class Folder(
    val name: String,
    val songCount: Int,
    val path: String
)

data class Playlist(
    val id: Long,
    val name: String,
    val songIds: List<Long>,
    val createdAt: Long = System.currentTimeMillis()
)
