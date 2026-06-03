KonvergeSync - Daily Activity Hub
An elegant, asynchronous daily standup logger built for the Konvergenz Network Solutions Software Engineering Team.
Live Frontend Demo: https://konvergesync-standup.vercel.app/
Live API Endpoint: https://konvergesync-standup.onrender.com/
Application Previews
Features
Async Standup Tracking: Team members can log what they did yesterday, what they are doing today, and flag blockers.
Real-Time Polling: The feed automatically syncs every 10 seconds. No page refreshes required.
Smart Productivity Dashboard: A visually appealing bar chart tracks team activity and blocker frequency over a 7-day period.
Contextual Weather: Integrates the Open-Meteo API to display real-time weather conditions for Nairobi, Kenya.
Modern UI/UX: Built with Tailwind CSS featuring glassmorphism, responsive grid layouts, custom scrollbars, and Konvergenz brand colors.
🛠 Tech Stack
Frontend: React (Vite), Tailwind CSS, Recharts (for analytics), Axios, Date-fns, Lucide-React.
Backend: Python, Flask, SQLAlchemy (SQLite database), Flask-CORS, Gunicorn.
 Screenshots of Dashboard
![Dashboard Screenshot](./dashboard.png)
Local Setup Instructions
1. Start the API (Backend)
Open your terminal, navigate into the backend directory, set up your Python virtual environment, and launch the Flask server:
Bash
# Navigate to the backend folder
cd backend
# Create and activate a virtual environment
python3 -m venv venv
source venv/bin/activate
# Install the required Python dependencies
pip install -r requirements.txt
# Start the Flask development server
python app.py
(The backend should now be running on http://localhost:5000)
2. Start the Client (Frontend)
Open a new terminal window or tab, navigate to the frontend directory, install the necessary Node packages, and spin up the Vite development server:
Bash
# Return to the root directory, then navigate to the frontend folder
cd ../frontend
# Install the project dependencies
npm install
# Start the Vite development server
npm run dev