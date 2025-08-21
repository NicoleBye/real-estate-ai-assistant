import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RentPropertiesPage from './pages/RentPropertiesPage';
import BuyPropertiesPage from './pages/BuyPropertiesPage';
import PropertyRentDetailPage from './pages/PropertyRentDetailPage';
import PropertyBuyDetailPage from './pages/PropertyBuyDetailPage';

function App() {
  return (
    <Routes>
      {/* Main pages */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Property list pages */}
      <Route path="/rent" element={<RentPropertiesPage />} />
      <Route path="/buy" element={<BuyPropertiesPage />} />
      
      {/* Property detail pages */}
      <Route path="/rent/:id" element={<PropertyRentDetailPage />} />
      <Route path="/buy/:id" element={<PropertyBuyDetailPage />} />
    </Routes>
  );
}

export default App;