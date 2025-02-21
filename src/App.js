import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Level1 from './components/Level1';
import Level2 from './components/Level2';
import Level3 from './components/Level3';
import Final from './components/Final';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/level1" element={<Level1 />} />
      <Route path="/level2" element={<Level2 />} />
      <Route path="/level3" element={<Level3 />} />
      <Route path="/final" element={<Final />} />
    </Routes>
  );
}

export default App;
