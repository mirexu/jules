package com.example.localplayer.data

import android.content.Context
import android.content.SharedPreferences
import com.example.localplayer.model.Playlist
import org.json.JSONArray
import org.json.JSONObject

class PlaylistRepository(context: Context) {

    private val prefs: SharedPreferences = context.getSharedPreferences("playlists_prefs", Context.MODE_PRIVATE)

    fun getPlaylists(): List<Playlist> {
        val jsonString = prefs.getString("playlists", null) ?: return emptyList()
        val playlists = mutableListOf<Playlist>()
        try {
            val jsonArray = JSONArray(jsonString)
            for (i in 0 until jsonArray.length()) {
                val obj = jsonArray.getJSONObject(i)
                val id = obj.getLong("id")
                val name = obj.getString("name")
                val createdAt = obj.optLong("createdAt", System.currentTimeMillis())
                val songIdsArray = obj.getJSONArray("songIds")
                val songIds = mutableListOf<Long>()
                for (j in 0 until songIdsArray.length()) {
                    songIds.add(songIdsArray.getLong(j))
                }
                playlists.add(Playlist(id, name, songIds, createdAt))
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
        return playlists
    }

    fun savePlaylists(playlists: List<Playlist>) {
        val jsonArray = JSONArray()
        for (playlist in playlists) {
            val obj = JSONObject().apply {
                put("id", playlist.id)
                put("name", playlist.name)
                put("createdAt", playlist.createdAt)
                val songIdsArray = JSONArray()
                playlist.songIds.forEach { songIdsArray.put(it) }
                put("songIds", songIdsArray)
            }
            jsonArray.put(obj)
        }
        prefs.edit().putString("playlists", jsonArray.toString()).apply()
    }

    fun createPlaylist(name: String): Playlist {
        val current = getPlaylists().toMutableList()
        val newPlaylist = Playlist(
            id = System.currentTimeMillis(),
            name = name,
            songIds = emptyList()
        )
        current.add(newPlaylist)
        savePlaylists(current)
        return newPlaylist
    }

    fun addSongToPlaylist(playlistId: Long, songId: Long) {
        val current = getPlaylists().toMutableList()
        val index = current.indexOfFirst { it.id == playlistId }
        if (index != -1) {
            val playlist = current[index]
            if (!playlist.songIds.contains(songId)) {
                val updatedSongIds = playlist.songIds.toMutableList().apply { add(songId) }
                current[index] = playlist.copy(songIds = updatedSongIds)
                savePlaylists(current)
            }
        }
    }
}
