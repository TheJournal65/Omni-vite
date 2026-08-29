# Omni-vite
> **WashU Hackathon 2026** — *Discover what's actually happening on your campus.*

---

## 📌 Description / Pitch

College students have countless opportunities around them, but discovering what is actually worth doing is fragmented across school calendars, Instagram, group chats, flyers, and word of mouth. Student-created events are especially difficult to discover. **Omni-vite** brings these events into one place and uses AI to personalize discovery based on a student's interests, location, and preferences.

When college students are not heavily occupied or stressed with assignments, they are often bored or looking for ways to have fun, de-stress, or relax. The last thing they want to do at that point is spend time digging across multiple platforms to find something interesting. Events on college campuses are often not sufficient, and gatherings run by students themselves often don’t get the publicity they need to be noticeable or fun. 

**Omni-vite** aims to fix that by creating a central repository of events in the area, personalized and filtered by student-reported categories to highlight what each individual would most like to see.

---

## 🎯 Deliverables & Core Features

These represent the core requirements for the hackathon presentation and live demo:

1. **Student Account & Onboarding**
   - User account creation requiring a valid `.edu` email address.
   - College / University selection (e.g., Washington University in St. Louis).
   - Preference setup: Self-reported description of ideal event types and category tags.

2. **Distance-Based Sorting & Geolocation**
   - Sort and display events dynamically based on distance from user's current location or campus coordinates (e.g., "0.2 mi away", "10 miles from campus").

3. **Central Dashboard (Dual View)**
   - **Interactive Map View**: Scalable down to individual campus buildings (e.g., Danforth Campus, DUC, Tisch Park, Mudd Field, Village), showing exact event pin locations.
   - **List View**: Clean, sortable card layout with search and quick actions.
   - **Filtering & Search**:
     - Filter between **College-Run** and **Student-Run** events.
     - Search by keyword, title, location, or tag.
     - Default filtering automatically tailored to user preferences.

4. **Student Event Creation & 10 Co-Signer Threshold**
   - Any student can create and submit a new event.
   - **Safety & Quality Gate**: The creator must invite at least **10 people to co-sign** the event before it becomes publicly visible on the community feed/map.
   - Real-time tracker for co-sign status (`X / 10 co-signed`).

---

## 🔮 Future Technical Improvements (Roadmap)

- **Automated Web Scrapers**: Automatically scrape official university calendars, club portals, and local venues to populate open events.
- **University API / Marketing Integration**: Direct integrations with university marketing departments to synchronize official campus calendar feeds.
- **Natural Language Preference Matching**: Advanced NLP / LLM embeddings to match unstructured user preference prompts with event descriptions.
- **Mobile Apps**: Native iOS and Android applications with push notifications and live geolocation check-ins.

---

## 🛠 Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS + Lucide Icons
- **Interactive Maps**: Leaflet / React-Leaflet with OpenStreetMap tiles (sub-building campus resolution without API key friction)
- **State & Storage**: Reactive client-side state with local persistence (ready for backend sync via Supabase / Firebase / Node API)
- **Deployment**: Static build output ready for 1-click hosting on Vercel, Netlify, Cloudflare Pages, or GitHub Pages.

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` or `pnpm` / `yarn`

### Installation & Run
```bash
# Navigate to the project directory
cd Omni-vite

# Install dependencies
npm install

# Start the local development server
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🌐 Live Demo & Deployment Guide

This project is built as a zero-config static single-page application, ready to be deployed for live demoing on any modern hosting platform:

### Deploy to Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
1. Push your repository to GitHub.
2. Import repository into [Vercel](https://vercel.com).
3. Framework preset: **Vite**, Build command: `npm run build`, Output directory: `dist`.

### Deploy to Netlify
1. Connect your GitHub repository to [Netlify](https://www.netlify.com/).
2. Set Build command to `npm run build` and Publish directory to `dist`.

---

## 👥 Authors & Acknowledgments
Created for **WashU Hackathon 2026** by the Omni-vite Team.
