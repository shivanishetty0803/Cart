import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SignupPage from './pages/user/SignupPage';
import CartPage from './pages/cart/CartPage';
// add more pages later

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/cart" element={<CartPage />} />
        {/* Add others' pages like this */}
        {/* <Route path="/login" element={<LoginPage />} /> */}
        {/* <Route path="/products" element={<ProductPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;