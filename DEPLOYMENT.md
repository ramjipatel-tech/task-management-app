# TaskFlow - Setup & Deployment Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- MySQL 8.0+
- Git

### Local Development

#### Step 1: Database Setup
```bash
# Login to MySQL
mysql -u root -p

# Run the schema
source backend/schema.sql

# Exit MySQL
exit
```

#### Step 2: Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp ../.env.example .env

# Edit .env with your database credentials and email config
# Important: Change JWT_SECRET to a strong random string

# Start development server
npm run dev

# Server will run on http://localhost:5000
```

#### Step 3: Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# App will run on http://localhost:5173
```

### Test Credentials
After registration, use any email/password combination to test.

---

## 🌐 Email Configuration (SMTP)

### Gmail Setup
1. Enable 2-Factor Authentication in your Google Account
2. Create an App Password: [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Copy the 16-character password
4. Add to `.env`:
   ```
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=xxxx xxxx xxxx xxxx
   ```

### Other Email Providers
- **Outlook/Office365**: smtp.office365.com:587
- **SendGrid**: smtp.sendgrid.net:587
- **Mailgun**: smtp.mailgun.org:587

---

## 📦 Production Deployment

### Option 1: Render (Recommended)

#### Deploy Backend
1. Push code to GitHub
2. Go to [render.com](https://render.com)
3. Click "New +" → "Web Service"
4. Connect GitHub repository
5. Fill in details:
   - Name: `taskflow-api`
   - Runtime: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
6. Add Environment Variables (from `.env`)
7. Click "Create Web Service"

#### Deploy Database
1. Use [PlanetScale](https://planetscale.com) (MySQL as a service)
2. Create new database
3. Get connection string
4. Update backend environment variables

#### Deploy Frontend
1. Go to [Vercel](https://vercel.com)
2. Import GitHub repository
3. Select `frontend` folder
4. Add Environment Variable:
   ```
   VITE_API_URL=https://your-render-app.onrender.com/api
   ```
5. Deploy

---

### Option 2: Railway

1. Sign up at [railway.app](https://railway.app)
2. Create new project
3. Add GitHub repository
4. Railway auto-detects Node.js
5. Add environment variables
6. Deploy automatically

---

## 🔐 Security Checklist

- [ ] Change JWT_SECRET to a long random string
- [ ] Use strong database passwords
- [ ] Enable HTTPS in production
- [ ] Set CORS_ORIGIN to your frontend domain
- [ ] Use environment variables for all secrets
- [ ] Enable rate limiting
- [ ] Use managed database service (don't expose ports)
- [ ] Add HTTPS certificate
- [ ] Monitor logs for errors

---

## 🐛 Troubleshooting

### Database Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```
**Solution:**
- Ensure MySQL is running
- Check DB_HOST, DB_USER, DB_PASSWORD in .env
- Verify database exists: `SHOW DATABASES;`

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:**
- Update CORS_ORIGIN in backend .env
- Ensure frontend URL matches CORS_ORIGIN

### Email Not Sending
**Solution:**
- Verify SMTP credentials
- Check if "Less secure app access" is enabled (for Gmail)
- Use App Password instead of account password
- Verify email server connection

### Port Already in Use
```
Error: listen EADDRINUSE :::5000
```
**Solution:**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

---

## 📊 Project Statistics

- **Total Files**: 40+
- **Backend Routes**: 12
- **Frontend Components**: 10+
- **Database Tables**: 2
- **API Endpoints**: 12
- **Lines of Code**: 3500+
- **CSS**: Custom design system

---

## 🎯 Features Summary

✅ User Authentication & Authorization
✅ Complete CRUD Operations
✅ Task Filtering & Search
✅ Advanced Sorting
✅ Task Statistics
✅ Dark/Light Mode
✅ Email Notifications
✅ Responsive Design
✅ Rate Limiting
✅ Password Hashing
✅ JWT Tokens
✅ Error Handling
✅ Loading States
✅ Empty States
✅ Professional UI/UX

---

## 📞 Support & Questions

Contact: [Ramji Patel](https://github.com/ramjipatel-tech)

© 2026 Ramji Patel. All Rights Reserved.
