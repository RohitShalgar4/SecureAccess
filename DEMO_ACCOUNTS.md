# Demo Accounts - User Management System

## 🎮 Test Credentials

Use these demo accounts to test the User Management System:

---

## Regular User Account

### Credentials
- **Email**: `user@gmail.com`
- **Password**: `User@123`

### Access Level
- ✅ View Dashboard
- ✅ View own profile
- ✅ Edit profile (name, email)
- ✅ Change password
- ❌ Cannot access User Management

### What You Can Test
1. Login with user credentials
2. View welcome dashboard
3. Navigate to Profile page
4. Edit your name and email
5. Change your password
6. Logout

---

## Admin Account

### Credentials
- **Email**: `admin@gmail.com`
- **Password**: `Admin@123`

### Access Level
- ✅ View Dashboard
- ✅ View own profile
- ✅ Edit profile (name, email)
- ✅ Change password
- ✅ **Access User Management**
- ✅ **View all users**
- ✅ **Activate/Deactivate users**

### What You Can Test
1. Login with admin credentials
2. View dashboard with User Management section
3. See all users in a table
4. Use pagination (if more than 10 users)
5. Activate/Deactivate user accounts
6. See confirmation dialogs
7. Navigate to Profile page
8. Edit your profile
9. Logout

---

## 🚀 Quick Start Testing

### Step 1: Create Demo Accounts

**Option A: Using the UI (Recommended)**

1. Start the application
2. Go to Signup page
3. Create user account:
   - Full Name: `Demo User`
   - Email: `user@gmail.com`
   - Password: `User@123`
   - Confirm Password: `User@123`
4. Logout
5. Create admin account:
   - Full Name: `Demo Admin`
   - Email: `admin@gmail.com`
   - Password: `Admin@123`
   - Confirm Password: `Admin@123`
6. Update admin role in MongoDB:
   ```javascript
   db.users.updateOne(
     { email: "admin@gmail.com" },
     { $set: { role: "admin" } }
   )
   ```

**Option B: Using MongoDB Directly**

Insert these documents into your `users` collection:

```javascript
// User Account
db.users.insertOne({
  fullName: "Demo User",
  email: "user@gmail.com",
  password: "$2a$12$hashed_password_here", // Hash "User@123" with bcrypt
  role: "user",
  status: "active",
  createdAt: new Date(),
  updatedAt: new Date()
})

// Admin Account
db.users.insertOne({
  fullName: "Demo Admin",
  email: "admin@gmail.com",
  password: "$2a$12$hashed_password_here", // Hash "Admin@123" with bcrypt
  role: "admin",
  status: "active",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

---

## 🧪 Testing Scenarios

### Scenario 1: Regular User Flow
1. Login as `user@gmail.com`
2. See welcome dashboard
3. Notice no User Management section
4. Click Profile
5. Edit your name
6. Save changes
7. See success toast
8. Change password
9. Logout
10. Login with new password

### Scenario 2: Admin User Flow
1. Login as `admin@gmail.com`
2. See welcome dashboard
3. Scroll down to see User Management table
4. View all users
5. Click "Deactivate" on a user
6. See confirmation dialog
7. Confirm action
8. See success toast
9. User status changes to "inactive"
10. Click "Activate" to reactivate
11. Navigate to Profile
12. Edit profile
13. Logout

### Scenario 3: Authentication Testing
1. Try login with wrong password → See error
2. Try login with non-existent email → See error
3. Try accessing profile without login → Redirected to login
4. Login successfully → Redirected to dashboard
5. Refresh page → Still logged in
6. Logout → Redirected to login

### Scenario 4: Validation Testing
1. Go to Signup page
2. Try weak password → See validation errors
3. Try invalid email → See error
4. Try mismatched passwords → See error
5. Fill correctly → Account created

---

## 🔒 Security Notes

### Password Requirements
Both demo passwords meet the requirements:
- ✅ Minimum 8 characters
- ✅ At least one uppercase letter (U/A)
- ✅ At least one lowercase letter (ser/dmin)
- ✅ At least one number (123)
- ✅ At least one special character (@)

### Production Warning
⚠️ **Important**: These are demo credentials for testing only!

For production:
1. Never use these credentials
2. Create strong, unique passwords
3. Use environment-specific accounts
4. Implement password rotation
5. Enable two-factor authentication (if implemented)

---

## 📊 Expected Behavior

### User Dashboard
```
┌─────────────────────────────────────┐
│ Welcome, Demo User!                 │
│                                     │
│ Account Information                 │
│ Email: user@gmail.com              │
│ Role: user                         │
│ Status: active                     │
└─────────────────────────────────────┘
```

### Admin Dashboard
```
┌─────────────────────────────────────┐
│ Welcome, Demo Admin!                │
│                                     │
│ Account Information                 │
│ Email: admin@gmail.com             │
│ Role: admin                        │
│ Status: active                     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ User Management                     │
│                                     │
│ Email         Name      Role Status │
│ user@...      Demo User user active │
│ admin@...     Demo Adm. admin active│
│                                     │
│ [Pagination: 1 2 3 ...]            │
└─────────────────────────────────────┘
```

---

## 🎯 Testing Checklist

### Authentication
- [ ] Login with user account
- [ ] Login with admin account
- [ ] Login with wrong password (should fail)
- [ ] Logout functionality
- [ ] Session persistence (refresh page)

### User Features
- [ ] View dashboard
- [ ] View profile
- [ ] Edit name
- [ ] Edit email
- [ ] Change password
- [ ] See validation errors
- [ ] See success messages

### Admin Features
- [ ] View User Management table
- [ ] See all users
- [ ] Activate user
- [ ] Deactivate user
- [ ] See confirmation dialogs
- [ ] Pagination works
- [ ] Cannot deactivate self

### UI/UX
- [ ] Purple theme applied
- [ ] Toast notifications appear
- [ ] Loading states show
- [ ] Error messages clear
- [ ] Navigation works
- [ ] Responsive on mobile

---

## 🆘 Troubleshooting

### Can't Login
- Check backend is running on port 8080
- Check MongoDB is connected
- Verify accounts exist in database
- Check password is correct (case-sensitive)

### Admin Can't See User Management
- Verify role is "admin" in database
- Logout and login again
- Check browser console for errors

### Changes Not Saving
- Check backend API is responding
- Check browser console for errors
- Verify token is valid
- Try logout and login again

---

## 📞 Support

If you encounter issues with demo accounts:
1. Check the main README.md
2. Verify backend and frontend are running
3. Check MongoDB connection
4. Review browser console for errors
5. Check backend logs

---

**Happy Testing! 🎉**

Demo accounts are ready to use. Start testing the User Management System with full admin and user capabilities!
