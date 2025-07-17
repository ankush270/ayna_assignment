# AYNA: Form Builder & Response Platform

## Overview
AYNA is a full-stack web application that allows users to create, share, and collect responses for custom forms. It features a modern React frontend and a secure, scalable Express/MongoDB backend. The platform supports user authentication, form creation, public form sharing, and response analytics.

---

## Features
- **User Authentication:** Secure registration and login with JWT-based sessions.
- **Form Builder:** Authenticated users can create forms with text and multiple-choice questions.
- **Public Form Sharing:** Share forms via public URLs for anyone to submit responses.
- **Response Collection:** Collect and view responses for each form.
- **Dashboard:** Visual overview of forms, responses, and recent activity.
- **Modern UI:** Responsive, accessible, and visually appealing interface using Tailwind CSS and Framer Motion.

---

## Main Functions & Features Table

| Area         | Feature/Functionality                | File/Location                        |
|--------------|-------------------------------------|--------------------------------------|
| Auth         | Register/Login/JWT                  | `server/routes/auth.js`, `client/src/pages/Login.jsx`, `SignUp.jsx`, `store.js` |
| Form Builder | Create/Edit Forms                   | `server/routes/forms.js`, `client/src/pages/Forms.jsx`, `Dashboard.jsx` |
| Public Share | Public Form Access/Submission       | `server/routes/forms.js`, `client/src/pages/PublicForm.jsx` |
| Responses    | Collect/View Responses              | `server/routes/forms.js`, `client/src/pages/FormDetails.jsx` |
| State Mgmt   | Redux Auth Slice                    | `client/src/store.js`                |
| UI/UX        | Modern, Responsive, Animated        | `client/src/components/`, Tailwind, Framer Motion |
| Security     | Password Hashing, JWT, CORS         | `server/middleware/auth.js`, `server/routes/auth.js` |

---

## Local Development Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd Ayna_assignment
```

### 2. Environment Variables
Create a `.env` file in the `server/` directory with the following:
```
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
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
- Add more question types (dropdown, rating, etc.)
- Response analytics and export
- User profile management
- Improved error handling and validation
- Deployment scripts and CI/CD

---

## License
MIT (or specify your license)

---

## Contact
For questions or contributions, open an issue or pull request on GitHub. 