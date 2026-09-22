# Screen Break Timer V5

A timer that interrupts screen habits with a clear, gentle voice instead of trying to hold attention.

## What V5 Adds

- Optional browser voice updates using the built-in Web Speech API.
- A voice toggle so the user stays in control.
- Spoken start, pause, reset, minute updates, and completion messages.
- The existing soft completion chime and visual pulse remain.
- Voice is local to the browser. There is no speech API server and no account.

## How to Use

1. Open `index.html` in a modern browser.
2. Leave **Voice updates** checked or turn it off.
3. Press **Start**.
4. The timer speaks a short update when it starts, at useful time points, and when it finishes.
5. Press **Pause** or **Reset** whenever you choose.

The timer is still set to 25 minutes in this version. The voice does not speak every second because that would become distracting.

## Seven Back-End Answers

### 1. What data does this tool need?

It only needs the timer duration, the remaining time, the timer state, and whether voice updates are on.

### 2. Where is it stored?

The timer state exists in the browser while the page is open. Voice settings are also only held in the page. Nothing is uploaded.

### 3. Is it temporary or persistent?

The data is temporary. Closing the page clears the timer state. This is intentional because the tool does not need a personal history.

### 4. Does the system need memory between sessions?

No. The tool should not build a profile of the user. Each timer is a new choice.

### 5. Does the system require AI inference?

No. The spoken messages are fixed phrases. The browser's built-in speech synthesis reads them aloud.

### 6. How many API calls are realistically required?

Zero. The project uses no backend and no external API calls.

### 7. What happens if the API fails?

There is no external API to fail. If speech synthesis is unavailable, the timer still works with its visual display and completion chime. The voice checkbox is disabled and the user is told why.

## Architecture

### Input Layer

- Start button
- Pause button
- Reset button
- Voice updates checkbox

### Logic Layer

- Countdown interval
- Timer state changes
- Time announcements
- Speech synthesis messages
- Completion sound
- Fullscreen request with fallback

### Output Layer

- Countdown display
- State label
- Voice announcement
- Completion chime
- Visual pulse

## Break Log

### What Changed

The V5 version adds a basic voice layer to the existing timer. The browser now says what is happening at important moments:

- "Timer started"
- Useful remaining-time updates
- "Timer paused"
- "Timer reset"
- "Your timer is finished"

The voice can be turned off. It does not speak every second because that would replace one distraction with another.

### What Went Wrong Before

- The earlier timer only changed text and played a sound, so a user could miss what happened if they were not looking at the screen.
- The original audio code created a new audio context at the end, which some browsers may block because audio normally needs a user gesture first.
- The old version did not have Pause or Reset controls, so the user had less control once the timer started.
- The timer originally requested fullscreen without explaining that it could fail. V5 keeps fullscreen as an optional enhancement and continues normally if the browser rejects it.
- A spoken update for every second would be technically possible but would be annoying and would conflict with the tool's calm purpose. V5 only speaks meaningful events.

### Remaining Limits

- Voice availability depends on the browser and device.
- The exact voice may sound different on different operating systems.
- Speech synthesis may stop if the browser tab is backgrounded.
- The tool is a reminder, not treatment or a replacement for professional support.

## Behavior Integrity Check

This version still interrupts at the chosen time and gives the user control. It does not shame, monitor, score, or manipulate the user. Voice is an optional accessibility and awareness layer, not a way to make the tool harder to escape.
