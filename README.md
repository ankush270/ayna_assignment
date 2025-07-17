# AYNA: Form Builder & Response Platform

![AYNA Logo](client/public/logo.svg)

## Overview
AYNA is a modern full-stack web application for creating, sharing, and collecting responses for custom forms. It features a beautiful React frontend and a secure, scalable Express/MongoDB backend. The platform supports user authentication, drag-and-drop form creation, public form sharing, and live response analytics.

---

## Features
- **User Authentication:** Secure registration and login with JWT-based sessions.
- **Drag & Drop Form Builder:** Authenticated users can create forms with text and multiple-choice questions using an intuitive interface.
- **Public Form Sharing:** Instantly share forms via public URLs for anyone to submit responses—no login required for respondents.
- **Response Collection & Analytics:** Collect and view responses for each form, with a dashboard for live analytics and recent activity.
- **Dashboard:** Visual overview of forms, responses, and activity.
- **Modern UI/UX:** Responsive, accessible, and visually appealing interface using Tailwind CSS and Framer Motion.
- **Security:** Password hashing, JWT, and CORS for secure operations.

---

## Main Functions & Features Table

| Area         | Feature/Functionality                | File/Location                        |
|--------------|-------------------------------------|--------------------------------------|
| Auth         | Register/Login/JWT                  | `server/routes/auth.js`, `client/src/pages/Login.jsx`, `SignUp.jsx`, `store.js` |
| Form Builder | Create/Edit Forms (Drag & Drop)     | `server/routes/forms.js`, `client/src/pages/Forms.jsx`, `Dashboard.jsx` |
| Public Share | Public Form Access/Submission       | `server/routes/forms.js`, `client/src/pages/PublicForm.jsx` |
| Responses    | Collect/View Responses, Analytics   | `server/routes/forms.js`, `client/src/pages/FormDetails.jsx`, `Dashboard.jsx` |
| State Mgmt   | Redux Auth Slice                    | `client/src/store.js`                |
| UI/UX        | Modern, Responsive, Animated        | `client/src/components/`, Tailwind, Framer Motion |
| Security     | Password Hashing, JWT, CORS         | `server/middleware/auth.js`, `server/routes/auth.js` |

---

## Demo
<!-- If you have a live deployment, add the link here -->
<!-- [Live Demo](https://your-ayna-demo-url.com) -->

---

## Local Development Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)

### 1. Clone the Repository
```bash
git clone https://github.com/ankush270/ayna_assignment.git
cd Ayna_assignment
```

### 2. Environment Variables
Create a `.env` file in the `server/` directory with the following:
```
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
```

Create a `.env` file in the `client/` directory with the following:
```
VITE_BACKEND_URL=<your-backend-url>
```

### 3. Install Dependencies
#### Backend
```bash
cd server
npm install
```
#### Frontend
```bash
cd ../client
npm install
```

### 4. Run the Application
#### Start Backend
```bash
cd server
npm run dev
```
The backend will run on [http://localhost:5000](http://localhost:5000)

#### Start Frontend
```bash
cd ../client
npm run dev
```
The frontend will run on [http://localhost:5173](http://localhost:5173) (default Vite port)

---

## Project Structure

```
Ayna_assignment/
  client/      # React frontend (Vite, Tailwind, Redux)
  server/      # Express backend (MongoDB, JWT, REST API)
```

### Frontend Highlights
- `src/pages/`: Main app pages (Dashboard, Forms, FormDetails, Login, SignUp, PublicForm, Hero)
- `src/components/`: UI components (Navigation, HeroSection, FeaturesSection, etc.)
- State management with Redux Toolkit
- Routing with React Router
- Animations with Framer Motion
- Styling with Tailwind CSS

### Backend Highlights
- `models/`: Mongoose schemas for User, Form, FormResponse
- `routes/`: REST API endpoints for authentication and forms
- `middleware/auth.js`: JWT authentication middleware
- `db.js`: MongoDB connection logic
- Secure password hashing with bcryptjs
- Environment-based configuration

---

## Approach & Design Decisions

### 1. **Separation of Concerns**
- Clear split between frontend (`client/`) and backend (`server/`) for scalability and maintainability.

### 2. **Tech Stack Choices**
- **Frontend:** React (Vite for fast dev), Redux Toolkit for state, Tailwind CSS for rapid UI, Framer Motion for UX polish.
- **Backend:** Express for REST API, MongoDB for flexible data storage, JWT for stateless authentication.

### 3. **Security**
- Passwords are hashed with bcryptjs before storage.
- JWT tokens are used for secure, stateless user sessions.
- CORS enabled for local development.

### 4. **User Experience**
- Responsive, accessible UI with modern design.
- Real-time feedback and error handling.
- Public forms can be shared and filled by anyone, but only authenticated users can create/manage forms.
- Drag-and-drop builder for easy form creation (minimum 3, maximum 5 questions per form; MCQ options: 2-5 per question).

### 5. **Extensibility**
- Modular codebase: easy to add new question types, analytics, or integrations.
- Environment variables for secrets and DB config.

---

## API Endpoints (Summary)

- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Login and receive JWT token.
- `POST /api/forms`: Create a new form (auth required).
- `GET /api/forms/mine`: Get all forms created by the authenticated user.
- `GET /api/forms/:id`: Get details of a single form (auth required, only if created by user).
- `GET /api/forms/public/:id`: Public access to a form (no auth required).
- `POST /api/forms/public/:id/submit`: Submit a public form response.
- `GET /api/forms/:id/responses`: Get all responses for a form (only for creator).

---

## Future Improvements
- Add more question types (dropdown, rating, file upload, etc.)
- Advanced response analytics and export (CSV, Excel)
- User profile management
- Improved error handling and validation
- Team collaboration features
- Custom branding and themes

---
 
