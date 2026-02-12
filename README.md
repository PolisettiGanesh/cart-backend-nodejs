Perfect bro 🔥
I’ll give you a **clean, professional README.md** updated up to Day 5 including Google OAuth.

You can copy-paste this directly into your GitHub `README.md`.

---

# 🛒 Cart Backend API (Node.js + Express + MongoDB)

Backend authentication system built using:

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT
- bcrypt
- Passport.js (Google OAuth 2.0)

---

# 🚀 Project Overview

This project implements a complete authentication system including:

- User registration
- Secure login
- JWT-based authentication
- Protected routes
- Google OAuth 2.0 login
- Password hashing
- MongoDB integration

---

# 📅 Progress Log

## ✅ Day 1

- Express server setup
- MongoDB connection using Mongoose
- Created User model
- Implemented Create User API

---

## ✅ Day 2

- Password hashing using bcrypt
- JWT token generation
- Secure user registration flow
- Environment variable setup (.env)

---

## ✅ Day 3

- Implemented user login API
- Added bcrypt password verification
- Generated JWT token on successful login
- Error handling for invalid credentials

---

## ✅ Day 4

- Created authentication middleware
- Protected routes using JWT verification
- Extracted token from Authorization header
- Attached decoded user to `req.user`

---

## ✅ Day 5

- Implemented Google OAuth 2.0 login
- Configured Google Cloud Console
- Integrated Passport.js with Google Strategy
- Implemented Authorization Code Flow
- Created/find user in database after Google login
- Generated JWT after successful OAuth login
- Removed password field from response
- Disabled session-based authentication (JWT only)

---

# 🔐 Authentication Features

### 📌 Email & Password Authentication

- Secure password hashing using bcrypt
- JWT token issued on login
- Protected routes require valid Bearer token

---

### 📌 Google OAuth 2.0 Authentication

Flow implemented:

1. User clicks login with Google
2. Backend redirects to Google
3. Google verifies credentials
4. Google sends authorization code
5. Backend exchanges code + client secret
6. Passport fetches user profile
7. User is created/found in MongoDB
8. JWT generated
9. Token returned in response

---

# 🧠 Authentication Flow (High-Level)

```
User → Backend → Google
Google → Backend (code)
Backend → Google (code + secret)
Google → Backend (profile)
Backend → MongoDB
Backend → JWT → Response
```

---

# 📁 Project Structure

```
config/
  passport.js

routes/
  users.js
  auth.js

models/
  users.js

middleware/
  auth.js

.env
index.js
package.json
```

---

# ⚙️ Environment Variables

Create a `.env` file:

```
PORT=3000
JWT_KEY=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

⚠️ Do not push `.env` to GitHub.

---

# 🛠 Installation & Setup

```bash
git clone <repo-url>
cd cart-backend
npm install
```

Run server:

```bash
nodemon index.js
```

---

# 🔑 API Endpoints

### Create User

```
POST /api/users
```

### Login

```
POST /api/users/login
```

### Google Login

```
GET /api/auth/google
```

### Protected Route Example

```
GET /api/users/profile
```

Header:

```
Authorization: Bearer <token>
```

---

# 🛡 Security Practices Implemented

- Password hashing using bcrypt
- JWT expiration
- Client secret stored in environment variables
- Password excluded from response
- No session-based authentication
- Protected routes via middleware

---

# 🎯 Learning Outcomes

- Understood JWT authentication deeply
- Implemented Authorization Code Flow
- Integrated Passport with Express
- Learned difference between Authentication & Authorization
- Managed OAuth client credentials securely

---

# 🏆 Current Status

✔ Email authentication complete
✔ Google OAuth complete
✔ JWT protected routes working
✔ Production-ready authentication system

---
