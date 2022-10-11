import { Route, Routes } from 'react-router-dom';

import Layout from 'components/Layout';
import ScaleProvider from 'components/ScaleProvider';

import Home from 'pages/home';
import Convert from 'pages/convert';
import Measure from 'pages/measure';

export default function App() {
  return (
    <ScaleProvider>
      <Layout>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/convert" element={<Convert />} />
          <Route path="/measure" element={<Measure />} />
        </Routes>
      </Layout>
    </ScaleProvider>
  );
}
