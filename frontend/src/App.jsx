import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { SiteProvider } from './context/SiteProvider';

// Layouts
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
import ProtectedRoute from './components/admin/ProtectedRoute';

// Public Pages
const Home = lazy(() => import('./pages/public/Home'));
const ProjectDetails = lazy(() => import('./pages/public/ProjectDetails'));
const LegalPrivacy = lazy(() => import('./pages/public/LegalPrivacy'));
const LegalTerms = lazy(() => import('./pages/public/LegalTerms'));
const LegalRefund = lazy(() => import('./pages/public/LegalRefund'));
const LegalCancellation = lazy(() => import('./pages/public/LegalCancellation'));
import Navbar from './components/public/Navbar';
import Footer from './components/public/Footer';
import NewsTicker from './components/public/NewsTicker';
import ScrollToTop from './components/public/ScrollToTop';

// Admin Pages
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const SiteSettings = lazy(() => import('./pages/admin/SiteSettings'));
const ManageProducts = lazy(() => import('./pages/admin/ManageProducts'));
const ManageServices = lazy(() => import('./pages/admin/ManageServices'));
const ManageProjects = lazy(() => import('./pages/admin/ManageProjects'));
const ManageEnquiries = lazy(() => import('./pages/admin/ManageEnquiries'));
const AdminProfile = lazy(() => import('./pages/admin/AdminProfile'));
const ManageLegal = lazy(() => import('./pages/admin/ManageLegal'));

const LoadingScreen = () => (
  <div className="min-h-screen bg-primary flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo"></div>
  </div>
);

const PublicLayout = ({ children }) => (
  <div className="bg-primary text-white min-h-screen">
    <Navbar />
    <NewsTicker />
    <main>{children}</main>
    <Footer />
  </div>
);

function App() {
  return (
    <SiteProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Toaster position="top-center" reverseOrder={false} />
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
              <Route path="/projects/:id" element={<PublicLayout><ProjectDetails /></PublicLayout>} />
              <Route path="/privacy-policy" element={<PublicLayout><LegalPrivacy /></PublicLayout>} />
              <Route path="/terms-of-service" element={<PublicLayout><LegalTerms /></PublicLayout>} />
              <Route path="/refund-policy" element={<PublicLayout><LegalRefund /></PublicLayout>} />
              <Route path="/cancellation-policy" element={<PublicLayout><LegalCancellation /></PublicLayout>} />
              
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
                
                {/* Legal Pages */}
                <Route path="legal/privacy" element={<ManageLegal type="privacyPolicy" />} />
                <Route path="legal/terms" element={<ManageLegal type="termsOfService" />} />
                <Route path="legal/refund" element={<ManageLegal type="refundPolicy" />} />
                <Route path="legal/cancellation" element={<ManageLegal type="cancellationPolicy" />} />
              </Route>
            </Routes>
          </Suspense>
        </Router>
      </AuthProvider>
    </SiteProvider>
  );
}

export default App;
