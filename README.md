

---

# 🛒 Cart Backend API

### 🔐 Enterprise Authentication System (Node.js + Express + MongoDB)

---

## 🚀 Project Overview

This project implements a **production-ready authentication system** using:

* **Node.js**
* **Express.js**
* **MongoDB (Mongoose)**
* **JWT (JSON Web Tokens)**
* **bcrypt**
* **Passport.js**
* **Google OAuth 2.0**
* **Facebook OAuth 2.0**

The system supports **multi-provider authentication** with secure JWT-based stateless sessions.

---

# 📅 Progress Log

---

## ✅ Day 1 — Backend Setup

* Express server initialization
* MongoDB connection using Mongoose
* Created User schema
* Implemented Create User API

---

## ✅ Day 2 — Secure Registration

* Password hashing using bcrypt
* JWT generation after signup
* Environment variables configuration
* Secure storage of secret keys

---

## ✅ Day 3 — Login System

* Implemented Login API
* Password validation using bcrypt.compare()
* Generated JWT on successful login
* Handled invalid credentials properly

---

## ✅ Day 4 — Authentication Middleware

* Created custom JWT verification middleware
* Extracted token from Authorization header
* Verified token using jwt.verify()
* Attached decoded user to `req.user`
* Protected private routes

---

## ✅ Day 5 — Google OAuth 2.0

* Configured Google Cloud Console
* Generated Client ID & Client Secret
* Integrated Passport Google Strategy
* Implemented Authorization Code Flow
* Created/Updated user after Google login
* Generated JWT after OAuth authentication
* Disabled session-based authentication
* Removed password from API responses

---

## ✅ Day 6 — Facebook OAuth 2.0

* Created Facebook Developer App
* Configured Facebook Login product
* Added Valid OAuth Redirect URI
* Integrated Passport Facebook Strategy
* Requested profile + email permissions
* Implemented `/api/auth/facebook` route
* Implemented `/api/auth/facebook/callback` route
* Created/Updated user using facebookId
* Generated JWT after Facebook login
* Enabled multi-provider authentication system

---

# 🔐 Authentication Features

---

## 📌 Email & Password Authentication

* Secure password hashing using bcrypt
* JWT token issued on login
* Stateless session management
* Protected routes require Bearer token

---

## 📌 Google OAuth 2.0

Authorization Code Flow:

1. User clicks Google login
2. Redirect to Google
3. Google verifies credentials
4. Authorization code returned
5. Backend exchanges code + client secret
6. Access token generated
7. Profile fetched
8. User stored in MongoDB
9. JWT generated

---

## 📌 Facebook OAuth 2.0

Same 5-step OAuth pattern:

1. User clicks Facebook login
2. Redirect to Facebook
3. Facebook verifies user
4. Authorization code returned
5. Backend exchanges code + app secret
6. Access token generated
7. Profile fetched
8. User stored using facebookId
9. JWT generated

---

# 🧠 High-Level Authentication Architecture

```
User (Browser)
        │
        ▼
Express Backend
        │
        ├── Email/Password Auth
        ├── Google OAuth
        ├── Facebook OAuth
        │
        ▼
MongoDB Database
        │
        ▼
JWT Issued → Client
```

---

# 🔄 OAuth Flow Architecture

```
User → Backend → OAuth Provider
OAuth Provider → Authorization Code
Backend → Exchange code + Secret
OAuth Provider → Access Token
Backend → Fetch Profile
Backend → Create/Find User
Backend → Generate JWT
Backend → Response
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

Create `.env` file:

```
PORT=3000
JWT_KEY=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
```

⚠️ `.env` is ignored using `.gitignore`.

---

# 🔑 API Endpoints

### ➤ Register User

```
POST /api/users
```

### ➤ Login User

```
POST /api/users/login
```

### ➤ Google Login

```
GET /api/auth/google
```

### ➤ Facebook Login

```
GET /api/auth/facebook
```

### ➤ Protected Route Example

```
GET /api/users/profile
```

Header:

```
Authorization: Bearer <JWT_TOKEN>
```

---

# 🛡 Security Best Practices Implemented

* Password hashing (bcrypt)
* JWT expiration time
* Client secrets stored in environment variables
* No session-based authentication
* OAuth authorization code flow
* Password excluded from API responses
* Sparse unique social ID fields
* Middleware-based route protection

---

# 🏆 Current System Capabilities

✔ Email Registration
✔ Email Login
✔ Google OAuth Login
✔ Facebook OAuth Login
✔ JWT Authentication
✔ Protected Routes
✔ Stateless Session Management
✔ Multi-provider Authentication

---

# 📈 Future Enhancements

* Refresh token implementation
* Role-based authorization (Admin/User)
* Account linking (Google + Facebook)
* Rate limiting
* Production deployment (Render / Railway)
* Docker containerization
* Swagger API documentation

---

# 🎯 Learning Outcomes

* Deep understanding of JWT authentication
* Implemented OAuth 2.0 Authorization Code Flow
* Integrated multi-provider authentication
* Designed scalable backend architecture
* Applied secure development practices

---

# ⭐ Final Status

This backend now supports a **production-style authentication architecture** with:

* Multi-provider OAuth
* Secure JWT-based authentication
* Clean modular structure
* Scalable authentication flow

---

🔥 Now bro…


