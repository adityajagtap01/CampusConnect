# 🎓 Campus Connect

> A modern full-stack Training & Placement Portal that streamlines campus recruitment for students and placement administrators while providing AI-powered placement readiness analysis.

**Live Demo:** https://campus-connect-nu-three.vercel.app

---

## 📖 Overview

Campus Connect is a centralized Training & Placement Management System built for colleges to simplify the entire placement workflow.

The platform allows:

- 🎓 Students to browse companies, apply for job openings, upload verification documents, and receive AI-generated placement guidance.
- 🏢 Placement Administrators (TPO) to create hiring drives, manage applicants, verify documents, and monitor recruitment activities.
- 🤖 AI-powered analysis using Google's Gemini API to compare a student's profile with historical placement data and provide personalized improvement suggestions.

The application follows a modern full-stack architecture with secure authentication, role-based authorization, cloud-based file storage, and PostgreSQL as the primary database.

---

# ✨ Features

## 👨‍🎓 Student Module

- Secure JWT Authentication
- Browse companies that have previously recruited from campus
- View historical placement statistics
- Apply for available hiring teams
- Upload:
  - Resume
  - 12th Marksheet
  - CGPA Proof
- Track submitted applications
- Get AI-powered placement readiness suggestions

---

## 👨‍💼 Admin (TPO) Module

- Secure Admin Login
- Create and manage hiring teams
- Add job roles, package, eligibility criteria, and requirements
- View all applicants
- Access uploaded student documents
- Monitor placement pipeline
- Manage company recruitment drives

---

## 📊 Placement Analytics

- Company-wise hiring statistics
- Year-wise placement data
- Interactive visualizations using Recharts
- Historical placement insights

---

## 🤖 AI Placement Readiness

One of the major highlights of Campus Connect.

The system uses **Google Gemini API** to generate personalized placement suggestions.

It analyzes:

- Student CGPA
- Skills
- Projects
- Resume
- Historical data of students placed in the selected company

Then it provides:

- Strengths
- Weaknesses
- Missing skills
- Resume improvement suggestions
- Company-specific preparation advice

---

## 📂 Document Verification

Students can upload

- Resume
- 12th Marksheet
- CGPA Proof

Files are securely stored using **Cloudinary**, making document management efficient and scalable.

---

## 🔐 Authentication & Security

- JWT Authentication
- httpOnly Cookies
- Password Hashing using bcrypt
- Protected Routes
- Role-Based Access Control
- Backend Authorization Middleware

---

# 🛠 Tech Stack

## Frontend

- React 19
- Vite
- Tailwind CSS
- React Router
- Zustand
- Axios
- Framer Motion
- Recharts
- React Dropzone

---

## Backend

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT
- bcryptjs
- Multer
- Cloudinary
- Google Gemini API

---

## Deployment

| Service | Platform |
|----------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | Neon PostgreSQL |
| File Storage | Cloudinary |

---

# 🏗 System Architecture

```
Campus Connect
│
├── Frontend (React + Vite)
│
│   ├── Pages
│   ├── Components
│   ├── Services
│   ├── Zustand Store
│   └── Routing
│
├── Backend (Express)
│
│   ├── Controllers
│   ├── Routes
│   ├── Middleware
│   ├── Prisma ORM
│   ├── Gemini Prompt Logic
│   └── Cloudinary Upload
│
└── PostgreSQL Database
```

---

# 📁 Project Structure

```
CampusConnect/
│
├── pbl/
│   ├── controller/
│   ├── middleware/
│   ├── prisma/
│   ├── prompts/
│   ├── router/
│   ├── tempfunct/
│   ├── utils/
│   └── index.js
│
└── vite-project/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   ├── store/
    │   └── App.jsx
```

---

# 🗄 Database Design

The application consists of the following major entities:

| Model | Description |
|--------|-------------|
| CurrentStudents | Registered students using the platform |
| Student | Historical placement records |
| Company | Company details and placement history |
| Admin | Placement cell accounts |
| CreatedTeam | Job openings created by admins |
| TeamApplication | Student applications |
| Documents | Uploaded verification documents |

---

# 🔄 Workflow

### Student

```
Login
      ↓
Browse Companies
      ↓
View Hiring Teams
      ↓
Upload Documents
      ↓
Apply
      ↓
Receive AI Suggestions
```

---

### Admin

```
Login
      ↓
Create Hiring Team
      ↓
Students Apply
      ↓
Review Applications
      ↓
View Documents
      ↓
Manage Recruitment
```

---

# ⚙ Environment Variables

## Backend (.env)

```env
DATABASE_URL=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
GEMINI_API_KEY=
FRONTEND_URL=
NODE_ENV=
```

---

## Frontend (.env)

```env
VITE_API_URL=http://localhost:3000/api/v1/
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/<your-username>/campus-connect.git

cd campus-connect
```

---

## Backend

```bash
cd pbl

npm install

npx prisma generate

npx prisma db push

npm run dev
```

---

## Frontend

```bash
cd vite-project

npm install

npm run dev
```

---

# 💡 Future Improvements

- Email notifications
- Interview scheduling
- Resume ATS score
- Student dashboard analytics
- Company login portal
- Admin approval workflow
- Placement prediction using ML models
- Export reports as PDF/Excel
- Real-time notifications using WebSockets

---




**Aditya Jagtap**

If you found this project interesting, consider giving it a ⭐ on GitHub.
