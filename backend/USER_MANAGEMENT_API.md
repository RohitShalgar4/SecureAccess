# User Management API - Admin Functions

## Prerequisites

1. You must be logged in as an admin user
2. Include the JWT token in the Authorization header for all requests
3. First user needs to be manually promoted to admin in MongoDB:

```javascript
// In MongoDB shell or Compass
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

## API Endpoints

### 1. Get All Users (with Pagination)
**GET** `/api/users`

Retrieve all users with pagination, filtering, and search capabilities.

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Query Parameters:**
- `page` (optional) - Page number (default: 1)
- `limit` (optional) - Items per page (default: 10)
- `status` (optional) - Filter by status: active, inactive, suspended
- `role` (optional) - Filter by role: user, admin, manager
- `search` (optional) - Search by name or email

**Examples:**

Get first page (10 users):
```bash
curl http://localhost:8080/api/users ^
  -H "Authorization: Bearer YOUR_TOKEN"
```

Get page 2 with 20 users per page:
```bash
curl "http://localhost:8080/api/users?page=2&limit=20" ^
  -H "Authorization: Bearer YOUR_TOKEN"
```

Filter active users only:
```bash
curl "http://localhost:8080/api/users?status=active" ^
  -H "Authorization: Bearer YOUR_TOKEN"
```

Search for users:
```bash
curl "http://localhost:8080/api/users?search=john" ^
  -H "Authorization: Bearer YOUR_TOKEN"
```

Combined filters:
```bash
curl "http://localhost:8080/api/users?page=1&limit=10&status=active&role=user&search=john" ^
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Success Response (200):**
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

**Error Responses:**
- 401: Not authenticated or invalid token
- 403: Not authorized (not an admin)
- 500: Server error

---

### 2. Get User by ID
**GET** `/api/users/:id`

Get detailed information about a specific user.

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Example:**
```bash
curl http://localhost:8080/api/users/65f1234567890abcdef12345 ^
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Success Response (200):**
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

**Error Responses:**
- 401: Not authenticated
- 403: Not authorized (not an admin)
- 404: User not found
- 500: Server error

---

### 3. Activate User Account
**PUT** `/api/users/:id/activate`

Activate an inactive or suspended user account.

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Example:**
```bash
curl -X PUT http://localhost:8080/api/users/65f1234567890abcdef12345/activate ^
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Success Response (200):**
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
- 400: User is already active or trying to activate own account
- 401: Not authenticated
- 403: Not authorized (not an admin)
- 404: User not found
- 500: Server error

**Business Rules:**
- Cannot activate an already active account
- Admin cannot activate their own account
- Changes status from 'inactive' or 'suspended' to 'active'

---

### 4. Deactivate User Account
**PUT** `/api/users/:id/deactivate`

Deactivate an active user account.

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Example:**
```bash
curl -X PUT http://localhost:8080/api/users/65f1234567890abcdef12345/deactivate ^
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Success Response (200):**
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
- 400: User is already inactive or trying to deactivate own account
- 401: Not authenticated
- 403: Not authorized (not an admin)
- 404: User not found
- 500: Server error

**Business Rules:**
- Cannot deactivate an already inactive account
- Admin cannot deactivate their own account
- Changes status from 'active' to 'inactive'
- Deactivated users cannot login

---

## Testing Flow

### Step 1: Create Admin User
```bash
# 1. Signup as regular user
curl -X POST http://localhost:8080/api/auth/signup ^
  -H "Content-Type: application/json" ^
  -d "{\"fullName\":\"Admin User\",\"email\":\"admin@example.com\",\"password\":\"AdminPass123!\"}"

# 2. Manually update role in MongoDB to 'admin'
# 3. Login to get admin token
curl -X POST http://localhost:8080/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@example.com\",\"password\":\"AdminPass123!\"}"
```

### Step 2: Create Test Users
```bash
# Create a few test users
curl -X POST http://localhost:8080/api/auth/signup ^
  -H "Content-Type: application/json" ^
  -d "{\"fullName\":\"Test User 1\",\"email\":\"user1@example.com\",\"password\":\"TestPass123!\"}"

curl -X POST http://localhost:8080/api/auth/signup ^
  -H "Content-Type: application/json" ^
  -d "{\"fullName\":\"Test User 2\",\"email\":\"user2@example.com\",\"password\":\"TestPass123!\"}"
```

### Step 3: Test Admin Functions
```bash
# Get all users
curl http://localhost:8080/api/users ^
  -H "Authorization: Bearer ADMIN_TOKEN"

# Get specific user (use ID from previous response)
curl http://localhost:8080/api/users/USER_ID ^
  -H "Authorization: Bearer ADMIN_TOKEN"

# Deactivate user
curl -X PUT http://localhost:8080/api/users/USER_ID/deactivate ^
  -H "Authorization: Bearer ADMIN_TOKEN"

# Activate user
curl -X PUT http://localhost:8080/api/users/USER_ID/activate ^
  -H "Authorization: Bearer ADMIN_TOKEN"
```

## Pagination Examples

**Small dataset (5 users per page):**
```bash
curl "http://localhost:8080/api/users?limit=5" ^
  -H "Authorization: Bearer ADMIN_TOKEN"
```

**Navigate pages:**
```bash
# Page 1
curl "http://localhost:8080/api/users?page=1&limit=10" ^
  -H "Authorization: Bearer ADMIN_TOKEN"

# Page 2
curl "http://localhost:8080/api/users?page=2&limit=10" ^
  -H "Authorization: Bearer ADMIN_TOKEN"
```

## Filter Examples

**Active users only:**
```bash
curl "http://localhost:8080/api/users?status=active" ^
  -H "Authorization: Bearer ADMIN_TOKEN"
```

**Inactive users only:**
```bash
curl "http://localhost:8080/api/users?status=inactive" ^
  -H "Authorization: Bearer ADMIN_TOKEN"
```

**Admin users only:**
```bash
curl "http://localhost:8080/api/users?role=admin" ^
  -H "Authorization: Bearer ADMIN_TOKEN"
```

**Search by name or email:**
```bash
curl "http://localhost:8080/api/users?search=john" ^
  -H "Authorization: Bearer ADMIN_TOKEN"
```

## Notes

- All endpoints require admin authentication
- Pagination defaults: page=1, limit=10
- Maximum recommended limit: 100 users per page
- Search is case-insensitive
- Filters can be combined
- Deactivated users cannot login until reactivated
- Admins cannot activate/deactivate their own accounts
