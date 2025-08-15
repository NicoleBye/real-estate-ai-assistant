import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RentPropertiesPage from './pages/RentPropertiesPage';
import BuyPropertiesPage from './pages/BuyPropertiesPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/properties" element={<RentPropertiesPage />} />
      <Route path="/rent" element={<RentPropertiesPage />} />
      <Route path="/buy" element={<BuyPropertiesPage />} />
    </Routes>
  );
}

export default App;