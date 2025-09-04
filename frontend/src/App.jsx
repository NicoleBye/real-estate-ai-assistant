import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminLoginPage from './pages/AdminLoginPage';
import RegisterPage from './pages/RegisterPage';
import RentPropertiesPage from './pages/RentPropertiesPage';
import BuyPropertiesPage from './pages/BuyPropertiesPage';
import PropertyRentDetailPage from './pages/PropertyRentDetailPage';
import PropertyBuyDetailPage from './pages/PropertyBuyDetailPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AgentDashboard from './pages/AgentDashboard';
import CompactAIChat from './components/CompactAIChat';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/adminlogin" element={<AdminLoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/agent" element={<AgentDashboard />} />
        <Route path="/rent" element={<RentPropertiesPage />} />
        <Route path="/buy" element={<BuyPropertiesPage />} />
        <Route path="/rent/:id" element={<PropertyRentDetailPage />} />
        <Route path="/buy/:id" element={<PropertyBuyDetailPage />} />
      </Routes>
      <CompactAIChat />
    </>
  );
}

export default App;