import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import './index.scss';
import Convert from 'pages/convert';

const root = createRoot(document.getElementById('root'));

root.render(
  <Router>
    <Routes>
      <Route Component={Convert} index />
    </Routes>
  </Router>
);
