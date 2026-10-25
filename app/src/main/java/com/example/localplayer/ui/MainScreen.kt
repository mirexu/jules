package com.example.localplayer.ui

import android.Manifest
import android.content.pm.PackageManager
import android.os.Build
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.PlaylistPlay
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.core.content.ContextCompat
import com.example.localplayer.data.MediaRepository
import com.example.localplayer.data.PlaylistRepository
import com.example.localplayer.model.Album
import com.example.localplayer.model.Artist
import com.example.localplayer.model.Folder
import com.example.localplayer.model.Playlist
import com.example.localplayer.model.Song
import com.example.localplayer.service.MusicControllerManager
import com.example.localplayer.ui.components.FullScreenPlayerSheet
import com.example.localplayer.ui.components.MiniPlayer
import com.example.localplayer.ui.screens.*
import kotlinx.coroutines.launch

enum class MainTab(val title: String, val icon: ImageVector) {
    SONGS("Songs", Icons.Default.MusicNote),
    ALBUMS("Albums", Icons.Default.Album),
    ARTISTS("Artists", Icons.Default.Person),
    PLAYLISTS("Playlists", Icons.AutoMirrored.Filled.PlaylistPlay),
    FOLDERS("Folders", Icons.Default.Folder),
    SETTINGS("Settings", Icons.Default.Settings)
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MainScreen(
    musicControllerManager: MusicControllerManager
) {
    val context = LocalContext.current
    val scope = rememberCoroutineScope()
    val mediaRepository = remember { MediaRepository(context) }
    val playlistRepository = remember { PlaylistRepository(context) }

    var selectedTab by remember { mutableStateOf(MainTab.SONGS) }
    var songs by remember { mutableStateOf<List<Song>>(emptyList()) }
    var filteredSongs by remember { mutableStateOf<List<Song>>(emptyList()) }
    var albums by remember { mutableStateOf<List<Album>>(emptyList()) }
    var artists by remember { mutableStateOf<List<Artist>>(emptyList()) }
    var folders by remember { mutableStateOf<List<Folder>>(emptyList()) }
    var playlists by remember { mutableStateOf<List<Playlist>>(emptyList()) }

    var searchQuery by remember { mutableStateOf("") }
    var isSearchActive by remember { mutableStateOf(false) }
    var isPlayerSheetVisible by remember { mutableStateOf(false) }
    var showCreatePlaylistDialog by remember { mutableStateOf(false) }
    var newPlaylistName by remember { mutableStateOf("") }

    val uiState by musicControllerManager.uiState.collectAsState()

    // Permission check & request
    val permissionsToRequest = remember {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            arrayOf(
                Manifest.permission.READ_MEDIA_AUDIO,
                Manifest.permission.POST_NOTIFICATIONS
            )
        } else {
            arrayOf(Manifest.permission.READ_EXTERNAL_STORAGE)
        }
    }

    var hasPermission by remember {
        mutableStateOf(
            permissionsToRequest.all {
                ContextCompat.checkSelfPermission(context, it) == PackageManager.PERMISSION_GRANTED
            }
        )
    }

