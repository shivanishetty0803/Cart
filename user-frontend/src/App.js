import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/*  removed <SignupPage /> and replaced it with the Router */}
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;