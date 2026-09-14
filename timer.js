class ScreenBreakTimer {
    constructor() {
        this.duration = 25 * 60; // 25 minutes in seconds
        this.timeRemaining = this.duration;
        this.isRunning = false;
        this.intervalId = null;

        this.timerDisplay = document.getElementById('timerDisplay');
        this.timeText = document.getElementById('timeText');
        this.stateText = document.getElementById('stateText');
        this.startBtn = document.getElementById('startBtn');

        this.startBtn.addEventListener('click', () => this.start());
        this.updateDisplay();
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    updateDisplay() {
        this.timeText.textContent = this.formatTime(this.timeRemaining);
    }

    start() {
        if (this.isRunning) return;

        this.isRunning = true;
        this.startBtn.disabled = true;
        this.timerDisplay.classList.add('active');
        this.stateText.textContent = 'Running';

        // Request fullscreen
        this.requestFullscreen();

        this.intervalId = setInterval(() => {
            this.timeRemaining--;
            this.updateDisplay();

            if (this.timeRemaining <= 0) {
                this.complete();
            }
        }, 1000);
    }

    complete() {
        clearInterval(this.intervalId);
        this.isRunning = false;
        this.timerDisplay.classList.remove('active');
        this.timerDisplay.classList.add('complete');
        this.stateText.textContent = 'Time to Step Away';

        // Play gentle sound
        this.playNotification();

        // Visual pulse
        this.pulse();

        // Exit fullscreen
        this.exitFullscreen();
    }

    playNotification() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const now = audioContext.currentTime;

        // Create a gentle two-tone chime
        for (let i = 0; i < 2; i++) {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();

            osc.connect(gain);
            gain.connect(audioContext.destination);

            osc.frequency.value = i === 0 ? 528 : 432; // Gentle frequencies
            osc.type = 'sine';

            gain.gain.setValueAtTime(0.1, now + i * 0.3);
            gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.3 + 0.5);

            osc.start(now + i * 0.3);
            osc.stop(now + i * 0.3 + 0.5);
        }
    }

    pulse() {
        this.timerDisplay.style.animation = 'none';
        setTimeout(() => {
            this.timerDisplay.style.animation = 'pulse 1s ease-out';
        }, 10);
    }

    requestFullscreen() {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen().catch(err => {
                // Fullscreen request failed, continue without it
            });
        }
    }

    exitFullscreen() {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    new ScreenBreakTimer();
});

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(1.05);
            opacity: 0.8;
        }
    }

    .timer-display.complete {
        animation: pulse 2s ease-out infinite;
    }
`;
document.head.appendChild(style);
