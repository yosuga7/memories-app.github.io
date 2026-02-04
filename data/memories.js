// ========================================
// MEMORIES DATA STORE
// Centralized data for all memories
// ========================================

const MemoriesData = {
    // Couple Information
    couple: {
        name1: "You",
        name2: "Her",
        startDate: "2024-02-14", // When you started dating
        anniversary: "2024-02-14"
    },

    // Photo Gallery Data
    photos: [
        {
            id: 1,
            url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600",
            caption: "Our first date 💕",
            date: "2024-02-14"
        },
        {
            id: 2,
            url: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=600",
            caption: "Beach sunset together",
            date: "2024-03-20"
        },
        {
            id: 3,
            url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600",
            caption: "Coffee date morning",
            date: "2024-04-05"
        },
        {
            id: 4,
            url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600",
            caption: "Walking in the park",
            date: "2024-04-15"
        },
        {
            id: 5,
            url: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600",
            caption: "Movie night at home",
            date: "2024-05-01"
        },
        {
            id: 6,
            url: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=600",
            caption: "Romantic dinner",
            date: "2024-05-14"
        },
        {
            id: 7,
            url: "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=600",
            caption: "Flower surprise 🌸",
            date: "2024-06-01"
        },
        {
            id: 8,
            url: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=600",
            caption: "Summer vacation",
            date: "2024-07-15"
        }
    ],

    // Special Dates Data
    specialDates: [
        {
            id: 1,
            name: "Our Anniversary",
            date: "2025-02-14",
            icon: "💕",
            type: "anniversary"
        },
        {
            id: 2,
            name: "Her Birthday",
            date: "2025-06-15",
            icon: "🎂",
            type: "birthday"
        },
        {
            id: 3,
            name: "First Kiss",
            date: "2024-03-01",
            icon: "💋",
            type: "milestone"
        },
        {
            id: 4,
            name: "Valentine's Day",
            date: "2025-02-14",
            icon: "❤️",
            type: "holiday"
        }
    ],

    // Music Playlist Data
    songs: [
        {
            id: 1,
            title: "Perfect",
            artist: "Ed Sheeran",
            cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300",
            duration: "4:23",
            embedUrl: "https://open.spotify.com/embed/track/0tgVpDi06FyKpA1z0VMD4v"
        },
        {
            id: 2,
            title: "All of Me",
            artist: "John Legend",
            cover: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300",
            duration: "4:29",
            embedUrl: "https://open.spotify.com/embed/track/3U4isOIWM3VvDubwSI3y7a"
        },
        {
            id: 3,
            title: "Thinking Out Loud",
            artist: "Ed Sheeran",
            cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300",
            duration: "4:41",
            embedUrl: "https://open.spotify.com/embed/track/34gCuhDGsG4bRPIf9bb02f"
        },
        {
            id: 4,
            title: "A Thousand Years",
            artist: "Christina Perri",
            cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300",
            duration: "4:45",
            embedUrl: "https://open.spotify.com/embed/track/6lanRgr6wXibZr8KgzXxBl"
        },
        {
            id: 5,
            title: "Can't Help Falling in Love",
            artist: "Elvis Presley",
            cover: "https://images.unsplash.com/photo-1485579149621-3123dd979885?w=300",
            duration: "3:00",
            embedUrl: "https://open.spotify.com/embed/track/44AyOl4qVkzS48vBsbNXaC"
        }
    ],

    // Locations Data (for Interactive Map)
    locations: [
        {
            id: 1,
            name: "Our First Date",
            lat: 10.7769,
            lng: 106.7009,
            description: "The café where it all started ☕",
            date: "2024-02-14",
            icon: "💕"
        },
        {
            id: 2,
            name: "Beach Sunset",
            lat: 10.3460,
            lng: 107.0843,
            description: "Watching the sunset together 🌅",
            date: "2024-03-20",
            icon: "🏖️"
        },
        {
            id: 3,
            name: "Mountain Trip",
            lat: 11.9404,
            lng: 108.4583,
            description: "Our hiking adventure 🏔️",
            date: "2024-05-10",
            icon: "⛰️"
        },
        {
            id: 4,
            name: "Favorite Restaurant",
            lat: 10.7867,
            lng: 106.6750,
            description: "Where we always celebrate 🍽️",
            date: "2024-04-15",
            icon: "🍝"
        },
        {
            id: 5,
            name: "Movie Theater",
            lat: 10.7725,
            lng: 106.6980,
            description: "Our movie date spot 🎬",
            date: "2024-06-20",
            icon: "🎬"
        }
    ],

    // Admin credentials (in real app, use proper auth)
    admin: {
        username: "admin",
        password: "love123"
    }
};

