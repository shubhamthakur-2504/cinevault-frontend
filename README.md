# 🎬 CineVault - MERN Stack Movie Application

A full-stack movie management application with role-based access control, built with the MERN stack.

Live Demo: [cinevault-app](https://cinevault-app.vercel.app/)

Backend Repo: [cinevault-backend](https://github.com/shubhamthakur-2504/cinevault-backend)
## 🌟 Features

### User Features
- 🔐 **Authentication**: JWT-based login and registration
- 🎥 **Browse Movies**: View all movies with cursor-based pagination
- 🔍 **Search**: Search movies by name or description
- 🔢 **Sort**: Sort movies by rating, name, release date, or duration
- 📱 **Responsive Design**: Works seamlessly on mobile, tablet, and desktop

### Admin Features
- ➕ **Add Movies**: Add new movies with poster upload or URL
- ✏️ **Edit Movies**: Update movie details and posters
- 🗑️ **Delete Movies**: Remove movies from the collection
- 🎯 **Protected Routes**: Admin-only access to management features

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI Library
- **Material-UI (MUI)** - Component Library
- **React Router DOM** - Navigation
- **Axios** - HTTP Client
- **Context API** - State Management
- **Vite** - Build Tool

### Backend (Your Existing API)
- **Node.js** - Runtime
- **Express.js** - Web Framework
- **MongoDB** - Database
- **JWT** - Authentication
- **Cloudinary** - Image Storage
- **Bull Queue** - Job Queue for movie insertion

## 📁 Project Structure

```
movie-frontend/
├── src/
│   ├── api/
│   │   └── axios.js                 # Axios configuration with interceptors
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx           # Navigation bar
│   │   │   ├── ProtectedRoute.jsx   # Route protection HOC
│   │   │   └── SnackbarAlert.jsx    # Reusable snackbar
│   │   └── movie/
│   │       ├── MovieCard.jsx        # Movie display card
│   │       ├── MovieForm.jsx        # Reusable movie form
│   │       ├── DeleteMovieDialog.jsx # Delete confirmation
│   │       └── SortFilterPanel.jsx  # Search & sort panel
│   ├── contexts/
│   │   └── AuthContext.jsx          # Authentication context
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── LoginPage.jsx        # Login page
│   │   │   └── RegisterPage.jsx     # Registration page
│   │   ├── user/
│   │   │   ├── HomePage.jsx         # Movie listing with pagination
│   │   │   └── SearchPage.jsx       # Search & sort page
│   │   └── admin/
│   │       ├── AddMoviePage.jsx     # Add movie page (Admin)
│   │       └── EditMoviePage.jsx    # Edit movie page (Admin)
│   ├── theme/
│   │   └── theme.js                 # MUI theme configuration
│   ├── utils/
│   │   ├── constants.js             # Constants and config
│   │   └── helpers.js               # Helper functions
│   ├── App.jsx                      # Main app component
│   ├── main.jsx                     # Entry point
│   └── index.css                    # Global styles
├── .env                             # Environment variables
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Running backend API (refer to backend README) [Backend Repo](https://github.com/shubhamthakur-2504/cinevault-backend)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shubhamthakur-2504/cinevault-frontend.git
   cd cinevault-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   The app will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:5000    # Backend API URL
```

For production, update this to your deployed backend URL.

## 📝 API Endpoints Used

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh-token` - Refresh access token
- `GET /api/auth/profile` - Get user profile
- `POST /api/auth/logout` - Logout user

### Movies
- `GET /api/movies` - Get all movies (with pagination)
- `GET /api/movies/search?q={query}` - Search movies
- `GET /api/movies/sorted?{sortField}={order}` - Get sorted movies
- `POST /api/movies` - Add new movie (Admin only)
- `PATCH /api/movies/:id` - Edit movie (Admin only)
- `DELETE /api/movies/:id` - Delete movie (Admin only)

## 🎨 Features Breakdown

### Authentication Flow
1. User logs in → Receives access token (stored in localStorage)
2. Refresh token stored in httpOnly cookie
3. Access token sent with every request via interceptor
4. On 401 error → Automatically refresh token
5. If refresh fails → Redirect to login

### Pagination
- **Cursor-based pagination** for efficient data loading
- "Load More" button to fetch next page
- Tracks `nextCursor` and `hasNextPage` state

### File Upload
- Supports both file upload and URL for movie posters
- Uses `FormData` for multipart requests
- Cloudinary integration on backend

### Role-Based Access
- Regular users: View, search, and sort movies
- Admins: All user features + add, edit, delete movies
- Protected routes enforce admin-only access

## 🎯 User Guide

### For Regular Users

1. **Register/Login**
   - Create an account or login with credentials
   - Access token saved automatically

2. **Browse Movies**
   - View all movies on home page
   - Click "Load More" for pagination

3. **Search Movies**
   - Go to "Search" page
   - Enter search term and click "Search"

4. **Sort Movies**
   - Select sort field (name, rating, etc.)
   - Choose order (ascending/descending)
   - Click "Apply Sort"

### For Admin Users

All user features plus:

1. **Add Movie**
   - Click "Add Movie" in navbar
   - Fill in movie details
   - Upload poster or provide URL
   - Submit form

2. **Edit Movie**
   - Click "Edit" button on any movie card
   - Update fields as needed
   - Optionally upload new poster
   - Save changes

3. **Delete Movie**
   - Click "Delete" button on movie card
   - Confirm deletion in dialog


## 👤 Author

**Shubham Thakur** - [@shubhamthakur-2504](https://github.com/shubhamthakur-2504)