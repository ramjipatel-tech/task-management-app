# TaskFlow - Premium Task Management Application

![TaskFlow Banner](https://via.placeholder.com/1200x400?text=TaskFlow+-+Premium+Task+Management)

A production-quality, full-stack task management application built with modern technologies. Designed and developed by **Ramji Patel**.

## 🎯 Overview

TaskFlow is a sophisticated task management platform that enables users to organize, prioritize, and track their work efficiently. Built with a focus on user experience, security, and performance.

**Live Demo:** [TaskFlow Live](https://taskflow-demo.vercel.app)

## ✨ Features

### Core Functionality
- ✅ **Task Management**: Create, read, update, and delete tasks
- 🏷️ **Priority Levels**: Low, Medium, High priority tasks
- 📊 **Task Status**: Pending, In Progress, Completed
- 📅 **Due Dates**: Set and track task deadlines
- 🔍 **Search**: Search tasks by title and description
- 🎯 **Filtering**: Filter by status, priority, and due date
- 📈 **Sorting**: Sort by newest, oldest, due date, or priority

### User Features
- 🔐 **Authentication**: Secure JWT-based authentication
- 👤 **User Profiles**: Manage user profile and account
- 🌓 **Dark/Light Mode**: Toggle between themes
- 📱 **Responsive Design**: Works on mobile, tablet, and desktop
- ⚡ **Real-time Updates**: Instant task synchronization

### Advanced Features
- 📊 **Task Statistics**: View total, pending, in-progress, and completed tasks
- 📧 **Email Notifications**: Welcome emails on registration
- 🔒 **Security**: Password hashing, JWT, CORS, Rate limiting
- 🎨 **Premium UI**: Modern, professional design

## 🛠️ Tech Stack

### Frontend
- **React.js** 18.2.0 - UI library
- **Vite** 5.0.8 - Build tool
- **React Router DOM** 6.20.0 - Routing
- **Axios** 1.6.2 - HTTP client
- **CSS3** - Styling with custom design system

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** 4.18.2 - Web framework
- **MySQL** 8.0+ - Database
- **JWT** 9.1.2 - Authentication
- **bcryptjs** 2.4.3 - Password hashing
- **Nodemailer** 6.9.7 - Email service

### Additional Libraries
- **express-rate-limit** - Rate limiting
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

## 📁 Project Structure

```
task-management-app/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   └── email.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── taskController.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── errorHandler.js
│   │   │   └── rateLimiter.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── taskRoutes.js
│   │   └── server.js
│   ├── schema.sql
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── StatCard.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── pages/
│   │   │   ├── Landing.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Auth/
│   │   │       ├── Login.jsx
│   │   │       └── Register.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── taskService.js
│   │   ├── styles/
│   │   │   └── index.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── .env.example
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- MySQL 8.0+
- npm or yarn

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/ramjipatel-tech/task-management-app.git
cd task-management-app
```

#### 2. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp ../.env.example .env

# Update .env with your configuration
```

**Database Setup:**
```bash
# Login to MySQL
mysql -u root -p

# Run schema
source schema.sql
```

**Start Backend:**
```bash
npm run dev
# Server runs on http://localhost:5000
```

#### 3. Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Create .env file (if needed)
echo "VITE_API_URL=http://localhost:5000/api" > .env.local

# Start development server
npm run dev
# App runs on http://localhost:5173
```

## 📋 Environment Variables

Create a `.env` file in the backend directory:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=task_management_db
DB_PORT=3306

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
SMTP_FROM_EMAIL=noreply@taskmanager.com
SMTP_FROM_NAME=Task Manager

# CORS
CORS_ORIGIN=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 📚 API Documentation

### Authentication Endpoints

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

#### Update Profile
```http
PUT /api/auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Name"
}
```

### Task Endpoints

#### Get All Tasks
```http
GET /api/tasks?status=Pending&priority=High&search=test&sort=newest
Authorization: Bearer <token>
```

#### Get Task by ID
```http
GET /api/tasks/:id
Authorization: Bearer <token>
```

#### Create Task
```http
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the main features",
  "priority": "High",
  "status": "Pending",
  "due_date": "2026-12-31"
}
```

#### Update Task
```http
PUT /api/tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated title",
  "priority": "Medium",
  "status": "In Progress"
}
```

#### Update Task Status
```http
PATCH /api/tasks/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "Completed"
}
```

#### Delete Task
```http
DELETE /api/tasks/:id
Authorization: Bearer <token>
```

#### Get Task Statistics
```http
GET /api/tasks/stats
Authorization: Bearer <token>
```

## 🔐 Security

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based auth
- **CORS**: Configured origin whitelist
- **Rate Limiting**: Prevents brute force attacks
- **Input Validation**: Server-side validation
- **SQL Injection Protection**: Parameterized queries
- **Authorization**: User-level data isolation

## 🎨 Design Features

- **Modern UI**: Clean, professional design
- **Dark Mode**: Full dark mode support with localStorage persistence
- **Responsive**: Mobile-first design approach
- **Accessibility**: Semantic HTML, proper ARIA labels
- **Animations**: Smooth transitions and interactions
- **Typography**: Professional font hierarchy
- **Color System**: Carefully chosen color palette

## 📱 Responsive Breakpoints

- **Desktop**: 1400px+
- **Tablet**: 768px - 1399px
- **Mobile**: 640px - 767px
- **Small Mobile**: < 640px

## 🚀 Deployment

### Deploy Backend

**Option 1: Render**
1. Create account on [render.com](https://render.com)
2. Connect GitHub repository
3. Create new Web Service
4. Set environment variables
5. Deploy

**Option 2: Railway**
1. Sign up on [railway.app](https://railway.app)
2. Connect GitHub
3. Create new project
4. Add Node.js service
5. Set environment variables
6. Deploy

### Deploy Frontend

**Option 1: Vercel**
```bash
npm install -g vercel
cd frontend
vercel
```

**Option 2: Netlify**
```bash
npm run build
# Upload dist folder to Netlify
```

### Database
- Use **MySQL**: Hosted MySQL services (AWS RDS, PlanetScale, Heroku MySQL)
- Update connection strings in environment variables

## 🧪 Testing

### Manual Testing Checklist

- [ ] Registration with valid/invalid inputs
- [ ] Login with correct/incorrect credentials
- [ ] Protected routes require authentication
- [ ] Create task functionality
- [ ] Edit task functionality
- [ ] Delete task with confirmation
- [ ] Search filters work correctly
- [ ] Priority and status filters work
- [ ] Sorting by date/priority works
- [ ] Dark mode toggles correctly
- [ ] Responsive design on mobile
- [ ] User authorization (User A can't see User B's tasks)
- [ ] Email sent on registration
- [ ] Statistics update correctly

## 📊 Performance Optimization

- Vite for fast build times
- React component lazy loading
- Optimized database queries with indexes
- Debounced search input
- Minimal dependencies
- CSS optimization
- Image optimization

## 🐛 Error Handling

- Comprehensive error messages
- User-friendly error displays
- Server error logging
- Validation error feedback
- Network error handling
- Unauthorized access handling

## 📝 Future Improvements

- [ ] Real-time collaboration with WebSockets
- [ ] Task tags and categories
- [ ] Recurring tasks
- [ ] Task time tracking
- [ ] Comments and notes
- [ ] File attachments
- [ ] Email reminders
- [ ] Task templates
- [ ] Analytics dashboard
- [ ] Export tasks to PDF/CSV
- [ ] Mobile app (React Native)
- [ ] AI-powered task suggestions

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 👨‍💻 Author

**Ramji Patel**
- GitHub: [@ramjipatel-tech](https://github.com/ramjipatel-tech)
- LinkedIn: [@ramjipatel-tech](https://linkedin.com/in/ramjipatel-tech)
- Instagram: [@ramjipatel.tech](https://instagram.com/ramjipatel.tech)
- Website: [zyvionex.com](https://zyvionex.com)

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repository and submit pull requests.

## 📞 Support

For issues or questions, please create an issue on the GitHub repository.

---

**Built with ❤️ by Ramji Patel**

© 2026 Ramji Patel. All Rights Reserved.
