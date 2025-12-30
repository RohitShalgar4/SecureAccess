# SecureAccess - User Management System

## 📋 Project Overview & Purpose

A comprehensive web-based User Management System that enables organizations to manage user accounts with role-based access control (RBAC). The system provides secure authentication, user lifecycle management, and administrative capabilities for managing user permissions and account statuses.

### Key Features
- **User Authentication**: Secure signup and login with JWT tokens
- **Role-Based Access Control**: Admin, Manager, and User roles with different permissions
- **User Management**: Activate/deactivate user accounts, view user lists with pagination
- **Profile Management**: Users can update their profile information and change passwords
- **Admin Dashboard**: Comprehensive user management interface for administrators
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### Purpose
This system is designed for organizations that need to:
- Manage multiple user accounts securely
- Control access based on user roles
- Monitor and manage user account statuses
- Provide self-service profile management for users
- Maintain audit trails of user activities

---

## 🛠️ Tech Stack Used

### Backend
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js (v5.2.1)
- **Database**: MongoDB (with Mongoose ODM v9.1.0)
- **Authentication**: JWT (jsonwebtoken v9.0.3)
- **Password Hashing**: bcryptjs (v3.0.3)
- **Environment Management**: dotenv (v17.2.3)
- **CORS**: cors (v2.8.5)
- **Development**: nodemon (v3.1.11)

### Frontend
- **Framework**: React (v19.2.0)
- **Build Tool**: Vite (v7.2.4)
- **Styling**: Tailwind CSS (v4.1.18)
- **HTTP Client**: Fetch API (native)
- **State Management**: React Hooks (useState, useEffect)

### Development Tools
- **Version Control**: Git
- **Package Manager**: npm
- **Code Quality**: ESLint

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager
- Git

### Backend Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd user-management-system
```

2. **Navigate to backend directory**
```bash
cd backend
```

3. **Install dependencies**
```bash
npm install
```

4. **Configure environment variables**
```bash
# Copy the example environment file
copy .env.example .env

# Edit .env file with your configuration
# See "Environment Variables" section below
```

5. **Start the backend server**
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The backend server will start on `http://localhost:8080`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

4. **Build for production**
```bash
npm run build
```

The production build will be created in the `dist` folder.

---

## 🔐 Environment Variables

### Backend (.env)

Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
PORT=8080

# Database Configuration
MONGO_URI=mongodb://localhost:27017/user-management
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/database

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Node Environment
NODE_ENV=development
```

### Frontend

No environment variables required for frontend. API URL is configured in `frontend/src/services/api.js`

To change the backend API URL, edit:
```javascript
// frontend/src/services/api.js
const API_URL = 'http://localhost:8080/api';
```

---

## 📦 Deployment Instructions

### Backend Deployment

#### Option 1: Deploy to Heroku

1. **Install Heroku CLI**
```bash
npm install -g heroku
```

2. **Login to Heroku**
```bash
heroku login
```

3. **Create Heroku app**
```bash
cd backend
heroku create your-app-name
```

4. **Set environment variables**
```bash
heroku config:set PORT=8080
heroku config:set MONGO_URI=your-mongodb-atlas-uri
heroku config:set JWT_SECRET=your-secret-key
heroku config:set JWT_EXPIRES_IN=7d
```

5. **Deploy**
```bash
git push heroku main
```

#### Option 2: Deploy to Railway

1. **Install Railway CLI**
```bash
npm install -g @railway/cli
```

2. **Login and deploy**
```bash
railway login
railway init
railway up
```

3. **Set environment variables in Railway dashboard**

#### Option 3: Deploy to VPS (Ubuntu)

1. **Install Node.js and MongoDB**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs mongodb
```

2. **Clone and setup**
```bash
git clone <repository-url>
cd backend
npm install
```

3. **Setup PM2 for process management**
```bash
npm install -g pm2
pm2 start index.js --name user-management-backend
pm2 startup
pm2 save
```

4. **Setup Nginx as reverse proxy**
```bash
sudo apt install nginx
# Configure nginx to proxy to localhost:8080
```

### Frontend Deployment

#### Option 1: Deploy to Vercel

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
cd frontend
vercel
```

3. **Update API URL in production**
Edit `frontend/src/services/api.js` to use production backend URL

#### Option 2: Deploy to Netlify

1. **Build the project**
```bash
cd frontend
npm run build
```

2. **Deploy via Netlify CLI**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

#### Option 3: Deploy to Static Hosting

1. **Build the project**
```bash
npm run build
```

2. **Upload the `dist` folder to your hosting provider**
- AWS S3 + CloudFront
- GitHub Pages
- Firebase Hosting

---

## 📚 API Documentation

### Base URL
```
http://localhost:8080/api
```

### Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

### 🔓 Public Endpoints

#### 1. User Signup
**POST** `/auth/signup`

Register a new user account.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "65f1234567890abcdef12345",
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "status": "active",
      "createdAt": "2024-01-15T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**
- `400 Bad Request`: Missing fields, invalid email, weak password, or email already exists
- `500 Internal Server Error`: Server error

**Password Requirements:**
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

---

#### 2. User Login
**POST** `/auth/login`

Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "65f1234567890abcdef12345",
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "status": "active",
      "lastLogin": "2024-01-15T10:35:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**
- `400 Bad Request`: Missing email or password
- `401 Unauthorized`: Invalid credentials
- `403 Forbidden`: Account is inactive or suspended

---

### 🔒 Protected Endpoints (Require Authentication)

#### 3. Get Current User
**GET** `/auth/me`

Get information about the currently authenticated user.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "65f1234567890abcdef12345",
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "status": "active",
      "lastLogin": "2024-01-15T10:35:00.000Z",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:35:00.000Z"
    }
  }
}
```

