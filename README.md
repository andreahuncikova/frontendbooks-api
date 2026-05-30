# BookStore Frontend

Frontend for a bookstore web app built with Vue 3, TypeScript and Tailwind CSS.

Live: [frontendbooks-api.onrender.com](https://frontendbooks-api.onrender.com)

## Tech stack

- Vue 3 + TypeScript
- Vite
- Tailwind CSS
- Vue Router

## How to run locally

```bash
npm install
npm run dev       # dev server at http://localhost:5173
```

Make sure the API is also running — set `VITE_API_URL` in a `.env` file:

```
VITE_API_URL=http://localhost:4000
```

## Build for production

```bash
npm run build
npm run lint
```

## Features

- Browse and search books by title, author or genre
- Register and log in (JWT auth)
- Add books to cart, update quantities, apply coupon code
- Checkout and view order history
- Admin panel — create, edit and delete books (requires login)

## Related

- API repo: [github.com/andreahuncikova/api](https://github.com/andreahuncikova/api)
- API live: [api-e7dw.onrender.com/api-docs](https://api-e7dw.onrender.com/api-docs/)
