import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';

const App = () => {
  // React state
  const [isLogged, setIsLogged] = useState(false);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={'/login'} />} />
          <Route path="/login" element={<Login setIsLogged={setIsLogged} />} />
          <Route
            path="/home"
            element={
              isLogged === true ? (
                <Home setIsLogged={setIsLogged} />
              ) : (
                <Navigate to={'/login'} />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
