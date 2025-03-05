import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import NutriologoScreen from './screens/NutriologoScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/nutriologo" element={<NutriologoScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
