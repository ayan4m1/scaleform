import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.scss';
import Convert from 'pages/convert';
import Measure from 'pages/measure';

const root = createRoot(document.getElementById('root'));

root.render(
  <Router>
    <Routes>
      <Route Component={Convert} index />
      <Route Component={Measure} path="/measure" />
    </Routes>
  </Router>
);
