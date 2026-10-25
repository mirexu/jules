package com.example.localplayer.data

import com.example.localplayer.model.Playlist
import org.junit.Assert.*
import org.junit.Test

class ModelTest {

    @Test
    fun testPlaylistModel() {
        val playlist = Playlist(
            id = 100L,
            name = "My Favorites",
            songIds = listOf(1L, 2L, 3L)
        )
        assertEquals(100L, playlist.id)
        assertEquals("My Favorites", playlist.name)
        assertEquals(3, playlist.songIds.size)
    }
}
