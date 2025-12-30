# Backend - Authentication System

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
│   └── authController.js      # Authentication logic
├── middleware/
│   └── auth.js                # JWT verification middleware
├── models/
│   └── User.js                # User schema with validation
├── routes/
│   └── authRoutes.js          # Auth endpoints
├── utils/
│   ├── jwt.js                 # Token generation/verification
│   └── validators.js          # Email & password validation
├── database/
│   └── db.js                  # MongoDB connection
└── index.js                   # Server entry point
```

## API Endpoints

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/signup` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login user |
| GET | `/api/auth/me` | Private | Get current user |
| POST | `/api/auth/logout` | Private | Logout user |
| GET | `/api/health` | Public | Health check |

## Testing

See `API_TESTING.md` for detailed testing instructions and examples.

Quick test:
```bash
# Health check
curl http://localhost:8080/api/health

# Signup
curl -X POST http://localhost:8080/api/auth/signup ^
  -H "Content-Type: application/json" ^
  -d "{\"fullName\":\"John Doe\",\"email\":\"john@example.com\",\"password\":\"SecurePass123!\"}"
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
