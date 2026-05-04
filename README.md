# Frontend Mentor - Conference ticket generator solution

This is a solution to the [Conference ticket generator challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/conference-ticket-generator-oq5gFIU12w). The project is implemented with Next.js and reproduces the challenge UI using the provided assets, with full form validation and generated ticket output.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
  - [AI Collaboration](#ai-collaboration)
- [Run locally](#run-locally)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- Complete the form with their details
- Receive form validation messages if:
  - Any field is missed
  - The email address is not formatted correctly
  - The avatar upload is too big or the wrong image format
- Complete the form only using their keyboard
- Have inputs, form field hints, and error messages announced on their screen reader
- See the generated conference ticket when they successfully submit the form
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![](./preview.jpg)

### Links

- Solution URL: [Add your Frontend Mentor solution URL here](https://www.frontendmentor.io/)
- Live Site URL: [Add your deployed site URL here](https://example.com)

## My process

### Built with

- Semantic HTML5 markup
- Tailwind CSS v4 utility classes + CSS custom properties
- Mobile-first responsive workflow
- TypeScript
- React 19
- Next.js 16 (App Router)
- `next/image` for image optimization
- `next/font/local` for local Inconsolata font loading

### What I learned

This project was a strong exercise in combining a visual-heavy design with accessible form behavior:

- Building a two-state flow (form view -> generated ticket view) in a single page while keeping logic clean.
- Validating both text fields and file uploads (type + size) before submission.
- Handling browser object URLs safely by revoking old preview URLs to avoid memory leaks.
- Applying explicit text color on ticket overlays to avoid inherited color issues in layered UIs.

Code pattern used for object URL cleanup:

```tsx
useEffect(() => {
  return () => {
    if (avatarPreviewUrl) {
      URL.revokeObjectURL(avatarPreviewUrl)
    }
  }
}, [avatarPreviewUrl])
```

### Continued development

Potential improvements for a next iteration:

- Add drag-over visual states for the avatar drop zone.
- Persist last submitted ticket data in local storage.
- Improve ticket number generation strategy (e.g., deterministic IDs).
- Add component extraction (`TicketCard`, `FormField`) for easier reuse and testing.

### Useful resources

- [Next.js App Router Docs](https://nextjs.org/docs/app) - Helped with current Next.js patterns and client component usage.
- [Next.js Image Component](https://nextjs.org/docs/app/api-reference/components/image) - Useful for handling both static imports and dynamic image sources.
- [MDN - Using files from web applications](https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications) - Helpful for robust file input behavior.

### AI Collaboration

AI tools were used during development for implementation support and iteration speed:

- Tool used: Windsurf Cascade
- How it was used:
  - Scanned the repository and template requirements
  - Implemented form and ticket rendering logic
  - Adjusted styling and fixed visual issues (including text color inheritance)
  - Ran lint/build checks after changes
- What worked well:
  - Fast multi-file iteration and quick debugging feedback loops
- What needed manual review:
  - Pixel-level styling adjustments and final visual verification against the reference image

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

For production build verification:

```bash
npm run lint
npm run build
```

## Author

- Name - [Add your name](https://www.frontendmentor.io/)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)

## Acknowledgments

Challenge by [Frontend Mentor](https://www.frontendmentor.io/). Assets and design direction are from the original challenge brief.
