# rapid-test-prototype - Ilities

## Persistence(ility)
- ability to persist small application state in the browser
	+ use localStorage for text, theme, and comments
	+ include simple migration guidance if shapes change

## Accessibility(ility)
- ability to ensure readable contrast and keyboard access
	+ check color contrast for both light and dark themes
	+ ensure focus outlines and keyboard navigation for interactive controls

## Testability(ility)
- ability to verify core interactions manually and via small scripts
	+ provide manual test steps for big text display, blog comments, navigation, and dark mode
	+ include self-test.html or small test harness that exercises key flows

## Performance(ility)
- ability to load the main UI quickly on mobile and desktop
	+ keep CSS and JS minimal; avoid heavy assets
	+ ensure text rendering is smooth and responsive

## Maintainability(ility)
- ability to keep source files small and easy to extend
	+ favor small JS modules and clear file locations
	+ include `.utilities/line_count.py` guidance for file size checks

