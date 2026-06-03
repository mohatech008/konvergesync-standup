# 🚀 KonvergeSync - Daily Activity Hub

An elegant, asynchronous daily standup logger built for the **Konvergenz Network Solutions** Software Engineering Internship Assessment.

**Live Frontend Demo:**  https://konvergesync-standup.vercel.app/ 
**Live API Endpoint:** 

---

## 📸 Application Previews
![Landingpage screenshot](./landingpage.png)
![Standupform Screenshot](./standupform.png)
![Dashboard Screenshot](./dashboard.png)
![Liveactivity ](./Liveactivitypage.png)

---

## ✨ Features
- **Async Standup Tracking:** Team members can log what they did yesterday, what they are doing today, and flag blockers.
- **Real-Time Polling:** The feed automatically syncs every 10 seconds. No page refreshes required.
- **Smart Productivity Dashboard:** A visually appealing bar chart tracks team activity and blocker frequency over a 7-day period.
- **Contextual Weather:** Integrates the Open-Meteo API to display real-time weather conditions for Nairobi, Kenya.
- **Modern UI/UX:** Built with Tailwind CSS featuring glassmorphism, responsive grid layouts, custom scrollbars, and Konvergenz brand colors.

## 🛠 Tech Stack
- **Frontend:** React (Vite), Tailwind CSS, Recharts (for analytics), Axios, Date-fns, Lucide-React.
- **Backend:** Python, Flask, SQLAlchemy (SQLite database), Flask-CORS, Gunicorn.

## 🚀 Local Setup Instructions

### 1. Start the API (Backend)
Navigate into the backend directory:
```bash
cd backend