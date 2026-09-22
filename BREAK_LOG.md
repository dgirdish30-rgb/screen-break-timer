# Break Log — V5

## Starting Point

V4 had a working 25-minute timer with a visual countdown, a completion chime, a pulse animation, and fullscreen behavior.

## Problem Identified

The tool depended too much on the user looking at the screen. The sound and visual pulse could be missed, and the user did not receive a clear explanation of what the timer was doing.

## V5 Change

Added an optional browser voice that announces important timer events. The voice is controlled by the user and runs locally through the Web Speech API.

## Design Decision

The voice does not announce every second. It speaks when the timer starts, pauses, resets, reaches selected time reminders, and finishes. This keeps the interruption informative instead of turning it into constant noise.

## What Went Wrong

The original completion sound created a new audio context only after the timer ended. Some browsers can block that because sound usually needs to begin from a user action. V5 keeps the sound as a best-effort enhancement and uses speech plus visible text as the fallback.

The original interface only had Start. V5 adds Pause and Reset so the user has a clearer choice and more control.

## What Still Needs Testing

- Test speech in Chrome, Safari, and Firefox.
- Test what happens when the tab is in the background.
- Test the tool with voice turned off.
- Ask whether the announcements feel helpful or annoying.
- Check that the voice supports awareness without becoming another form of pressure.

## Next Possible Revision

Test the voice with real users before adding more features. Do not add voice effects, user tracking, streaks, or unnecessary announcements unless testing shows a clear benefit.
