// ========================================
// MUSIC JAVASCRIPT
// Music player with YouTube embed support
// ========================================

let songs = [];
let currentSongIndex = 0;
let isPlaying = false;
let youtubePlayer = null;

document.addEventListener('DOMContentLoaded', function () {
    loadPlaylist();
    initMusicControls();
});

// Load playlist
function loadPlaylist() {
    const container = document.getElementById('playlistItems');
    const emptyState = document.getElementById('emptyPlaylist');

    if (!container) return;

    songs = getSongs();

    if (songs.length === 0) {
        document.querySelector('.music-player').style.display = 'none';
        document.querySelector('.playlist').style.display = 'none';
        if (emptyState) emptyState.style.display = 'block';
        return;
    }

    container.innerHTML = '';

    songs.forEach((song, index) => {
        const item = document.createElement('div');
        item.className = 'playlist-item';
        item.dataset.index = index;
        item.innerHTML = `
      <img class="playlist-item-cover" src="${song.cover}" alt="${song.title}">
      <div class="playlist-item-info">
        <h4>${song.title}</h4>
        <p>${song.artist}</p>
      </div>
      <span class="playlist-item-duration">${song.duration}</span>
    `;
        item.addEventListener('click', () => playSong(index));
        container.appendChild(item);
    });

    // Select first song but don't autoplay
    updateNowPlaying(0);

    // Show the embed player for the first song
    showEmbedPlayer(0);
}

// Show embed player (Spotify or YouTube)
function showEmbedPlayer(index) {
    const song = songs[index];
    if (!song) return;

    const embedContainer = document.getElementById('embedPlayer');
    if (!embedContainer) return;

    // Check if it's a Spotify embed
    if (song.embedUrl && song.embedUrl.includes('spotify')) {
        embedContainer.innerHTML = `
      <iframe 
        style="border-radius: 12px;" 
        src="${song.embedUrl}?utm_source=generator&theme=0" 
        width="100%" 
        height="152" 
        frameBorder="0" 
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
        loading="lazy">
      </iframe>
      <p style="text-align: center; margin-top: 0.5rem; color: var(--text-secondary); font-size: 0.9rem;">
        ▲ Click play on the Spotify player above to listen
      </p>
    `;
        embedContainer.style.display = 'block';
    }
    // Check if it's a YouTube embed
    else if (song.embedUrl && (song.embedUrl.includes('youtube') || song.embedUrl.includes('youtu.be'))) {
        const videoId = extractYouTubeId(song.embedUrl);
        if (videoId) {
            embedContainer.innerHTML = `
        <iframe 
          width="100%" 
          height="200" 
          src="https://www.youtube.com/embed/${videoId}?autoplay=0" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen
          style="border-radius: 12px;">
        </iframe>
        <p style="text-align: center; margin-top: 0.5rem; color: var(--text-secondary); font-size: 0.9rem;">
          ▲ Click play on the YouTube player above to listen
        </p>
      `;
            embedContainer.style.display = 'block';
        }
    }
    // If no embed URL, show a message
    else {
        embedContainer.innerHTML = `
      <div style="text-align: center; padding: 1rem; background: rgba(255,182,193,0.2); border-radius: 12px;">
        <p style="margin: 0; color: var(--text-secondary);">
          🎵 No music link provided for this song.<br>
          <small>Add a Spotify or YouTube URL in the admin panel!</small>
        </p>
      </div>
    `;
        embedContainer.style.display = 'block';
    }
}

// Extract YouTube video ID from URL
function extractYouTubeId(url) {
    if (!url) return null;

    // Handle various YouTube URL formats
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\?\/]+)/,
        /youtube\.com\/v\/([^&\?\/]+)/
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
    }

    return null;
}

// Initialize music controls
function initMusicControls() {
    const playBtn = document.getElementById('playBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (playBtn) {
        playBtn.addEventListener('click', togglePlay);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', playPrev);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', playNext);
    }
}

// Play specific song
function playSong(index) {
    currentSongIndex = index;
    updateNowPlaying(index);
    showEmbedPlayer(index);

    isPlaying = true;
    updatePlayButton();
}

// Update now playing display
function updateNowPlaying(index) {
    const song = songs[index];
    if (!song) return;

    document.getElementById('nowPlayingCover').src = song.cover;
    document.getElementById('nowPlayingTitle').textContent = song.title;
    document.getElementById('nowPlayingArtist').textContent = song.artist;
    document.getElementById('duration').textContent = song.duration;

    // Update active state in playlist
    document.querySelectorAll('.playlist-item').forEach((item, i) => {
        if (i === index) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Toggle play/pause (visual feedback)
function togglePlay() {
    isPlaying = !isPlaying;
    updatePlayButton();

    // Scroll to embed player to help user find the actual play button
    const embedPlayer = document.getElementById('embedPlayer');
    if (embedPlayer && isPlaying) {
        embedPlayer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Update play button icon
function updatePlayButton() {
    const playBtn = document.getElementById('playBtn');
    if (playBtn) {
        playBtn.textContent = isPlaying ? '⏸' : '▶';
    }
}

// Play previous song
function playPrev() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(currentSongIndex);
}

// Play next song
function playNext() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(currentSongIndex);
}

// Format time helper
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}
