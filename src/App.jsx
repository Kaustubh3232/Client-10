import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Admin from './pages/Admin/Admin';
import AdminDashboard from './pages/Admin/Dashboard';
import Admission from './pages/Admission/Admission';
import Gallery from './pages/Gallery/Gallery';
import Contact from './pages/Contact/Contact';
import PublicDisclosure from './pages/PublicDisclosure/PublicDisclosure';
import ProtectedRoute from './components/common/ProtectedRoute';

import SmoothScroll from './components/common/SmoothScroll';
import AIAssistant from './components/common/AIAssistant';

function App() {
  return (
    <Router>
      <SmoothScroll>
        <AIAssistant />
        <div className="flex flex-col min-h-screen">
          <Routes>
            {/* Public Routes with Navbar/Footer */}
            <Route path="/" element={<><Navbar /><main className="flex-grow"><Home /></main><Footer /></>} />
            <Route path="/about" element={<><Navbar /><main className="flex-grow"><About /></main><Footer /></>} />
            <Route path="/admission" element={<><Navbar /><main className="flex-grow"><Admission /></main><Footer /></>} />
            <Route path="/gallery" element={<><Navbar /><main className="flex-grow"><Gallery /></main><Footer /></>} />
            <Route path="/contact" element={<><Navbar /><main className="flex-grow"><Contact /></main><Footer /></>} />
            <Route path="/public-disclosure" element={<><Navbar /><main className="flex-grow"><PublicDisclosure /></main><Footer /></>} />
            <Route path="/admin/*" element={<><Navbar /><main className="flex-grow"><Admin /></main><Footer /></>} />

            {/* Protected Admin Routes - No global Navbar/Footer */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </SmoothScroll>
    </Router>
  );
}

export default App;
