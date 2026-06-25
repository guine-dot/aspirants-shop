import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import AdminDashboard from './pages/admin/AdminDashboard';
import Games from './pages/Games';
import GameDetail from './pages/GameDetail';
import Orders from './pages/Orders';
import Checkout from './pages/Checkout';

// Layout
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  const dispatch = useDispatch();
  const { user, theme } = useSelector(state => ({
    user: state.auth.user,
    theme: state.theme.current
  }));

  useEffect(() => {
    // Apply theme
    document.body.className = `theme-${theme}`;
  }, [theme]);

  return (
    <Router>
      <div className="theme-container min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/:id" element={<GameDetail />} />
            <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/orders" element={user ? <Orders /> : <Navigate to="/login" />} />
            <Route path="/checkout/:gameId/:packageId" element={user ? <Checkout /> : <Navigate to="/login" />} />
            <Route path="/admin" element={user?.isAdmin ? <AdminDashboard /> : <Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </Router>
  );
};

export default App;
