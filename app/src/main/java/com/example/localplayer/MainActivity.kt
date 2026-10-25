package com.example.localplayer

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import com.example.localplayer.service.MusicControllerManager
import com.example.localplayer.ui.MainScreen
import com.example.localplayer.ui.theme.LocalPlayerTheme

class MainActivity : ComponentActivity() {

    private lateinit var musicControllerManager: MusicControllerManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        musicControllerManager = MusicControllerManager(this)
        musicControllerManager.connect()

        setContent {
            LocalPlayerTheme {
                Surface(
                    modifier = Modifier.fillMaxSize()
                ) {
                    MainScreen(musicControllerManager = musicControllerManager)
                }
            }
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        musicControllerManager.release()
    }
}
