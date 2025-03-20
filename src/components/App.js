import { Route, Routes } from 'react-router-dom';

import Home from 'pages/home';
import Convert from 'pages/convert';
import Measure from 'pages/measure';

export default function App() {
  return (
    <Routes>
      <Route Component={Home} index />
      <Route Component={Convert} path="/convert" />
      <Route Component={Measure} path="/measure" />
    </Routes>
  );
}
