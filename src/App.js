import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import SideMenu from './components/SideMenu';
import Proprietaire from './components/Proprietaire';

const App = () => {
  return (
    <Router>
      <div className="App">
       
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/test" element={<SideMenu />} />
          <Route path="/proprietaire" element={<Proprietaire />} />
          <Route path="/dashboard/*" element={<SideMenu />} />
         
        </Routes>
      </div>
    </Router>
  );
};

export default App;
