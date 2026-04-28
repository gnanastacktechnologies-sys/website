import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';

// Layouts
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';

// Public Pages
import Home from './pages/public/Home';
import ProjectDetails from './pages/public/ProjectDetails';
import Navbar from './components/public/Navbar';
import Footer from './components/public/Footer';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import SiteSettings from './pages/admin/SiteSettings';
import ManageProducts from './pages/admin/ManageProducts';
import ManageServices from './pages/admin/ManageServices';
import ManageProjects from './pages/admin/ManageProjects';
import ManageEnquiries from './pages/admin/ManageEnquiries';
import AdminProfile from './pages/admin/AdminProfile';

const PublicLayout = ({ children }) => (
  <div className="bg-primary text-white min-h-screen">
    <Navbar />
    <main>{children}</main>
    <Footer />
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/projects/:id" element={<PublicLayout><ProjectDetails /></PublicLayout>} />
          
          {/* Admin Auth */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Protected Routes */}
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="site-settings" element={<SiteSettings />} />
            <Route path="products" element={<ManageProducts />} />
            <Route path="services" element={<ManageServices />} />
            <Route path="projects" element={<ManageProjects />} />
            <Route path="enquiries" element={<ManageEnquiries />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
