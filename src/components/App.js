import { Route, Routes } from 'react-router-dom';

import Home from 'pages/home';
import Convert from 'pages/convert';
import Measure from 'pages/measure';

export default function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/convert" element={<Convert />} />
      <Route path="/measure" element={<Measure />} />
    </Routes>
  );
}
