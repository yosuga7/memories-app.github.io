// ========================================
// MAP JAVASCRIPT
// Interactive map with Leaflet.js
// ========================================

let map;
let markers = [];
let locations = [];

document.addEventListener('DOMContentLoaded', function () {
    initMap();
    loadLocations();
});

// Initialize map
function initMap() {
    // Default center (Ho Chi Minh City, Vietnam)
    const defaultCenter = [10.7769, 106.7009];

    map = L.map('map', {
        center: defaultCenter,
        zoom: 11,
        zoomControl: true
    });

    // Add beautiful tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);

    // Alternative: Use a romantic/pastel styled map (Stamen Watercolor)
    // L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg', {
    //   attribution: 'Map tiles by Stamen Design',
    //   maxZoom: 16
    // }).addTo(map);
}

// Load locations
function loadLocations() {
    locations = getLocations();

    const container = document.getElementById('locationList');
    if (!container) return;

    container.innerHTML = '';
    markers = [];

    if (locations.length === 0) {
        container.innerHTML = `
      <div style="text-align: center; padding: 2rem;">
        <div style="font-size: 3rem; margin-bottom: 1rem;">📍</div>
        <h4>No places yet</h4>
        <p style="color: var(--text-secondary);">Add your special places in the admin panel!</p>
      </div>
    `;
        return;
    }

    locations.forEach((location, index) => {
        // Add marker to map
        addMarker(location, index);

        // Add item to sidebar
        const item = document.createElement('div');
        item.className = 'location-item';
        item.dataset.index = index;
        item.innerHTML = `
      <h4>${location.icon} ${location.name}</h4>
      <p>${location.description}</p>
      <div class="date">${formatDate(location.date)}</div>
    `;
        item.addEventListener('click', () => focusLocation(index));
        container.appendChild(item);
    });

    // Fit map to show all markers
    if (markers.length > 0) {
        const group = new L.featureGroup(markers);
        map.fitBounds(group.getBounds().pad(0.1));
    }
}

// Add marker to map
function addMarker(location, index) {
    // Create custom icon
    const customIcon = L.divIcon({
        className: 'custom-marker-icon',
        html: `<div style="width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; font-size: 18px;">${location.icon}</div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -20]
    });

    const marker = L.marker([location.lat, location.lng], { icon: customIcon })
        .addTo(map)
        .bindPopup(`
      <div class="popup-content" style="min-width: 150px;">
        <h4 style="color: #FF69B4; margin: 0 0 8px 0;">${location.icon} ${location.name}</h4>
        <p style="margin: 0 0 5px 0; color: #5D4E60;">${location.description}</p>
        <small style="color: #8B7D8E;">${formatDate(location.date)}</small>
      </div>
    `);

    marker.on('click', () => {
        updateActiveLocation(index);
    });

    markers.push(marker);
}

// Focus on a specific location
function focusLocation(index) {
    const location = locations[index];
    if (!location) return;

    map.setView([location.lat, location.lng], 15, {
        animate: true,
        duration: 0.5
    });

    markers[index].openPopup();
    updateActiveLocation(index);
}

// Update active location in sidebar
function updateActiveLocation(index) {
    document.querySelectorAll('.location-item').forEach((item, i) => {
        if (i === index) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}
