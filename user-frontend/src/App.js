import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
 
 
/**
 * Root function component that provides the Router context.
 * Standardizes the entry point for the Virtual DOM.
 */
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}
 
export default App;