---

#### 4. Logout
**POST** `/auth/logout`

Logout the current user.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

#### 5. Get My Profile
**GET** `/users/profile/me`

Get detailed profile information.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "65f1234567890abcdef12345",
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "status": "active",
      "lastLogin": "2024-01-15T10:35:00.000Z",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:35:00.000Z"
    }
  }
}
```

---

#### 6. Update Profile
**PUT** `/users/profile/update`

Update user's full name and/or email.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "fullName": "John Updated",
  "email": "john.updated@example.com"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user": {
      "id": "65f1234567890abcdef12345",
      "fullName": "John Updated",
      "email": "john.updated@example.com",
      "role": "user",
      "status": "active",
      "updatedAt": "2024-01-15T11:00:00.000Z"
    }
  }
}
```

---

#### 7. Change Password
**PUT** `/users/profile/change-password`

Change user's password.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "currentPassword": "OldPass123!",
  "newPassword": "NewSecurePass456!"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

**Error Responses:**
- `400 Bad Request`: Missing fields or weak password
- `401 Unauthorized`: Current password is incorrect

---

### 👑 Admin/Manager Only Endpoints

#### 8. Get All Users (with Pagination)
**GET** `/users`

Retrieve all users with pagination and filtering.

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `status` (optional): Filter by status (active, inactive, suspended)
- `role` (optional): Filter by role (user, admin, manager)
- `search` (optional): Search by name or email

**Example Request:**
```
GET /users?page=1&limit=10&status=active&search=john
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "_id": "65f1234567890abcdef12345",
        "fullName": "John Doe",
        "email": "john@example.com",
        "role": "user",
        "status": "active",
        "lastLogin": "2024-01-15T10:35:00.000Z",
        "createdAt": "2024-01-15T10:30:00.000Z",
        "updatedAt": "2024-01-15T10:35:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalUsers": 47,
      "limit": 10,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

---

#### 9. Get User by ID
**GET** `/users/:id`

Get detailed information about a specific user.

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "65f1234567890abcdef12345",
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "status": "active",
      "lastLogin": "2024-01-15T10:35:00.000Z",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:35:00.000Z"
    }
  }
}
```

---

#### 10. Activate User
**PUT** `/users/:id/activate`

Activate an inactive or suspended user account.

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "User account activated successfully",
  "data": {
    "user": {
      "id": "65f1234567890abcdef12345",
      "fullName": "John Doe",
      "email": "john@example.com",
      "status": "active",
      "role": "user"
    }
  }
}
```

**Error Responses:**
- `400 Bad Request`: User is already active or trying to activate own account
- `403 Forbidden`: Not authorized (not an admin)
- `404 Not Found`: User not found

---

#### 11. Deactivate User
**PUT** `/users/:id/deactivate`

Deactivate an active user account.

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "User account deactivated successfully",
  "data": {
    "user": {
      "id": "65f1234567890abcdef12345",
      "fullName": "John Doe",
      "email": "john@example.com",
      "status": "inactive",
      "role": "user"
    }
  }
}
```

**Error Responses:**
- `400 Bad Request`: User is already inactive or trying to deactivate own account
- `403 Forbidden`: Not authorized (not an admin)
- `404 Not Found`: User not found

---

### 🏥 System Endpoints

#### 12. Health Check
**GET** `/health`

Check if the server is running.

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## 📝 Error Response Format

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

### Common HTTP Status Codes
- `200 OK`: Request successful
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Authentication required or failed
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

---

## 🧪 Testing the API

### Using cURL

**Signup:**
```bash
curl -X POST http://localhost:8080/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"fullName":"John Doe","email":"john@example.com","password":"SecurePass123!"}'
```

**Login:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"SecurePass123!"}'
```

**Get Current User:**
```bash
curl http://localhost:8080/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Postman

1. Import the API endpoints into Postman
2. Set the base URL: `http://localhost:8080/api`
3. For protected routes, add Authorization header:
   - Type: Bearer Token
   - Token: `<your-jwt-token>`

---

## 👥 User Roles & Permissions

### User
- View own profile
- Update own profile
- Change own password
- Access dashboard

### Manager
- All User permissions
- View all users
- Activate/deactivate users
- Access user management

### Admin
- All Manager permissions
- Full system access
- Manage all user accounts

---

## 🔒 Security Features

- **Password Hashing**: bcrypt with 12 salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Configured CORS policy
- **Rate Limiting**: (Recommended for production)
- **SQL Injection Prevention**: MongoDB with Mongoose ODM
- **XSS Protection**: Input sanitization

---

## 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

SecureAccess

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Support

For support, email support@purplemerit.com or open an issue in the repository.

---

## 🎯 Future Enhancements

- [ ] Email verification
- [ ] Password reset via email
- [ ] Two-factor authentication (2FA)
- [ ] Activity logs and audit trail
- [ ] Export users to CSV
- [ ] Bulk user operations
- [ ] Profile picture uploads
- [ ] Advanced search and filtering
- [ ] Real-time notifications
- [ ] API rate limiting

---

**Built with ❤️ by SecureAccess**
