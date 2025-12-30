# Complete Testing Guide

## Prerequisites

1. **MongoDB** - Running locally or on Atlas
2. **Node.js** - v18 or higher installed
3. **Two terminal windows** - One for backend, one for frontend

## Setup Instructions

### Backend Setup

1. Navigate to backend folder:
```cmd
cd backend
```

2. Install dependencies (if not already done):
```cmd
npm install
```

3. Create `.env` file from example:
```cmd
copy .env.example .env
```

4. Update `.env` with your values:
```
PORT=8080
MONGO_URI=mongodb://localhost:27017/user-management
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=7d
```

5. Start backend server:
```cmd
npm run dev
```

You should see:
```
Server listening at port 8080
MongoDB Connected: localhost
```

### Frontend Setup

1. Open a new terminal and navigate to frontend folder:
```cmd
cd frontend
```

2. Install dependencies (if not already done):
```cmd
npm install
```

3. Start frontend development server:
```cmd
npm run dev
```

You should see:
```
VITE ready in XXX ms
➜  Local:   http://localhost:5173/
```

## Testing the Application

### Test 1: Signup Flow

1. Open browser to http://localhost:5173
2. You should see the Login page
3. Click "Sign up" link at the bottom
4. Fill in the signup form:
   - **Full Name**: John Doe
   - **Email**: john@example.com
   - **Password**: SecurePass123!
   - **Confirm Password**: SecurePass123!

5. **Test Validations:**
   - Try submitting with empty fields → See error messages
   - Try invalid email (e.g., "invalid") → See email error
   - Try weak password (e.g., "pass") → See password requirements
   - Try mismatched passwords → See confirmation error

6. Fill in valid data and click "Create Account"
7. You should be redirected to Dashboard
8. See your name and email displayed

### Test 2: Logout and Login

1. Click "Logout" button in the dashboard
2. You should be redirected to Login page
3. Try logging in with wrong password → See error message
4. Login with correct credentials:
   - **Email**: john@example.com
   - **Password**: SecurePass123!
5. You should be redirected to Dashboard

### Test 3: Form Validation (Login)

1. On Login page, try submitting empty form → See errors
2. Enter invalid email → See email format error
3. Enter valid email but no password → See password required error
4. Enter wrong password → See "Invalid email or password" error

### Test 4: Form Validation (Signup)

1. Navigate to Signup page
2. Test each validation:
   - **Full Name**: Try "Jo" (too short) → See error
   - **Email**: Try "notanemail" → See format error
   - **Password**: Try "short" → See strength requirements
   - **Password**: Type a password and watch real-time feedback
   - **Confirm Password**: Type different password → See mismatch error

### Test 5: Session Persistence

1. Login to your account
2. Refresh the page (F5)
3. You should still be logged in (stay on Dashboard)
4. Close the browser tab
5. Open http://localhost:5173 again
6. You should still be logged in

### Test 6: Multiple Users

1. Logout from current account
2. Create a second user:
   - **Full Name**: Jane Smith
   - **Email**: jane@example.com
   - **Password**: AnotherPass456!
3. Should successfully create account
4. Logout and login as first user (john@example.com)
5. Should work correctly

### Test 7: Duplicate Email

1. Logout if logged in
2. Try to signup with an existing email (e.g., john@example.com)
3. Should see error: "Email is already registered"

## Visual Checks

### Design Quality
- ✅ No gradients used (clean slate colors)
- ✅ Consistent spacing and padding
- ✅ Professional typography
- ✅ Clear visual hierarchy
- ✅ Proper focus states on inputs
- ✅ Smooth transitions
- ✅ Responsive layout

### User Experience
- ✅ Clear error messages
- ✅ Loading states on buttons
- ✅ Real-time validation feedback
- ✅ Password strength indicator
- ✅ Easy navigation between pages
- ✅ Intuitive form layout

## Common Issues & Solutions

### Issue: "Failed to fetch" error
**Solution**: Make sure backend is running on port 8080

### Issue: "MongoDB connection failed"
**Solution**: Check MongoDB is running and MONGO_URI is correct

### Issue: Page is blank
**Solution**: Check browser console for errors, ensure frontend is running

### Issue: Styles not loading
**Solution**: Make sure Tailwind CSS is properly configured in vite.config.js

### Issue: Token expired
**Solution**: Logout and login again, or clear localStorage

## Browser Console Testing

Open browser DevTools (F12) and check:

1. **Network Tab**: See API requests to http://localhost:8080
2. **Console Tab**: Should have no errors
3. **Application Tab** → Local Storage: See 'token' stored after login

## API Testing (Optional)

You can also test the backend directly:

```bash
# Health check
curl http://localhost:8080/api/health

# Signup
curl -X POST http://localhost:8080/api/auth/signup ^
  -H "Content-Type: application/json" ^
  -d "{\"fullName\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"TestPass123!\"}"

# Login
curl -X POST http://localhost:8080/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@example.com\",\"password\":\"TestPass123!\"}"
```

## Success Criteria

All tests should pass:
- ✅ Signup creates new user and redirects to dashboard
- ✅ Login authenticates user and redirects to dashboard
- ✅ Logout clears session and redirects to login
- ✅ Form validations work correctly
- ✅ Error messages display properly
- ✅ Session persists across page refreshes
- ✅ Design looks professional (no gradients)
- ✅ All interactions are smooth and responsive

## Next Steps

Once basic authentication is working, you can test:
- User profile management
- Admin functions
- Password change
- Account activation/deactivation
