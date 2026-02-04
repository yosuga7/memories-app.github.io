// ========================================
// GALLERY JAVASCRIPT
// Photo gallery with lightbox functionality
// ========================================

let currentPhotoIndex = 0;
let photos = [];

document.addEventListener('DOMContentLoaded', function () {
    loadGallery();
    initLightbox();
});

// Load gallery photos
function loadGallery() {
    const container = document.getElementById('galleryGrid');
    const emptyState = document.getElementById('emptyGallery');

    if (!container) return;

    photos = getPhotos();

    if (photos.length === 0) {
        container.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }

    container.innerHTML = '';

    photos.forEach((photo, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item fade-in';
        item.style.animationDelay = (index * 0.05) + 's';
        item.dataset.index = index;
        item.innerHTML = `
      <img src="${photo.url}" alt="${photo.caption}" loading="lazy">
      <div class="gallery-overlay">
        <div class="gallery-caption">${photo.caption}</div>
        <div class="gallery-date">${formatDate(photo.date)}</div>
      </div>
    `;
        item.addEventListener('click', () => openLightbox(index));
        container.appendChild(item);
    });
}

// Initialize lightbox
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');

    if (!lightbox) return;

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrevPhoto);
    nextBtn.addEventListener('click', showNextPhoto);

    // Close on background click
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrevPhoto();
        if (e.key === 'ArrowRight') showNextPhoto();
    });
}

// Open lightbox
function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    currentPhotoIndex = index;
    updateLightboxPhoto();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Update lightbox photo
function updateLightboxPhoto() {
    const photo = photos[currentPhotoIndex];
    const image = document.getElementById('lightboxImage');
    const caption = document.getElementById('lightboxCaption');
    const date = document.getElementById('lightboxDate');

    image.src = photo.url;
    image.alt = photo.caption;
    caption.textContent = photo.caption;
    date.textContent = formatDate(photo.date);
}

// Show previous photo
function showPrevPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
    updateLightboxPhoto();
}

// Show next photo
function showNextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
    updateLightboxPhoto();
}
