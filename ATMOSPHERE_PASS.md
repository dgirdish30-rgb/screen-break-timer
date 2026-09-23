# Screen Break Timer V5 — Atmosphere Pass

## Direction Chosen: Companion

The mechanics are now shaped as a quiet companion instead of a warning system. The interface is warm, spacious, and gently persistent. It should feel like a calm presence that helps the user notice time without taking control away.

## What Changed in This Pass

- Replaced the darker high-contrast presentation with a soft green morning palette.
- Added a translucent, rounded central panel to create a feeling of shelter without hiding the timer.
- Added a small eyebrow label to frame the tool as supportive rather than commanding.
- Changed buttons to rounded shapes with restrained hover movement.
- Increased spacing around the timer and controls so the page has a slower rhythm.
- Added two very slow ambient background shapes and a low ground glow.
- Kept the motion slow: the background drifts over 18–23 seconds and the completion state breathes over 1.5 seconds.
- Added `prefers-reduced-motion` support so users can remove motion.
- Kept the voice optional and the wording direct but non-judgmental.

## 1. Typography

The system font keeps the tool familiar and readable. The timer uses a monospaced face so the numbers do not jump as they change. Small uppercase text is used only for labels and status, creating hierarchy without making the page feel loud.

## 2. Spatial Rhythm

The timer is the main object. Large empty space surrounds it. Controls are grouped below it, while explanatory text sits farther away so it does not compete with the countdown. The rounded panel gives the user a clear place to return to.

## 3. Color Strategy

The palette uses pale green, deep forest green, and one muted warm accent. Green suggests steadiness and care. The warm accent only appears when the timer is active, so it signals attention without looking like an emergency.

## 4. Motion and Timing

Motion is intentionally slow:

- Ambient background drift: 18–23 seconds
- Button hover transition: 250 milliseconds
- State transitions: 600–900 milliseconds
- Completion breathing: 1,500 milliseconds

The motion should be felt as atmosphere, not watched as entertainment. The timer does not shake, flash, or rapidly pulse.

## Signature Interaction

The signature interaction is the transition from `Ready` to `Running` to `Time to Step Away`. The timer becomes slightly warmer and the surrounding instructions become quieter. At completion, the display slowly breathes instead of flashing. Voice and chime provide optional notice while the user keeps control.

## Figma Refinement Pass

Before implementing this pass, the direction was refined as a Companion concept:

- More space around the timer
- Softer green color decisions
- Rounded controls instead of sharp command-like buttons
- A clear hierarchy between time, state, controls, and supporting copy
- A slow completion state instead of an urgent animation

The code follows those decisions rather than adding random decoration.

## Dignity Audit

- **Does it feel punitive?** No. There is no red warning state, shame language, score, or forced lockout.
- **Does it respect agency?** Yes. Start, Pause, Reset, and Voice updates are visible and user-controlled.
- **Is friction intentional?** Yes. The timer makes the stopping point noticeable, but does not trap the user.
- **Would I want this interrupting me?** The interruption is quiet enough to feel like a reminder rather than a punishment.
- **Is it minimal?** Yes. The atmosphere supports the timer instead of adding new features.

## Remaining Testing

Test the live site on desktop and mobile. Check that the green background has enough contrast, that buttons remain easy to find, that the slow motion does not cause discomfort, and that voice can be turned off without affecting the timer.
