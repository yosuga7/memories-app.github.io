// ========================================
// ADMIN DASHBOARD JAVASCRIPT
// CRUD operations for all content types
// ========================================

let currentPhotoBase64 = null;

document.addEventListener('DOMContentLoaded', function () {
    // Check authentication
    if (!isLoggedIn()) {
        window.location.href = 'admin.html';
        return;
    }

    initTabs();
    loadAllData();
    initForms();
    loadSettings();
});

// Initialize tab navigation
function initTabs() {
    const tabs = document.querySelectorAll('.dashboard-tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const targetPanel = this.dataset.tab;

            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Update active panel
            document.querySelectorAll('.dashboard-panel').forEach(panel => {
                panel.classList.remove('active');
            });
            document.getElementById(`${targetPanel}-panel`).classList.add('active');
        });
    });
}

// Load all data
function loadAllData() {
    loadPhotosList();
    loadDatesList();
    loadSongsList();
    loadLocationsList();
}

// ========================================
// PHOTOS CRUD
// ========================================

function loadPhotosList() {
    const container = document.getElementById('photosList');
    const photos = getPhotos();

    if (photos.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">No photos yet. Add your first memory!</p>';
        return;
    }

    container.innerHTML = photos.map(photo => `
    <div class="item-card">
      <img class="item-card-image" src="${photo.url}" alt="${photo.caption}">
      <div class="item-card-info">
        <h4>${photo.caption}</h4>
        <p>${formatDate(photo.date)}</p>
      </div>
      <div class="item-card-actions">
        <button class="btn btn-sm btn-secondary" onclick="editPhoto(${photo.id})">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="confirmDeletePhoto(${photo.id})">Delete</button>
      </div>
    </div>
  `).join('');
}

function editPhoto(id) {
    const photo = getPhotos().find(p => p.id === id);
    if (!photo) return;

    document.getElementById('photoModalTitle').textContent = 'Edit Photo';
    document.getElementById('photoId').value = id;
    document.getElementById('photoUrl').value = photo.url;
    document.getElementById('photoCaption').value = photo.caption;
    document.getElementById('photoDate').value = photo.date;

    openModal('photo');
}

function confirmDeletePhoto(id) {
    if (confirm('Are you sure you want to delete this photo?')) {
        deletePhoto(id);
        loadPhotosList();
        showToast('Photo deleted successfully');
    }
}

// ========================================
// DATES CRUD
// ========================================

function loadDatesList() {
    const container = document.getElementById('datesList');
    const dates = getSpecialDates();

    if (dates.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">No special dates yet. Add your first one!</p>';
        return;
    }

    container.innerHTML = dates.map(date => `
    <div class="item-card">
      <div style="font-size: 2rem; width: 80px; text-align: center;">${date.icon}</div>
      <div class="item-card-info">
        <h4>${date.name}</h4>
        <p>${formatDate(date.date)} • ${date.type}</p>
      </div>
      <div class="item-card-actions">
        <button class="btn btn-sm btn-secondary" onclick="editDate(${date.id})">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="confirmDeleteDate(${date.id})">Delete</button>
      </div>
    </div>
  `).join('');
}

function editDate(id) {
    const date = getSpecialDates().find(d => d.id === id);
    if (!date) return;

    document.getElementById('dateModalTitle').textContent = 'Edit Special Date';
    document.getElementById('dateId').value = id;
    document.getElementById('dateName').value = date.name;
    document.getElementById('dateDate').value = date.date;
    document.getElementById('dateIcon').value = date.icon;
    document.getElementById('dateType').value = date.type;

    openModal('date');
}

function confirmDeleteDate(id) {
    if (confirm('Are you sure you want to delete this special date?')) {
        deleteSpecialDate(id);
        loadDatesList();
        showToast('Special date deleted successfully');
    }
}

// ========================================
// SONGS CRUD
// ========================================

function loadSongsList() {
    const container = document.getElementById('songsList');
    const songs = getSongs();

    if (songs.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">No songs yet. Add your first one!</p>';
        return;
    }

    container.innerHTML = songs.map(song => `
    <div class="item-card">
      <img class="item-card-image" src="${song.cover || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100'}" alt="${song.title}">
      <div class="item-card-info">
        <h4>${song.title}</h4>
        <p>${song.artist} • ${song.duration}</p>
      </div>
      <div class="item-card-actions">
        <button class="btn btn-sm btn-secondary" onclick="editSong(${song.id})">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="confirmDeleteSong(${song.id})">Delete</button>
      </div>
    </div>
  `).join('');
}

function editSong(id) {
    const song = getSongs().find(s => s.id === id);
    if (!song) return;

    document.getElementById('songModalTitle').textContent = 'Edit Song';
    document.getElementById('songId').value = id;
    document.getElementById('songTitle').value = song.title;
    document.getElementById('songArtist').value = song.artist;
    document.getElementById('songCover').value = song.cover || '';
    document.getElementById('songDuration').value = song.duration;
    document.getElementById('songEmbed').value = song.embedUrl || '';

    openModal('song');
}

