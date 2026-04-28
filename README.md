# GnanaStack Technologies - Full Stack MERN Studio

A professional, full-stack MERN (MongoDB, Express, React, Node.js) application for a software startup.

## Features
- **Frontend**: React 19, Vite, TailwindCSS, Framer Motion, React Hot Toast.
- **Backend**: Node.js, Express, MongoDB (Mongoose), MVC Architecture, JWT-ready structure.
- **Admin Panel**: Dedicated `/admin/enquiries` route to manage client project submissions.
- **Responsive Design**: Premium dark-mode UI optimized for all devices.
- **Automated Workflow**: Contact form saves data directly to MongoDB.

## Project Structure
```text
/
├── frontend/        # Frontend React application
│   ├── src/
│   │   ├── components/ # Reusable UI sections
│   │   ├── pages/      # Home and Admin pages
│   │   ├── services/   # API integration
│   │   └── data/       # Static site content
├── backend/         # Backend Express API
│   ├── src/
│   │   ├── config/     # DB connection
│   │   ├── controllers/# Business logic
│   │   ├── models/     # Mongoose schemas
│   │   ├── routes/     # API endpoints
│   │   └── middleware/ # Error handling
```

## Setup Instructions

### 1. Prerequisites
- Node.js installed
- MongoDB running locally (or a MongoDB Atlas URI)

### 2. Backend Setup
1. Open a terminal in the `backend/` directory.
2. Create a `.env` file (see `.env.example` or use the one provided).
3. Run `npm install`.
4. Run `npm run dev` to start the backend on port 5000.

### 3. Frontend Setup
1. Open a new terminal in the `frontend/` directory.
2. Run `npm install`.
3. Run `npm run dev` to start the frontend on port 5173.

## Routes
- **Home**: `http://localhost:5173/`
- **Admin Enquiries**: `http://localhost:5173/admin/enquiries` (Management dashboard)

## Technology Highlights
- **Zero Billing Bloat**: No accounting or billing software code included.
- **Premium Aesthetics**: Glassmorphism, smooth gradients, and Inter typography.
- **Production Ready**: Separate App/Server logic, proper error handling, and CORS configuration.
