class ScreenBreakTimer {
    constructor() {
        this.duration = 25 * 60;
        this.timeRemaining = this.duration;
        this.isRunning = false;
        this.isPaused = false;
        this.intervalId = null;
        this.voiceEnabled = true;
        this.lastAnnouncedMinute = null;

        this.timerDisplay = document.getElementById('timerDisplay');
        this.timeText = document.getElementById('timeText');
        this.stateText = document.getElementById('stateText');
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.voiceToggle = document.getElementById('voiceToggle');
        this.voiceStatus = document.getElementById('voiceStatus');

        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.voiceToggle.addEventListener('change', () => this.toggleVoice());

        this.updateDisplay();
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    updateDisplay() {
        this.timeText.textContent = this.formatTime(this.timeRemaining);
        this.startBtn.disabled = this.isRunning;
        this.pauseBtn.disabled = !this.isRunning;
    }

    speak(message) {
        if (!this.voiceEnabled || !('speechSynthesis' in window)) return;

        window.speechSynthesis.cancel();
        const announcement = new SpeechSynthesisUtterance(message);
        announcement.rate = 0.9;
        announcement.pitch = 1;
        announcement.volume = 0.8;
        window.speechSynthesis.speak(announcement);
    }

    toggleVoice() {
        this.voiceEnabled = this.voiceToggle.checked;
        this.voiceStatus.textContent = this.voiceEnabled
            ? 'Voice updates are on.'
            : 'Voice updates are off.';

        if (!this.voiceEnabled && 'speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }

        if (this.voiceEnabled) this.speak('Voice updates are on.');
    }

    start() {
        if (this.isRunning) return;

        this.isRunning = true;
        this.isPaused = false;
        this.startBtn.disabled = true;
        this.timerDisplay.classList.add('active');
        this.timerDisplay.classList.remove('complete');
        this.stateText.textContent = 'Running';
        this.speak(`Timer started. ${this.minutesMessage()} remaining.`);

        this.requestFullscreen();

        this.intervalId = setInterval(() => {
            this.timeRemaining--;
            this.updateDisplay();
            this.announceMinuteChange();

            if (this.timeRemaining <= 0) this.complete();
        }, 1000);
    }

    pause() {
        if (!this.isRunning) return;

        clearInterval(this.intervalId);
        this.intervalId = null;
        this.isRunning = false;
        this.isPaused = true;
        this.stateText.textContent = 'Paused';
        this.updateDisplay();
        this.speak(`Timer paused at ${this.minutesMessage()}.`);
    }

    reset() {
        clearInterval(this.intervalId);
        this.intervalId = null;
        this.isRunning = false;
        this.isPaused = false;
        this.timeRemaining = this.duration;
        this.lastAnnouncedMinute = null;
        this.timerDisplay.classList.remove('active', 'complete');
        this.stateText.textContent = 'Ready';
        this.updateDisplay();
        this.speak('Timer reset. Ready when you are.');
    }

    minutesMessage() {
        const minutes = Math.floor(this.timeRemaining / 60);
        const seconds = this.timeRemaining % 60;
        if (minutes > 0) return `${minutes} minute${minutes === 1 ? '' : 's'}`;
        return `${seconds} second${seconds === 1 ? '' : 's'}`;
    }

    announceMinuteChange() {
        const minute = Math.ceil(this.timeRemaining / 60);
        if (minute > 0 && minute !== this.lastAnnouncedMinute) {
            this.lastAnnouncedMinute = minute;
            if (minute <= 5 || minute % 5 === 0) {
                this.speak(`${minute} minute${minute === 1 ? '' : 's'} remaining.`);
            }
        }
    }

    complete() {
        clearInterval(this.intervalId);
        this.intervalId = null;
        this.isRunning = false;
        this.timerDisplay.classList.remove('active');
        this.timerDisplay.classList.add('complete');
        this.stateText.textContent = 'Time to Step Away';
        this.updateDisplay();
        this.speak('Your timer is finished. It is time to step away from the screen.');
        this.playNotification();
        this.exitFullscreen();
    }

    playNotification() {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;

        const audioContext = new AudioContext();
        const now = audioContext.currentTime;
        for (let i = 0; i < 2; i++) {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            osc.connect(gain);
            gain.connect(audioContext.destination);
            osc.frequency.value = i === 0 ? 528 : 432;
            osc.type = 'sine';
            gain.gain.setValueAtTime(0.0001, now + i * 0.3);
            gain.gain.exponentialRampToValueAtTime(0.1, now + i * 0.3 + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.3 + 0.5);
            osc.start(now + i * 0.3);
            osc.stop(now + i * 0.3 + 0.5);
        }
    }

    requestFullscreen() {
        const elem = document.documentElement;
        if (elem.requestFullscreen) elem.requestFullscreen().catch(() => {});
    }

    exitFullscreen() {
        if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (!('speechSynthesis' in window)) {
        const toggle = document.getElementById('voiceToggle');
        const status = document.getElementById('voiceStatus');
        toggle.checked = false;
        toggle.disabled = true;
        status.textContent = 'Voice updates are not supported in this browser.';
    }

    new ScreenBreakTimer();
});