function confirmDeleteSong(id) {
    if (confirm('Are you sure you want to delete this song?')) {
        deleteSong(id);
        loadSongsList();
        showToast('Song deleted successfully');
    }
}

// ========================================
// LOCATIONS CRUD
// ========================================

function loadLocationsList() {
    const container = document.getElementById('locationsList');
    const locations = getLocations();

    if (locations.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">No locations yet. Add your first place!</p>';
        return;
    }

    container.innerHTML = locations.map(location => `
    <div class="item-card">
      <div style="font-size: 2rem; width: 80px; text-align: center;">${location.icon}</div>
      <div class="item-card-info">
        <h4>${location.name}</h4>
        <p>${location.description}</p>
        <small style="color: var(--text-light);">${formatDate(location.date)}</small>
      </div>
      <div class="item-card-actions">
        <button class="btn btn-sm btn-secondary" onclick="editLocation(${location.id})">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="confirmDeleteLocation(${location.id})">Delete</button>
      </div>
    </div>
  `).join('');
}

function editLocation(id) {
    const location = getLocations().find(l => l.id === id);
    if (!location) return;

    document.getElementById('locationModalTitle').textContent = 'Edit Location';
    document.getElementById('locationId').value = id;
    document.getElementById('locationName').value = location.name;
    document.getElementById('locationDescription').value = location.description;
    document.getElementById('locationLat').value = location.lat;
    document.getElementById('locationLng').value = location.lng;
    document.getElementById('locationDate').value = location.date;
    document.getElementById('locationIcon').value = location.icon;

    openModal('location');
}

function confirmDeleteLocation(id) {
    if (confirm('Are you sure you want to delete this location?')) {
        deleteLocation(id);
        loadLocationsList();
        showToast('Location deleted successfully');
    }
}

// ========================================
// SETTINGS
// ========================================

function loadSettings() {
    const couple = getCoupleInfo();

    document.getElementById('name1').value = couple.name1 || '';
    document.getElementById('name2').value = couple.name2 || '';
    document.getElementById('startDate').value = couple.startDate || '';
    document.getElementById('anniversary').value = couple.anniversary || '';
}

// ========================================
// FORMS
// ========================================

function initForms() {
    // Photo Form
    const photoFile = document.getElementById('photoFile');
    if (photoFile) {
        photoFile.addEventListener('change', handleFileSelect);
    }

    document.getElementById('photoForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const photoType = document.querySelector('input[name="photoType"]:checked').value;
        let url = document.getElementById('photoUrl').value;

        // Use uploaded file if selected
        if (photoType === 'file' && currentPhotoBase64) {
            url = currentPhotoBase64;
        } else if (photoType === 'file' && !currentPhotoBase64 && !document.getElementById('photoId').value) {
            showToast('Please select a photo', 'error');
            return;
        }

        const id = document.getElementById('photoId').value;
        const data = {
            url: url,
            caption: document.getElementById('photoCaption').value,
            date: document.getElementById('photoDate').value
        };

        if (id) {
            // If editing and no new file selected, preserve existing URL
            if (photoType === 'file' && !currentPhotoBase64) {
                // Keep original URL (handled by not updating if undefined, but here we need logic)
                // Actually, retrieve existing photo to check?
                const existing = getPhotos().find(p => p.id === parseInt(id));
                if (existing) data.url = existing.url;
            }

            updatePhoto(parseInt(id), data);
            showToast('Photo updated successfully');
        } else {
            addPhoto(data);
            showToast('Photo added successfully');
        }

        closeModal('photo');
        loadPhotosList();

        // Reset
        currentPhotoBase64 = null;
        document.getElementById('photoPreview').style.display = 'none';
        document.getElementById('photoFile').value = '';
    });

    // Date Form
    document.getElementById('dateForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const id = document.getElementById('dateId').value;
        const data = {
            name: document.getElementById('dateName').value,
            date: document.getElementById('dateDate').value,
            icon: document.getElementById('dateIcon').value || '💕',
            type: document.getElementById('dateType').value
        };

        if (id) {
            updateSpecialDate(parseInt(id), data);
            showToast('Special date updated successfully');
        } else {
            addSpecialDate(data);
            showToast('Special date added successfully');
        }

        closeModal('date');
        loadDatesList();
    });

    // Song Form
    document.getElementById('songForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const id = document.getElementById('songId').value;
        const data = {
            title: document.getElementById('songTitle').value,
            artist: document.getElementById('songArtist').value,
            cover: document.getElementById('songCover').value || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300',
            duration: document.getElementById('songDuration').value || '0:00',
            embedUrl: document.getElementById('songEmbed').value
        };

        if (id) {
            updateSong(parseInt(id), data);
            showToast('Song updated successfully');
        } else {
            addSong(data);
            showToast('Song added successfully');
        }

        closeModal('song');
        loadSongsList();
    });

    // Location Form
    document.getElementById('locationForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const id = document.getElementById('locationId').value;
        const data = {
            name: document.getElementById('locationName').value,
            description: document.getElementById('locationDescription').value,
            lat: parseFloat(document.getElementById('locationLat').value),
            lng: parseFloat(document.getElementById('locationLng').value),
            date: document.getElementById('locationDate').value,
            icon: document.getElementById('locationIcon').value || '📍'
        };

        if (id) {
            updateLocation(parseInt(id), data);
            showToast('Location updated successfully');
        } else {
            addLocation(data);
            showToast('Location added successfully');
        }

        closeModal('location');
        loadLocationsList();
    });

    // Settings Form
    document.getElementById('settingsForm').addEventListener('submit', function (e) {
        e.preventDefault();

        updateCoupleInfo({
            name1: document.getElementById('name1').value,
            name2: document.getElementById('name2').value,
            startDate: document.getElementById('startDate').value,
            anniversary: document.getElementById('anniversary').value
        });

        showToast('Settings saved successfully');
    });

    // Password Form
    document.getElementById('passwordForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const newPassword = document.getElementById('newPassword').value;
        if (newPassword.length < 4) {
            showToast('Password must be at least 4 characters', 'error');
            return;
        }

        MemoriesData.admin.password = newPassword;
        saveData();
        document.getElementById('newPassword').value = '';
        showToast('Password changed successfully');
    });
}

