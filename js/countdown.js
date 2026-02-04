// ========================================
// COUNTDOWN JAVASCRIPT
// Special dates and countdown timers
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    updateDaysTogether();
    startAnniversaryCountdown();
    loadSpecialDates();
});

// Update days together counter
function updateDaysTogether() {
    const element = document.getElementById('daysTogether');
    if (!element) return;

    const days = getDaysTogether();
    animateNumber(element, days);
}

// Animate number counting up
function animateNumber(element, target) {
    let current = 0;
    const increment = Math.ceil(target / 60);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = current.toLocaleString();
    }, 25);
}

// Start anniversary countdown
function startAnniversaryCountdown() {
    const couple = getCoupleInfo();
    const anniversaryDate = couple.anniversary;

    function updateCountdown() {
        const countdown = calculateCountdown(anniversaryDate);

        document.getElementById('countDays').textContent = countdown.days;
        document.getElementById('countHours').textContent = countdown.hours;
        document.getElementById('countMinutes').textContent = countdown.minutes;
        document.getElementById('countSeconds').textContent = countdown.seconds;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Load special dates list
function loadSpecialDates() {
    const container = document.getElementById('specialDatesList');
    if (!container) return;

    const dates = getSpecialDates();

    // Sort by date
    dates.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        // Adjust for recurring dates
        const now = new Date();
        if (dateA < now) dateA.setFullYear(dateA.getFullYear() + 1);
        if (dateB < now) dateB.setFullYear(dateB.getFullYear() + 1);

        return dateA - dateB;
    });

    container.innerHTML = '';

    dates.forEach((date, index) => {
        const countdown = calculateCountdown(date.date);
        const isPast = countdown.days < 0;

        const card = document.createElement('div');
        card.className = 'special-date-card fade-in';
        card.style.animationDelay = (index * 0.1) + 's';
        card.innerHTML = `
      <div class="special-date-icon">${date.icon}</div>
      <div class="special-date-info">
        <h4>${date.name}</h4>
        <p>${isPast ? 'Celebrated on' : 'In ' + countdown.days + ' days'} • ${formatDate(date.date)}</p>
      </div>
    `;
        container.appendChild(card);
    });

    if (dates.length === 0) {
        container.innerHTML = `
      <div style="text-align: center; padding: 2rem; grid-column: 1 / -1;">
        <div style="font-size: 3rem; margin-bottom: 1rem;">📅</div>
        <h4>No special dates yet</h4>
        <p>Add your special dates in the admin panel!</p>
      </div>
    `;
    }
}
