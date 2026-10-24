# KAVERI — Premium Filter Coffee Website (React)

Scroll-driven brand site: brass tumbler hero with coffee drips -> pour sequence -> pack showcase ->
method -> Coorg estate reveal -> testimonials -> footer. Cart drawer included.

## Run
    npm install
    npm run dev        # http://localhost:5173
    npm run build      # production build in /dist (deploy to Netlify / Vercel / any static host)
    npm run preview

## Stack
React 18, Vite, Framer Motion (scroll choreography), Lenis (smooth scroll). All artwork is SVG, no image files.

## Customise
- Brand name, copy, prices, quotes: src/data.js and src/components/*.jsx
- Colours / type: CSS variables at the top of src/styles.css
- Real photos: replace <Landscape /> (Origin section) and <Pouch /> with <img> tags.
- Real checkout: wire the Checkout button in src/components/Chrome.jsx to Razorpay / Shopify.

Preview dist/ through a server (npm run preview); opening index.html via file:// will not load module scripts.
