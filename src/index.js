import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';

import './index.scss';
import App from './components/App';

const root = createRoot(document.getElementById('root'));

root.render(
  <Router>
    <App />
  </Router>
);
