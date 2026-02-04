# 💕 Memories Web App

A beautiful romantic web app to showcase your memories together with your loved one.

![Made with Love](https://img.shields.io/badge/Made%20with-❤️-ff69b4)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

- 📸 **Photo Gallery** - Beautiful masonry grid with lightbox
- ⏰ **Countdown Timers** - Days together counter & anniversary countdown
- 🎵 **Music Playlist** - Spotify & YouTube embed support
- 🗺️ **Interactive Map** - Leaflet.js map with custom markers
- 🔐 **Admin Dashboard** - Full CRUD for all content

## 🚀 Quick Start

### Option 1: GitHub Pages (Recommended)
1. Fork this repository
2. Go to Settings → Pages
3. Set source to "main" branch
4. Your site will be live at `https://yourusername.github.io/memories-app/`

### Option 2: Local Development
```bash
git clone https://github.com/yourusername/memories-app.git
cd memories-app
npx serve
```

## 🔐 Admin Login

| Field | Default Value |
|-------|---------------|
| Username | `admin` |
| Password | `love123` |

> ⚠️ Change the password in Admin → Settings after first login!

## 🎨 Customization

1. **Add Photos**: Admin → Photos → Add Photo (paste image URLs)
2. **Special Dates**: Admin → Special Dates → Add anniversaries, birthdays
3. **Music**: Admin → Songs → Add Spotify/YouTube URLs
4. **Places**: Admin → Locations → Add coordinates from Google Maps

## 📁 Project Structure

```
memories-app/
├── index.html          # Homepage
├── gallery.html        # Photo gallery
├── countdown.html      # Special dates
├── music.html          # Music playlist
├── map.html            # Interactive map
├── admin.html          # Login page
├── dashboard.html      # Admin dashboard
├── css/style.css       # All styles
├── data/memories.js    # Data store
└── js/                 # JavaScript files
```

## 💾 Data Storage

All data is stored in browser localStorage. To transfer data:
1. Open browser console (F12)
2. Run: `copy(localStorage.getItem('memoriesData'))`
3. On new browser, run: `localStorage.setItem('memoriesData', 'PASTE_DATA_HERE')`

## 📄 License

MIT License - Feel free to use for your own love story! 💕

---

Made with ❤️ for couples everywhere
