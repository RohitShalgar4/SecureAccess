# Admin Dashboard - Complete Guide

## Features Implemented ✅

### 1. User Table Display
- ✅ Shows all users in a clean, professional table
- ✅ Columns: Email, Full Name, Role, Status, Actions
- ✅ Color-coded badges for roles and statuses
- ✅ Responsive design
- ✅ Hover effects on rows

### 2. Pagination
- ✅ 10 users per page
- ✅ Page numbers with navigation
- ✅ Previous/Next buttons
- ✅ Shows current page and total users
- ✅ Disabled state for first/last page

### 3. User Actions
- ✅ **Activate button** (green) - for inactive/suspended users
- ✅ **Deactivate button** (red) - for active users
- ✅ Cannot activate/deactivate yourself
- ✅ Shows "You" label for current user

### 4. Confirmation Dialog
- ✅ Modal popup before any action
- ✅ Clear title and message
- ✅ Different colors for activate (blue) vs deactivate (red)
- ✅ Confirm and Cancel buttons
- ✅ Click outside to cancel

### 5. Toast Notifications
- ✅ Success message (green) after activation
- ✅ Success message (green) after deactivation
- ✅ Error message (red) if action fails
- ✅ Auto-dismiss after 5 seconds

## User Roles & Access

### Admin
- Can see Admin Dashboard
- Can activate/deactivate any user (except themselves)
- Can see all user information

### Manager
- Can see Admin Dashboard
- Can activate/deactivate any user (except themselves)
- Can see all user information

### User
- Sees regular Dashboard (not Admin Dashboard)
- Cannot manage other users
- Can only see their own information

## How to Test

### Step 1: Create Admin User
```bash
# 1. Signup as a regular user
# 2. In MongoDB, update the user's role to 'admin':

db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)

# 3. Logout and login again
```

### Step 2: Test Admin Dashboard
1. Login as admin
2. You should see the Admin Dashboard with user table
3. See all users listed with their details

### Step 3: Test Pagination
1. If you have more than 10 users, you'll see pagination
2. Click page numbers to navigate
3. Use Previous/Next buttons
4. Notice the "Showing X to Y of Z users" text

### Step 4: Test Deactivate User
1. Find an active user in the table
2. Click "Deactivate" button
3. Confirmation dialog appears
4. Read the message
5. Click "Deactivate" to confirm (or Cancel to abort)
6. Green toast appears: "User has been deactivated successfully"
7. User's status changes to "inactive"
8. Button changes to "Activate"

### Step 5: Test Activate User
1. Find an inactive user in the table
2. Click "Activate" button
3. Confirmation dialog appears
4. Click "Activate" to confirm
5. Green toast appears: "User has been activated successfully"
6. User's status changes to "active"
7. Button changes to "Deactivate"

### Step 6: Test Self-Protection
1. Find your own user in the table
2. Notice there's no Activate/Deactivate button
3. Instead, it shows "You" label
4. This prevents you from deactivating yourself

### Step 7: Test Error Handling
1. Try to deactivate a user
2. If backend returns error, red toast appears
3. Error message is displayed

## Visual Design

### Color Scheme
- **Active Status**: Green badge
- **Inactive Status**: Gray badge
- **Suspended Status**: Red badge
- **Admin Role**: Purple badge
- **Manager Role**: Blue badge
- **User Role**: Gray badge

### Table Design
- Clean white background
- Gray borders
- Hover effect on rows
- Professional spacing
- Responsive layout

### Buttons
- **Activate**: Green text, hover effect
- **Deactivate**: Red text, hover effect
- **Logout**: Gray border, hover effect

### Confirmation Dialog
- Modal overlay (semi-transparent black)
- White card with shadow
- Icon (warning for deactivate, info for activate)
- Clear typography
- Action buttons at bottom

## API Endpoints Used

1. **GET /api/users?page=1&limit=10**
   - Fetches users with pagination
   - Returns users array and pagination info

2. **PUT /api/users/:id/activate**
   - Activates a user
   - Returns success message

3. **PUT /api/users/:id/deactivate**
   - Deactivates a user
   - Returns success message

## Files Created

1. **frontend/src/pages/AdminDashboard.jsx**
   - Main admin dashboard component
   - User table with pagination
   - Action handlers

2. **frontend/src/components/ConfirmDialog.jsx**
   - Reusable confirmation modal
   - Customizable title, message, buttons
   - Different types (danger, info)

3. **frontend/src/services/api.js** (updated)
   - Added userAPI.getAllUsers()
   - Added userAPI.activateUser()
   - Added userAPI.deactivateUser()

4. **frontend/src/App.jsx** (updated)
   - Routes to AdminDashboard for admin/manager
   - Routes to regular Dashboard for users

## Common Issues & Solutions

### Issue: "Not authorized" error
**Solution**: Make sure you're logged in as admin or manager

### Issue: Can't see Admin Dashboard
**Solution**: Check your user role in MongoDB. Must be 'admin' or 'manager'

### Issue: Pagination not working
**Solution**: Make sure backend is running and returning pagination data

### Issue: Actions not working
**Solution**: Check browser console for errors. Verify backend endpoints are working

## Next Steps

The Admin Dashboard is now fully functional! You can:
- View all users
- Activate/deactivate users
- Navigate through pages
- See confirmation dialogs
- Get success/error notifications

All features are working correctly with proper error handling and user feedback!
