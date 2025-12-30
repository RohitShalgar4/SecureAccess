# Frontend - User Management System

## Features Implemented ✅

### Login Page
- ✅ Email and password input fields
- ✅ SecureAccess branding
- ✅ Client-side form validation
- ✅ Email format validation
- ✅ Required field validation
- ✅ Redirect to dashboard on success
- ✅ Error message display
- ✅ Link to signup page
- ✅ Professional design with Tailwind CSS (no gradients)

### Signup Page
- ✅ Full name, email, password, confirm password inputs
- ✅ Required field validation
- ✅ Email format validation
- ✅ Password strength validation
- ✅ Real-time password strength feedback
- ✅ Password confirmation matching
- ✅ Server-side error display
- ✅ Redirect to dashboard on success
- ✅ Link to login page
- ✅ Professional design with Tailwind CSS (no gradients)

### Dashboard
- ✅ Welcome message with user name
- ✅ User information display
- ✅ Logout functionality
- ✅ Professional navigation bar

## Design Philosophy

- **Clean & Professional**: Slate color palette (no gradients)
- **Consistent**: Uniform spacing and typography
- **Accessible**: Clear labels and error messages
- **Responsive**: Works on all screen sizes
- **User-Friendly**: Real-time validation feedback

## Quick Start

1. **Install dependencies:**
```cmd
npm install
```

2. **Start development server:**
```cmd
npm run dev
```

Frontend will run on http://localhost:5173

3. **Make sure backend is running:**
Backend should be running on http://localhost:8080

## Project Structure

```
frontend/
├── src/
│   ├── pages/
│   │   ├── Login.jsx          # Login page component
│   │   ├── Signup.jsx         # Signup page component
│   │   └── Dashboard.jsx      # Dashboard component
│   ├── services/
│   │   └── api.js             # API service layer
│   ├── utils/
│   │   └── validation.js      # Validation utilities
│   ├── App.jsx                # Main app component
│   └── index.css              # Global styles
└── package.json
```

## Validation Rules

### Email
- Must be valid email format (user@domain.com)
- Required field

### Password (Signup)
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
- At least 1 special character
- Must match confirmation password

### Full Name
- Minimum 3 characters
- Maximum 50 characters
- Required field

## Color Palette

Professional slate-based design:
- **Primary**: Slate 900 (#0f172a)
- **Background**: Slate 50 (#f8fafc)
- **Borders**: Slate 200 (#e2e8f0)
- **Text**: Slate 900, 700, 600
- **Error**: Red 600, 700
- **Warning**: Amber 700, 800

## Features

### Real-time Validation
- Email format checking
- Password strength indicator
- Instant error feedback
- Clear error messages

### User Experience
- Loading states on buttons
- Smooth transitions
- Focus states on inputs
- Disabled states during submission
- Auto-clear errors on typing

### Security
- JWT token storage in localStorage
- Automatic token validation on load
- Secure password input fields
- Token included in API requests

## API Integration

The frontend connects to the backend API at `http://localhost:8080/api`

Endpoints used:
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user
- `POST /auth/logout` - User logout

## Testing the Application

1. **Start backend server** (port 8080)
2. **Start frontend server** (port 5173)
3. **Open browser** to http://localhost:5173

### Test Flow:
1. Click "Sign up" to create an account
2. Fill in all required fields
3. See real-time password validation
4. Submit form
5. Automatically redirected to dashboard
6. See your user information
7. Click "Logout" to return to login page

## Build for Production

```cmd
npm run build
```

This creates an optimized production build in the `dist` folder.

## Next Steps

Ready to add more features:
- User profile management
- Admin dashboard
- User list with pagination
- Account activation/deactivation
- Password change functionality
