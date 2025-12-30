# Backend - User Management System

## Features Implemented ✅

### Authentication
- ✅ User signup with email, password, and full name
- ✅ Email format validation
- ✅ Password strength validation (8+ chars, uppercase, lowercase, number, special char)
- ✅ Authentication token generation on signup
- ✅ User login with email and password
- ✅ Credentials verification
- ✅ Authentication token on login
- ✅ Endpoint to get current user information
- ✅ User logout functionality

### User Management - Admin Functions
- ✅ View all users with pagination
- ✅ Filter users by status (active/inactive/suspended)
- ✅ Filter users by role (user/admin/manager)
- ✅ Search users by name or email
- ✅ Get user details by ID
- ✅ Activate user accounts
- ✅ Deactivate user accounts

### User Management - User Functions
- ✅ View own profile information
- ✅ Update full name and email
- ✅ Change password with current password verification

## Quick Start

1. **Install dependencies:**
```cmd
npm install
```

2. **Setup environment variables:**
```cmd
copy .env.example .env
```

Edit `.env` file:
```
PORT=8080
MONGO_URI=mongodb://localhost:27017/user-management
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=7d
```

3. **Start the server:**
```cmd
npm run dev
```

Server will run on http://localhost:8080

## Project Structure

```
backend/
├── controllers/
│   ├── authController.js      # Authentication logic
│   └── userController.js      # User management logic
├── middleware/
│   ├── auth.js                # JWT verification middleware
│   └── authorize.js           # Role-based authorization
├── models/
│   └── User.js                # User schema with validation
├── routes/
│   ├── authRoutes.js          # Auth endpoints
│   └── userRoutes.js          # User management endpoints
├── utils/
│   ├── jwt.js                 # Token generation/verification
│   └── validators.js          # Email & password validation
├── database/
│   └── db.js                  # MongoDB connection
└── index.js                   # Server entry point
```

## API Endpoints

### Authentication
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/signup` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login user |
| GET | `/api/auth/me` | Private | Get current user |
| POST | `/api/auth/logout` | Private | Logout user |

### User Management (Admin Only)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/users` | Admin | Get all users with pagination |
| GET | `/api/users/:id` | Admin | Get user by ID |
| PUT | `/api/users/:id/activate` | Admin | Activate user account |
| PUT | `/api/users/:id/deactivate` | Admin | Deactivate user account |

### User Profile (Any Authenticated User)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/users/profile/me` | Private | Get own profile |
| PUT | `/api/users/profile/update` | Private | Update name/email |
| PUT | `/api/users/profile/change-password` | Private | Change password |

### System
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/health` | Public | Health check |

## Testing

See documentation for detailed testing:
- `API_TESTING.md` - Authentication endpoints
- `USER_MANAGEMENT_API.md` - Admin user management endpoints
- `USER_PROFILE_API.md` - User profile management endpoints

Quick test:
```bash
# Health check
curl http://localhost:8080/api/health

# Signup
curl -X POST http://localhost:8080/api/auth/signup ^
  -H "Content-Type: application/json" ^
  -d "{\"fullName\":\"John Doe\",\"email\":\"john@example.com\",\"password\":\"SecurePass123!\"}"

# Get your profile
curl http://localhost:8080/api/users/profile/me ^
  -H "Authorization: Bearer YOUR_TOKEN"

# Update your profile
curl -X PUT http://localhost:8080/api/users/profile/update ^
  -H "Authorization: Bearer YOUR_TOKEN" ^
  -H "Content-Type: application/json" ^
  -d "{\"fullName\":\"John Updated\"}"
```

### Creating an Admin User

First user needs to be manually promoted to admin:
```javascript
// In MongoDB shell or Compass
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

## Security Features

- Passwords hashed with bcrypt (12 rounds)
- JWT tokens for stateless authentication
- Email validation with regex
- Strong password requirements
- Protected routes with middleware
- Account status checking (active/inactive/suspended)

## Next Steps

Ready for the next feature! Let me know what you'd like to implement next.
