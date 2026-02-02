import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './shell/layout/Layout';
import Overview from './pages/Overview';
import Kinship from './pages/Kinship';
import Dialog from './pages/Dialog';
import Ledger from './pages/Ledger';
import Fortune from './pages/Fortune';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/kinship" element={<Kinship />} />
          <Route path="/dialog" element={<Dialog />} />
          <Route path="/ledger" element={<Ledger />} />
          <Route path="/fortune" element={<Fortune />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
