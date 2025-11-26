// Countdown timer for Stranger Things Season 5 Volume 1
// Target: November 26, 2025 at 5:00 PM Pacific Time

function updateCountdown() {
    // Create target date: November 26, 2025 at 5:00 PM Pacific Time
    // Pacific Time is UTC-8 (PST) or UTC-7 (PDT)
    // We'll use UTC-8 for simplicity (PST)
    const targetDate = new Date('2025-11-26T17:00:00-08:00');
    
    // Get current time
    const now = new Date();
    
    // Calculate the difference
    const difference = targetDate - now;
    
    // If the target date has passed, show zeros
    if (difference <= 0) {
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '0';
        document.getElementById('minutes').textContent = '0';
        document.getElementById('seconds').textContent = '0';
        return;
    }
    
    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    // Update the display
    document.getElementById('days').textContent = days.toString();
    document.getElementById('hours').textContent = hours.toString();
    document.getElementById('minutes').textContent = minutes.toString();
    document.getElementById('seconds').textContent = seconds.toString();
}

// Update countdown immediately
updateCountdown();

// Update countdown every second
setInterval(updateCountdown, 1000);

