import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Hero from './pages/Hero';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Forms from './pages/Forms';
import FormDetails from './pages/FormDetails';

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Hero />} />                  
          <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <SignUp />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />} />
          <Route path="/forms" element={isAuthenticated ? <Forms /> : <Navigate to="/login" replace />} />
          <Route path="/forms/:id" element={isAuthenticated ? <FormDetails /> : <Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
