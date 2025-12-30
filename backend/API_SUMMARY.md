# API Summary - Complete Endpoint List

## Base URL
```
http://localhost:8080/api
```

## Authentication Endpoints (Public)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/signup` | Register new user |
| POST | `/auth/login` | Login user |
| GET | `/auth/me` | Get current user (requires token) |
| POST | `/auth/logout` | Logout user (requires token) |

## User Profile Endpoints (Authenticated Users)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users/profile/me` | Get own profile |
| PUT | `/users/profile/update` | Update name/email |
| PUT | `/users/profile/change-password` | Change password |

## User Management Endpoints (Admin Only)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | Get all users (with pagination) |
| GET | `/users/:id` | Get user by ID |
| PUT | `/users/:id/activate` | Activate user account |
| PUT | `/users/:id/deactivate` | Deactivate user account |

## System Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |

---

## Quick Reference

### Authentication Header Format
```
Authorization: Bearer <your-jwt-token>
```

### Common Response Format
```json
{
  "success": true/false,
  "message": "Description",
  "data": { ... }
}
```

### User Roles
- `user` - Regular user (default)
- `manager` - Manager role
- `admin` - Administrator

### User Status
- `active` - Can login and use system
- `inactive` - Cannot login
- `suspended` - Cannot login

---

## Feature Checklist

### ✅ Authentication
- [x] User signup with validation
- [x] User login with credentials
- [x] JWT token generation
- [x] Get current user info
- [x] Logout functionality

### ✅ User Profile Management
- [x] View own profile
- [x] Update full name
- [x] Update email
- [x] Change password

### ✅ Admin User Management
- [x] View all users with pagination
- [x] Filter by status
- [x] Filter by role
- [x] Search by name/email
- [x] View user details
- [x] Activate accounts
- [x] Deactivate accounts

---

## Testing Documentation

- **API_TESTING.md** - Authentication endpoints
- **USER_PROFILE_API.md** - User profile endpoints
- **USER_MANAGEMENT_API.md** - Admin management endpoints

---

## Password Requirements

- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
- At least 1 special character

---

## Pagination Parameters

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

## Filter Parameters

- `status` - active, inactive, suspended
- `role` - user, admin, manager
- `search` - Search by name or email
