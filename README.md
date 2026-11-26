# Shop App

A single-page e-commerce front end built with vanilla JavaScript, using data from the Fake Store API.

**Live demo:** https://YOUR_USERNAME.github.io/shop-app/

## Features

- Product list fetched from the API, with loading and error states
- Search by title, filter by category, sort by price
- Product detail modal (native `<dialog>`)
- Cart with item count and total

## Run locally

No build step. Open `index.html` in a browser, or use VS Code's Live Server.

## Project structure

- `index.html`: semantic layout and markup
- `styles.css`: layout (CSS Grid, Flexbox) and styles
- `script.js`: data fetching, rendering, filtering, modal, and cart
- `config.js`: API URL

## Technical decisions

- **No framework:** the brief asks for vanilla JS, and the app is small enough that a framework would add overhead.
- **Single source of truth:** `allProducts` and `cart` hold state. The DOM is rebuilt from them.
- **`textContent` only:** API data is never inserted as HTML, which avoids XSS.
- **Native `<dialog>`:** provides focus handling and Escape-to-close without custom code.

## If I had more time

- Persist the cart with `localStorage`, storing only ids and quantities
- Add tests for `applyFilters` (pure function, easy to unit test)
- Pagination or a server-side search for larger catalogs