// ========================================
// DATA MANAGEMENT FUNCTIONS
// ========================================

// Initialize data from localStorage or use defaults
function initializeData() {
    const savedData = localStorage.getItem('memoriesData');
    if (savedData) {
        const parsed = JSON.parse(savedData);
        Object.assign(MemoriesData, parsed);
    }
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('memoriesData', JSON.stringify(MemoriesData));
}

// Get all photos
function getPhotos() {
    return MemoriesData.photos;
}

// Add a photo
function addPhoto(photo) {
    photo.id = Date.now();
    MemoriesData.photos.push(photo);
    saveData();
    return photo;
}

// Update a photo
function updatePhoto(id, updates) {
    const index = MemoriesData.photos.findIndex(p => p.id === id);
    if (index !== -1) {
        MemoriesData.photos[index] = { ...MemoriesData.photos[index], ...updates };
        saveData();
        return MemoriesData.photos[index];
    }
    return null;
}

// Delete a photo
function deletePhoto(id) {
    MemoriesData.photos = MemoriesData.photos.filter(p => p.id !== id);
    saveData();
}

// Get all special dates
function getSpecialDates() {
    return MemoriesData.specialDates;
}

// Add a special date
function addSpecialDate(date) {
    date.id = Date.now();
    MemoriesData.specialDates.push(date);
    saveData();
    return date;
}

// Update a special date
function updateSpecialDate(id, updates) {
    const index = MemoriesData.specialDates.findIndex(d => d.id === id);
    if (index !== -1) {
        MemoriesData.specialDates[index] = { ...MemoriesData.specialDates[index], ...updates };
        saveData();
        return MemoriesData.specialDates[index];
    }
    return null;
}

// Delete a special date
function deleteSpecialDate(id) {
    MemoriesData.specialDates = MemoriesData.specialDates.filter(d => d.id !== id);
    saveData();
}

// Get all songs
function getSongs() {
    return MemoriesData.songs;
}

// Add a song
function addSong(song) {
    song.id = Date.now();
    MemoriesData.songs.push(song);
    saveData();
    return song;
}

// Update a song
function updateSong(id, updates) {
    const index = MemoriesData.songs.findIndex(s => s.id === id);
    if (index !== -1) {
        MemoriesData.songs[index] = { ...MemoriesData.songs[index], ...updates };
        saveData();
        return MemoriesData.songs[index];
    }
    return null;
}

// Delete a song
function deleteSong(id) {
    MemoriesData.songs = MemoriesData.songs.filter(s => s.id !== id);
    saveData();
}

// Get all locations
function getLocations() {
    return MemoriesData.locations;
}

// Add a location
function addLocation(location) {
    location.id = Date.now();
    MemoriesData.locations.push(location);
    saveData();
    return location;
}

// Update a location
function updateLocation(id, updates) {
    const index = MemoriesData.locations.findIndex(l => l.id === id);
    if (index !== -1) {
        MemoriesData.locations[index] = { ...MemoriesData.locations[index], ...updates };
        saveData();
        return MemoriesData.locations[index];
    }
    return null;
}

// Delete a location
function deleteLocation(id) {
    MemoriesData.locations = MemoriesData.locations.filter(l => l.id !== id);
    saveData();
}

// Get couple info
function getCoupleInfo() {
    return MemoriesData.couple;
}

// Update couple info
function updateCoupleInfo(updates) {
    MemoriesData.couple = { ...MemoriesData.couple, ...updates };
    saveData();
    return MemoriesData.couple;
}

// Calculate days together
function getDaysTogether() {
    const startDate = new Date(MemoriesData.couple.startDate);
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

// Initialize on load
initializeData();
