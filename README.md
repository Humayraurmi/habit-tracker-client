📝 Project Overview
This is a responsive, full-stack Habit Tracker Application designed to help users effectively manage and monitor their personal goals and routines. The platform ensures secure user authentication, supports real-time habit updates, and provides a streamlined interface for comprehensive personal habit management.

✨ Key Features
🔒 Secure User Authentication: Robust login and registration using Firebase Authentication (Email/Password & Google Sign-In).

➕ Comprehensive Habit Management: Users can seamlessly add, edit, and delete habits, including details like Title, Category, and Importance.

📱 Fully Responsive UI: An intuitive, mobile-friendly design across all screen sizes, ensuring easy navigation and access to user profile and settings.

🛡️ Robust and Secured API: All backend API routes are protected and managed using MongoDB Atlas for persistent and secure data storage.

💻 Technologies Used
Frontend (Client-Side)
React.js

React Router

Firebase Authentication

Tailwind CSS

React Hot Toast / React Toastify / Sweet Alert

Backend (Server-Side)
Node.js

Express.js

MongoDB Atlas

📦 Key Dependencies
This project relies on the following essential packages:

Client Dependencies: react-router-dom, axios, firebase, react-icons, etc.

Server Dependencies: express, cors, dotenv, mongodb, jsonwebtoken (for securing API endpoints).

🚀 Local Installation and Setup Guide
To run this project on your local machine, you need to set up both the Client (Frontend) and the Server (Backend).

Step 1: Clone the Repositories
Clone both the client and server repositories from GitHub:
git clone https://github.com/Humayraurmi/habit-tracker-server
cd habit-tracker-client
git clone https://github.com/Humayraurmi/habit-tracker-server

Step 2: Install Dependencies
Navigate into each directory and install the required NPM packages:
# In the habit-tracker-client directory
npm install
# In the habit-tracker-server directory
npm install

Step 3: Environment Variables (.env) Setup
Create a .env file in both the client and server directories and add the necessary configuration:

A. Client (habit-tracker-client/.env)
Add your Firebase configuration and the backend API URL:

# Replace with your actual Firebase config
VITE_API_KEY=...
VITE_AUTH_DOMAIN=...
...
VITE_API_URL=https://habit-tracker-server-seven.vercel.app/ 
B. Server (habit-tracker-server/.env)
Add your database connection string and a secret key:

PORT=5000
DATABASE_URL=<Your_MongoDB_Atlas_Connection_String>
JWT_SECRET=<A_Very_Strong_Secret_Key_For_JWT>
Step 4: Run the Project
Start both the server and the client:
# 1. Start the Server (In habit-tracker-server directory)
npm run dev 
# Server usually runs on http://localhost:5000
# 2. Start the Client (In habit-tracker-client directory)
npm run dev
# Client usually runs on http://localhost:5173 or http://localhost:3000


🌐 Live Demo and Relevant Links
Live Site (Frontend): https://shiny-fenglisu-57ffcb.netlify.app/

Backend API (Deployed): https://habit-tracker-server-seven.vercel.app/

Client Repository (GitHub): https://github.com/Humayraurmi/habit-tracker-client

Server Repository (GitHub): https://github.com/Humayraurmi/habit-tracker-server
