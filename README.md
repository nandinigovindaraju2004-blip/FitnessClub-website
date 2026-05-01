# Fitness Club Management System

A full-stack MERN (MongoDB, Express, React, Node.js) web application for managing gym/fitness club members, memberships, and billing.

---

## � Description

**Fitness Club Management System** is a complete web application designed to help gym owners and fitness club administrators manage their members efficiently. 

This application allows fitness club owners to:
- **Register and authenticate** their fitness club online
- **Manage members** - Add, view, update, and delete gym members
- **Create membership plans** - Set up monthly, quarterly, or yearly plans with different pricing
- **Track billing** - Automatic calculation of next billing date based on membership duration
- **View dashboard** - See member statistics and overview at a glance
- **Use BMI Calculator** - Built-in tool for members to calculate their Body Mass Index

The system uses **JWT authentication** for secure login and stores all data in **MongoDB**. The frontend is built with **React** and **Material UI** for a modern, responsive user experience.

---

## �📁 Project Structure

```
fitnessclub/
├── 📦 Backend (Node.js + Express)
│   ├── index.js              # Server entry point
│   ├── package.json          # Backend dependencies
│   ├── Auth/
│   │   └── auth.js           # JWT authentication middleware
│   ├── Controllers/
│   │   ├── fitness.js        # Fitness owner controllers
│   │   ├── member.js         # Member management
│   │   └── membership.js     # Membership plans
│   ├── DBConn/
│   │   └── conn.js           # MongoDB connection
│   ├── Modals/
│   │   ├── fitness.js        # Fitness owner schema
│   │   ├── member.js         # Member schema
│   │   └── membership.js    # Membership schema
│   └── Routes/
│       ├── fitness.js        # Auth routes
│       ├── member.js         # Member routes
│       └── membership.js     # Membership routes
│
└── 🎨 Frontend (React)
    └── fitness-frontend/
        ├── src/
        │   ├── Components/   # Reusable UI components
        │   │   ├── Addmembers/
        │   │   ├── Addmembership/
        │   │   ├── ForgotPassword/
        │   │   ├── Login/
        │   │   ├── MemberCard/
        │   │   ├── Modal/
        │   │   ├── Sidebar/
        │   │   └── Signup/
        │   └── Pages/        # Page components
        │       ├── BMICalculator/
        │       ├── Dashboard/
        │       ├── GeneralUser/
        │       ├── Home/
        │       └── Member/
        └── package.json      # Frontend dependencies
```

---

## 🚀 How to Run

### Step 1: Backend Setup

```bash
# Navigate to backend folder
cd fitnessclub

# Install dependencies
npm install

# Create .env file (see Environment Variables below)
# Start the server
npm start
```

**Backend runs on:** `http://localhost:8080`

---

### Step 2: Frontend Setup

```bash
# Navigate to frontend folder
cd fitness-frontend

# Install dependencies
npm install

# Start the React app
npm start
```

**Frontend runs on:** `http://localhost:3000`

---

> ⚠️ **Important:** Run both backend and frontend in **separate terminal windows**.

---

## 🛠️ Technology Stack

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | JavaScript runtime |
| Express.js | Web framework |
| MongoDB | Database |
| Mongoose | MongoDB ODM |
| JWT | Authentication |
| Bcryptjs | Password hashing |
| Cookie-parser | Cookie handling |
| Nodemailer | Email sending |

### Frontend
| Technology | Purpose |
|------------|---------|
| React | UI library |
| React Router | Navigation |
| Axios | HTTP client |
| Material UI | Component library |
| React Toastify | Notifications |
| Chart.js | Data visualization |

---

## ⚙️ Environment Variables

Create a `.env` file in the `fitnessclub/` root:

```env
PORT=8080
MONGO_URI=mongodb://localhost:27017/fitnessclub
JWT_SECRET=your_super_secret_key_here
```

---

## 📡 API Endpoints

### Authentication (`/auth`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register fitness club |
| POST | `/auth/login` | Login fitness club |
| POST | `/auth/forgot-password` | Reset password |

### Members (`/auth`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/add-member` | Add new member |
| GET | `/auth/get-member` | Get all members |
| PUT | `/auth/update-member/:id` | Update member |
| DELETE | `/auth/delete-member/:id` | Delete member |

### Memberships (`/plans`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/plans/add-membership` | Add membership plan |
| GET | `/plans/get-membership` | Get all plans |

---

## 🎯 Features

- ✅ Member registration & management
- ✅ Membership plan creation (monthly, quarterly, yearly)
- ✅ Automatic billing date calculation
- ✅ Secure authentication (JWT)
- ✅ Dashboard with statistics
- ✅ BMI Calculator tool
- ✅ Responsive UI design

---

## 📦 Available Scripts

### Backend
```bash
npm start        # Start with nodemon (development)
npm test         # Run tests
```

### Frontend
```bash
npm start        # Development server
npm run build    # Production build
npm test         # Run tests
```

---

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection error | Check MONGO_URI in .env file |
| CORS error | Ensure frontend URL matches cors config |
| Port already in use | Change PORT in .env file |

---

## 📄 License

ISC

---

## 👤 Author

Your Name - [GitHub Profile]