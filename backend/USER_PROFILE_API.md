# User Profile API - User Functions

## Overview

These endpoints allow any authenticated user to manage their own profile. No admin privileges required.

## Prerequisites

1. User must be logged in
2. Include JWT token in Authorization header
3. Users can only modify their own profile

## API Endpoints

### 1. Get Own Profile Information
**GET** `/api/users/profile/me`

Retrieve your own profile information.

**Headers:**
```
Authorization: Bearer <your-token>
```

**Example:**
```bash
curl http://localhost:8080/api/users/profile/me ^
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Success Response (200):**
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

**Error Responses:**
- 401: Not authenticated or invalid token
- 404: User not found
- 500: Server error

---

### 2. Update Profile (Full Name and Email)
**PUT** `/api/users/profile/update`

Update your full name and/or email address.

**Headers:**
```
Authorization: Bearer <your-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "fullName": "John Smith",
  "email": "johnsmith@example.com"
}
```

**Notes:**
- You can update just full name, just email, or both
- At least one field must be provided
- Full name: 3-50 characters
- Email must be valid format and not already in use

**Examples:**

Update full name only:
```bash
curl -X PUT http://localhost:8080/api/users/profile/update ^
  -H "Authorization: Bearer YOUR_TOKEN" ^
  -H "Content-Type: application/json" ^
  -d "{\"fullName\":\"John Smith\"}"
```

Update email only:
```bash
curl -X PUT http://localhost:8080/api/users/profile/update ^
  -H "Authorization: Bearer YOUR_TOKEN" ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"newemail@example.com\"}"
```

Update both:
```bash
curl -X PUT http://localhost:8080/api/users/profile/update ^
  -H "Authorization: Bearer YOUR_TOKEN" ^
  -H "Content-Type: application/json" ^
  -d "{\"fullName\":\"John Smith\",\"email\":\"johnsmith@example.com\"}"
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user": {
      "id": "65f1234567890abcdef12345",
      "fullName": "John Smith",
      "email": "johnsmith@example.com",
      "role": "user",
      "status": "active",
      "updatedAt": "2024-01-15T11:00:00.000Z"
    }
  }
}
```

**Error Responses:**
- 400: Missing fields, invalid data, or email already in use
- 401: Not authenticated
- 404: User not found
- 500: Server error

**Validation Rules:**
- Full name: minimum 3 characters, maximum 50 characters
- Email: must be valid format (user@domain.com)
- Email: must not be used by another account

---

### 3. Change Password
**PUT** `/api/users/profile/change-password`

Change your account password.

**Headers:**
```
Authorization: Bearer <your-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "currentPassword": "OldPass123!",
  "newPassword": "NewSecurePass456!"
}
```

**Example:**
```bash
curl -X PUT http://localhost:8080/api/users/profile/change-password ^
  -H "Authorization: Bearer YOUR_TOKEN" ^
  -H "Content-Type: application/json" ^
  -d "{\"currentPassword\":\"OldPass123!\",\"newPassword\":\"NewSecurePass456!\"}"
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

**Error Responses:**
- 400: Missing fields, weak password, or same as current password
- 401: Current password is incorrect or not authenticated
- 404: User not found
- 500: Server error

**Password Requirements:**
- Minimum 8 characters
- At least one uppercase letter (A-Z)
- At least one lowercase letter (a-z)
- At least one number (0-9)
- At least one special character (!@#$%^&*(),.?":{}|<>)
- Must be different from current password

**Example Error Response (400):**
```json
{
  "success": false,
  "message": "New password does not meet requirements",
  "errors": [
    "Password must contain at least one uppercase letter",
    "Password must contain at least one special character"
  ]
}
```

---

## Testing Flow

### Step 1: Login and Get Token
```bash
curl -X POST http://localhost:8080/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"john@example.com\",\"password\":\"SecurePass123!\"}"
```

Save the token from the response.

### Step 2: View Your Profile
```bash
curl http://localhost:8080/api/users/profile/me ^
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Step 3: Update Your Profile
```bash
curl -X PUT http://localhost:8080/api/users/profile/update ^
  -H "Authorization: Bearer YOUR_TOKEN" ^
  -H "Content-Type: application/json" ^
  -d "{\"fullName\":\"John Updated\"}"
```

### Step 4: Change Your Password
```bash
curl -X PUT http://localhost:8080/api/users/profile/change-password ^
  -H "Authorization: Bearer YOUR_TOKEN" ^
  -H "Content-Type: application/json" ^
  -d "{\"currentPassword\":\"SecurePass123!\",\"newPassword\":\"NewPass456!\"}"
```

### Step 5: Login with New Password
```bash
curl -X POST http://localhost:8080/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"john@example.com\",\"password\":\"NewPass456!\"}"
```

---

## Common Use Cases

### Update Just Your Name
```bash
curl -X PUT http://localhost:8080/api/users/profile/update ^
  -H "Authorization: Bearer YOUR_TOKEN" ^
  -H "Content-Type: application/json" ^
  -d "{\"fullName\":\"Jane Doe\"}"
```

### Update Just Your Email
```bash
curl -X PUT http://localhost:8080/api/users/profile/update ^
  -H "Authorization: Bearer YOUR_TOKEN" ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"jane.doe@newcompany.com\"}"
```

### Complete Profile Update
```bash
curl -X PUT http://localhost:8080/api/users/profile/update ^
  -H "Authorization: Bearer YOUR_TOKEN" ^
  -H "Content-Type: application/json" ^
  -d "{\"fullName\":\"Jane Doe\",\"email\":\"jane.doe@newcompany.com\"}"
```

---

## Security Notes

- Users can only view and modify their own profile
- Current password verification required for password changes
- Email uniqueness is enforced across all users
- New password must be different from current password
- All endpoints require valid JWT authentication
- Password is never returned in API responses

---

## Validation Examples

### Valid Full Names:
✅ "John Doe"
✅ "Jane Smith-Johnson"
✅ "María García"

### Invalid Full Names:
❌ "Jo" (too short, minimum 3 characters)
❌ "" (empty)
❌ "A very long name that exceeds fifty characters limit" (too long)

### Valid Emails:
✅ user@example.com
✅ john.doe@company.co.uk
✅ test123@domain.org

### Invalid Emails:
❌ invalid.email
❌ @example.com
❌ user@.com

### Valid Passwords:
✅ SecurePass123!
✅ MyP@ssw0rd
✅ Test1234#

### Invalid Passwords:
❌ short (too short)
❌ nouppercase123! (no uppercase)
❌ NOLOWERCASE123! (no lowercase)
❌ NoNumbers! (no numbers)
❌ NoSpecial123 (no special character)
