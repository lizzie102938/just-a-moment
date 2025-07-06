
# 🌍 The Discovery Panel

Explore the world from your browser. Users can click on the map or use the search input to find photos, recipes, and tune into radio stations around the globe.

[👉 Live Site](https://www.the-discovery-panel.online)

---

## ✨ Overview

The Discovery Panel is a **full-stack Next.js web app** which uses the following APIs:
- Beautiful imagery (Unsplash API)
- Local cuisines (TheMealDB API)          --> please note this API does lack certain countries. Examples of countries with data: France, United Kingdom, Italy.
- Live radio stations (RadioBrowser API)

It uses **Reverse Geocoding** to detect countries/regions based on map clicks or search terms, and allows users to **save places to a personal Bucket List**, powered by a PostgreSQL database via Prisma and Neon.

---

## 🚀 Live Credentials for Testing

You can test the app using the following login:

- **Email:** `test@test.com`
- **Password:** `test123`

Or feel free to sign up and create your own account.

---

### 💡 Key Features

- 🗺 Interactive world map using Leaflet.js
- 📸 Real-time photos via Unsplash API
- 🍽 Local meals via TheMealDB API
- 📻 Country-based radio stations via RadioBrowser
- 🧭 Reverse geolocation using OpenStreetMap + Nominatim
- 📌 Add locations to a personal Bucket List
- 🔒 Authentication with NextAuth
- ☁️ Deployed on Vercel

---

## 🧑‍💻 Tech Stack

| Frontend           | Backend             | Styling                   | APIs Used                                        | Deployment    |
|--------------------|---------------------|---------------------------|--------------------------------------------------|---------------|
| Next.js / React    | Prisma / PostgreSQL | Sass Modules / Mantine UI | Unsplash, TheMealDB, RadioBrowser, OpenStreetMap | Vercel / Neon |

---

## 📷 Screenshots and recording


<img width="1318" alt="Screenshot 2025-06-29 at 23 36 44" src="https://github.com/user-attachments/assets/ff81203d-f773-4b46-afe5-2488f9b27fd0" />
<img width="1499" alt="Screenshot 2025-07-06 at 23 53 52" src="https://github.com/user-attachments/assets/9ef82770-eff7-4a22-ab10-a8c2cf92708d" />

https://github.com/user-attachments/assets/2254dd75-3352-40b2-a093-98268c48504b


---

## 🛠 Local Development Setup

If you'd like to run this project locally:

### 1. Clone the repository

```bash
git clone https://github.com/lizzie102938/the-discovery-panel.git
cd the-discovery-panel
npm install
```

Create a .env.local file in the root with the following content:

DATABASE_URL=your_postgresql_connection_url
NEXTAUTH_SECRET=your_random_secret
NEXTAUTH_URL=http://localhost:3000
UNSPLASH_API_KEY=your_unsplash_api_key

Generate Prisma client and migrate DB (optional if using existing Neon DB):

```bash
npx prisma generate
npx prisma migrate dev --name init
```

Run the development server:
```bash
npm run dev
```

Visit http://localhost:3000

Happy travels! ✈️


