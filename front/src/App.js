import './App.css';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute';
import Accounts from './components/Accounts/Accounts';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<PrivateRoute><Accounts /></PrivateRoute>} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
