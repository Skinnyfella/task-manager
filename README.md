# Task Manager App

This is a **full-stack Task Manager App** built with **React (Bolt UI framework) for the frontend**, **Node.js/Express for the backend**, and **Supabase as the PostgreSQL database provider**. The app allows users to manage their tasks efficiently.

## 🚀 Live Demo
[Task Manager App](https://task-manager-rho-flax.vercel.app)

## 📂 Project Structure
```
Task Manager App
│── backend/                   # Backend code (Node.js/Express)
│   ├── src/
│   │   ├── config/            # Configuration files
│   │   ├── controllers/       # API controllers
│   │   ├── middlewares/       # Middleware functions
│   │   ├── routes/            # API routes
│   │   ├── app.js             # Express app setup
│   │   ├── index.js           # Server entry point
│   ├── .env                   # Environment variables (ignored in Git)
│   ├── .gitignore             # Git ignore file
│   ├── package.json           # Backend dependencies
│
│── project/                   # Frontend code (React with Bolt)
│   ├── public/                # Static files
│   ├── src/
│   │   ├── assets/            # Images and icons
│   │   ├── components/        # Reusable UI components
│   │   ├── context/           # React Context API for state management
│   │   ├── App.jsx            # Main App component
│   │   ├── firebase.js        # Firebase authentication config
│   │   ├── main.jsx           # React entry point
│   │   ├── ThemeToggle.jsx    # Dark/Light mode toggle
│   │   ├── styles/            # CSS files
│   ├── .bolt/                 # Bolt configuration
│   ├── package.json           # Frontend dependencies
```

## 🛠 Tech Stack
- **Frontend:** React (Bolt UI framework), Vite, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Firebase (Google & Email Sign-in)
- **Deployment:** Vercel (Frontend), Railway/Supabase (Backend & Database)

## 🔧 Installation & Setup
### Backend
```sh
cd backend
npm install
npm start  # Runs the backend server on PORT 5000
```

### Frontend
```sh
cd project
npm install
npm run dev  # Runs the frontend on localhost
```

## 🚀 Deployment
### Deploy Backend to Railway/Vercel
1. Push backend code to GitHub.
2. Deploy the backend using Railway or Vercel.

### Deploy Frontend to Vercel
1. Push frontend code to GitHub.
2. Connect the repository to Vercel and deploy.

## 📌 Features
- 🔐 Authentication (Google & Email Login via Firebase)
- ✅ Create, Read, Update, Delete (CRUD) tasks
- 📅 Task scheduling and reminders
- 🌙 Dark Mode Support
- 🔥 Real-time updates with Supabase
- 🎨 Modern & responsive UI with Bolt & Tailwind

## 🧑‍💻 Author
**GitHub:** [Skinnyfella](https://github.com/Skinnyfella)

## 📝 License
This project is licensed under the **MIT License**.

