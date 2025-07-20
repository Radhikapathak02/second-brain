# Second Brain

A full-stack application for storing and organizing YouTube videos and Twitter posts.

## Quick Start

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **Database**: MongoDB + Mongoose
- **Auth**: JWT + bcrypt

## Environment Variables

Create `.env` in the backend folder:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

## Scripts

**Backend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production 