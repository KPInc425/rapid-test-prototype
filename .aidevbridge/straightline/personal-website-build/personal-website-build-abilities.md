# rapid-test-prototype

## Core Features
- ability to display user-entered text in large, styled letters on the main page
	+ persist the last entered text in localStorage so it reappears after refresh
	+ support basic text styling (color, size) and responsive scaling
- ability to provide a navigation menu to switch between pages without full reload
	+ use client-side routing or simple show/hide views for low complexity

## Blog
- ability to view a sample blog post on the blog page
	+ include title, body, and timestamp in the sample post
- ability for visitors to add comments to a blog post
	+ persist comments in localStorage so they remain after refresh
	+ support anonymous comments with simple validation (non-empty)

## UI / UX
- ability to toggle dark mode across the site
	+ persist dark mode preference in localStorage
	+ ensure colors meet basic contrast for readability
- ability to provide a pleasant, modern visual design for the prototype
	+ minimal CSS with responsive layout and mobile-friendly spacing
	+ keep styling lightweight and framework-free (vanilla CSS)

## Expandability
- ability to add new pages or simple features with minimal structure changes
	+ keep files small and organized to make future module extraction straightforward
	+ document where to add new HTML/JS/CSS for contributors