// ========================================
// MODAL FUNCTIONS
// ========================================

function openModal(type) {
    const modal = document.getElementById(`${type}Modal`);
    if (!modal) return;

    // Reset form if adding new
    if (type === 'photo' && !document.getElementById('photoId').value) {
        document.getElementById('photoModalTitle').textContent = 'Add Photo';
        document.getElementById('photoForm').reset();
    }
    if (type === 'date' && !document.getElementById('dateId').value) {
        document.getElementById('dateModalTitle').textContent = 'Add Special Date';
        document.getElementById('dateForm').reset();
    }
    if (type === 'song' && !document.getElementById('songId').value) {
        document.getElementById('songModalTitle').textContent = 'Add Song';
        document.getElementById('songForm').reset();
    }
    if (type === 'location' && !document.getElementById('locationId').value) {
        document.getElementById('locationModalTitle').textContent = 'Add Location';
        document.getElementById('locationForm').reset();
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(type) {
    const modal = document.getElementById(`${type}Modal`);
    if (!modal) return;

    modal.classList.remove('active');
    document.body.style.overflow = '';

    // Clear hidden ID fields
    document.getElementById(`${type}Id`).value = '';
}

// Close modal on background click
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('modal')) {
        const type = e.target.id.replace('Modal', '');
        closeModal(type);
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            const type = modal.id.replace('Modal', '');
            closeModal(type);
        });
    }
});

// ========================================
// FILE UPLOAD HELPERS
// ========================================

// Toggle between URL and File input
function togglePhotoInput(type) {
    const urlGroup = document.getElementById('photoUrlGroup');
    const fileGroup = document.getElementById('photoFileGroup');

    if (type === 'url') {
        urlGroup.style.display = 'block';
        fileGroup.style.display = 'none';
        currentPhotoBase64 = null;
    } else {
        urlGroup.style.display = 'none';
        fileGroup.style.display = 'block';
    }
}

// Handle file selection
function handleFileSelect(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
        showToast('Please select an image file', 'error');
        return;
    }

    // Preview
    const reader = new FileReader();
    reader.onload = function (e) {
        const preview = document.getElementById('photoPreview');
        preview.style.display = 'block';
        preview.querySelector('img').src = e.target.result;
    };
    reader.readAsDataURL(file);

    // Compress and store
    showToast('Compressing image...', 'info');
    compressImage(file, 0.5, function (base64) {
        currentPhotoBase64 = base64;
        showToast('Image ready for upload');
    });
}

// Compress image to avoid localStorage limits
function compressImage(file, maxSizeMB, callback) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (event) {
        const img = new Image();
        img.src = event.target.result;
        img.onload = function () {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            // Resize if too large (max 1200px width)
            const MAX_WIDTH = 1200;
            if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
            }

            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            // Start with quality 0.7
            let quality = 0.7;
            let dataUrl = canvas.toDataURL('image/jpeg', quality);

            // Reduce quality if still too large (approximate check)
            while (dataUrl.length > maxSizeMB * 1024 * 1024 && quality > 0.1) {
                quality -= 0.1;
                dataUrl = canvas.toDataURL('image/jpeg', quality);
            }

            callback(dataUrl);
        };
    };
}