    val launcher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.RequestMultiplePermissions()
    ) { results ->
        if (results.values.any { it }) {
            hasPermission = true
        }
    }

    val loadMedia = {
        scope.launch {
            val loadedSongs = mediaRepository.getAllSongs()
            songs = loadedSongs
            filteredSongs = loadedSongs
            albums = mediaRepository.getAlbums(loadedSongs)
            artists = mediaRepository.getArtists(loadedSongs)
            folders = mediaRepository.getFolders(loadedSongs)
            playlists = playlistRepository.getPlaylists()
        }
    }

    LaunchedEffect(hasPermission) {
        if (hasPermission) {
            loadMedia()
        }
    }

    // Filter songs when search query changes
    LaunchedEffect(searchQuery, songs) {
        filteredSongs = if (searchQuery.isBlank()) {
            songs
        } else {
            songs.filter {
                it.title.contains(searchQuery, ignoreCase = true) ||
                        it.artist.contains(searchQuery, ignoreCase = true) ||
                        it.album.contains(searchQuery, ignoreCase = true)
            }
        }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    if (isSearchActive) {
                        TextField(
                            value = searchQuery,
                            onValueChange = { searchQuery = it },
                            placeholder = { Text("Search songs, artists...") },
                            singleLine = true,
                            colors = TextFieldDefaults.colors(
                                focusedContainerColor = MaterialTheme.colorScheme.surface,
                                unfocusedContainerColor = MaterialTheme.colorScheme.surface
                            ),
                            modifier = Modifier.fillMaxWidth()
                        )
                    } else {
                        Text(
                            text = "Local Player",
                            style = MaterialTheme.typography.titleLarge
                        )
                    }
                },
                actions = {
                    IconButton(onClick = {
                        isSearchActive = !isSearchActive
                        if (!isSearchActive) searchQuery = ""
                    }) {
                        Icon(
                            imageVector = if (isSearchActive) Icons.Default.Close else Icons.Default.Search,
                            contentDescription = "Search"
                        )
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.surfaceContainer
                )
            )
        },
        bottomBar = {
            Column {
                // Mini Player if a song is loaded
                uiState.currentSong?.let { song ->
                    val effectiveDuration = if (uiState.duration > 0) uiState.duration else song.duration
                    val progressFraction = if (effectiveDuration > 0) {
                        uiState.currentPosition.toFloat() / effectiveDuration.toFloat()
                    } else 0f

                    MiniPlayer(
                        song = song,
                        isPlaying = uiState.isPlaying,
                        progressFraction = progressFraction,
                        onPlayPauseToggle = { musicControllerManager.togglePlayPause() },
                        onSkipNext = { musicControllerManager.skipToNext() },
                        onClick = { isPlayerSheetVisible = true }
                    )
                }

                // Material 3 NavigationBar
                NavigationBar {
                    MainTab.entries.forEach { tab ->
                        NavigationBarItem(
                            icon = { Icon(imageVector = tab.icon, contentDescription = tab.title) },
                            label = { Text(tab.title, maxLines = 1, overflow = TextOverflow.Ellipsis) },
                            selected = selectedTab == tab,
                            onClick = { selectedTab = tab }
                        )
                    }
                }
            }
        }
    ) { innerPadding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
        ) {
            if (!hasPermission) {
                // Permission Request View
                Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(24.dp),
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.Center
                ) {
                    Icon(
                        imageVector = Icons.Default.Security,
                        contentDescription = null,
                        modifier = Modifier.size(64.dp),
                        tint = MaterialTheme.colorScheme.primary
                    )
                    Spacer(modifier = Modifier.height(16.dp))
                    Text(
                        text = "Storage Permission Required",
                        style = MaterialTheme.typography.titleLarge
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = "Local Player requires access to audio files on your device to scan and play your music library.",
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                    Spacer(modifier = Modifier.height(24.dp))
                    Button(onClick = { launcher.launch(permissionsToRequest) }) {
                        Text("Grant Permission")
                    }
                }
            } else {
                when (selectedTab) {
                    MainTab.SONGS -> SongsScreen(
                        songs = filteredSongs,
                        currentSong = uiState.currentSong,
                        onSongClick = { index ->
                            musicControllerManager.playSongs(filteredSongs, index)
                        },
                        onPlayAllClick = {
                            if (filteredSongs.isNotEmpty()) {
                                musicControllerManager.playSongs(filteredSongs, 0)
                            }
                        },
                        onShuffleAllClick = {
                            if (filteredSongs.isNotEmpty()) {
                                val shuffled = filteredSongs.shuffled()
                                musicControllerManager.playSongs(shuffled, 0)
                            }
                        }
                    )
                    MainTab.ALBUMS -> AlbumsScreen(
                        albums = albums,
                        onAlbumClick = { album ->
                            val albumSongs = songs.filter { it.albumId == album.id }
                            if (albumSongs.isNotEmpty()) {
                                musicControllerManager.playSongs(albumSongs, 0)
                            }
                        }
                    )
                    MainTab.ARTISTS -> ArtistsScreen(
                        artists = artists,
                        onArtistClick = { artist ->
                            val artistSongs = songs.filter { it.artist == artist.name }
                            if (artistSongs.isNotEmpty()) {
                                musicControllerManager.playSongs(artistSongs, 0)
                            }
                        }
                    )
                    MainTab.PLAYLISTS -> PlaylistsScreen(
                        playlists = playlists,
                        onCreatePlaylistClick = { showCreatePlaylistDialog = true },
                        onPlaylistClick = { playlist ->
                            val playlistSongs = songs.filter { playlist.songIds.contains(it.id) }
                            if (playlistSongs.isNotEmpty()) {
                                musicControllerManager.playSongs(playlistSongs, 0)
                            }
                        }
                    )
                    MainTab.FOLDERS -> FoldersScreen(
                        folders = folders,
                        onFolderClick = { folder ->
                            val folderSongs = songs.filter { it.folderName == folder.name }
                            if (folderSongs.isNotEmpty()) {
                                musicControllerManager.playSongs(folderSongs, 0)
                            }
                        }
                    )
                    MainTab.SETTINGS -> SettingsScreen()
                }
            }
        }
    }

    // Fullscreen Player Bottom Sheet
    if (isPlayerSheetVisible && uiState.currentSong != null) {
        FullScreenPlayerSheet(
            song = uiState.currentSong!!,
            isPlaying = uiState.isPlaying,
            currentPosition = uiState.currentPosition,
            duration = uiState.duration,
            isShuffleEnabled = uiState.isShuffleEnabled,
            repeatMode = uiState.repeatMode,
            onPlayPauseToggle = { musicControllerManager.togglePlayPause() },
            onSkipNext = { musicControllerManager.skipToNext() },
            onSkipPrevious = { musicControllerManager.skipToPrevious() },
            onSeekTo = { musicControllerManager.seekTo(it) },
            onToggleShuffle = { musicControllerManager.toggleShuffle() },
            onToggleRepeat = { musicControllerManager.toggleRepeatMode() },
            onDismiss = { isPlayerSheetVisible = false }
        )
    }

    // Create Playlist Dialog
    if (showCreatePlaylistDialog) {
        AlertDialog(
            onDismissRequest = { showCreatePlaylistDialog = false },
            title = { Text("Create Playlist") },
            text = {
                OutlinedTextField(
                    value = newPlaylistName,
                    onValueChange = { newPlaylistName = it },
                    label = { Text("Playlist Name") },
                    singleLine = true
                )
            },
            confirmButton = {
                TextButton(
                    onClick = {
                        if (newPlaylistName.isNotBlank()) {
                            playlistRepository.createPlaylist(newPlaylistName.trim())
                            playlists = playlistRepository.getPlaylists()
                            newPlaylistName = ""
                            showCreatePlaylistDialog = false
                        }
                    }
                ) {
                    Text("Create")
                }
            },
            dismissButton = {
                TextButton(onClick = { showCreatePlaylistDialog = false }) {
                    Text("Cancel")
                }
            }
        )
    }
}
