# Atlas One DevTools Cheat Sheet

A practical DevTools cheat sheet for debugging and improving the Atlas One UI quickly.

---

## Open DevTools on macOS

### Open Console directly
Option + Command + J

### Open full DevTools panel
Option + Command + I

### Inspect element
Option + Command + C

---

## Most useful tabs

### Elements
Use this to:
- inspect layout
- test CSS live
- check class names
- see spacing, padding, and sizing

### Console
Use this to:
- read JavaScript errors
- test functions manually
- inspect variables
- verify fetch responses

### Network
Use this to:
- confirm prompts.json loads correctly
- inspect failed requests
- verify status codes
- test cache behavior

### Sources
Use this to:
- debug JavaScript step-by-step
- set breakpoints
- inspect runtime flow

### Application
Use this to:
- inspect Local Storage
- verify saved projects
- clear stale browser data

---

## Fast checks for Atlas One

### Check if prompts are loading
fetch('prompts.json').then(r => r.json()).then(console.log)

### Check if the app loaded prompt data
console.log(promptData)

### Check if Local Storage has saved project data
localStorage.getItem('atlas-last-project')

### Clear saved project state
localStorage.removeItem('atlas-last-project')

### Clear saved background
localStorage.removeItem('atlas-bg')

---

## Common problems

### 1. Prompt library does not load
Check:
- prompts.json exists in docs/
- fetch path is correct
- browser console shows no 404

### 2. UI looks old after deploy
Check:
- hard refresh the page
- disable cache in DevTools
- confirm latest script is loaded

Hard refresh on macOS:
Command + Shift + R

### 3. Buttons do nothing
Check:
- Console for JavaScript errors
- expected element IDs exist in HTML
- event handlers are attached

### 4. Local data behaves strangely
Check:
- Local Storage values
- clear old saved state
- reload page after clearing

---

## Recommended debug workflow

1. Open DevTools
2. Check Console for errors
3. Check Network for prompts.json
4. Check Application → Local Storage
5. Inspect Elements if UI layout is off
6. Hard refresh and retest

---

## Notes

Use DevTools as a live inspection layer:
- test small changes quickly
- verify assumptions
- debug before editing files

For Atlas One, the fastest wins usually come from:
- Console
- Network
- Application
- Elements
