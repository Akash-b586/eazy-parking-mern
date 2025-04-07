import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import SpeedDial from '@mui/material/SpeedDial';
import { Moon, Sun } from 'lucide-react';

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  return (
    <div className={`${theme} === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'`}>
      <SpeedDial
        ariaLabel="Theme Switcher"
        icon={theme === 'dark' ? <Moon /> : <Sun />}
        sx={{ position: 'fixed', bottom: 16, right: 16 ,color:'purple'}}
        onClick={() => {
          const newTheme = theme === 'dark' ? 'light' : 'dark';
          setTheme(newTheme);
          localStorage.setItem('theme', newTheme);
        }}
        />
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        {/* Add 404 page */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
    </div>
  );
};

export default App;
