import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/admin/ProtectedRoute';

// Public pages
import HomePage from './pages/public/HomePage';
import AboutPage from './pages/public/AboutPage';
import SiteServicesPage from './pages/public/SiteServicesPage';
import FreightServicesPage from './pages/public/FreightServicesPage';
import InternationalFreightPage from './pages/public/InternationalFreightPage';
import FAQPage from './pages/public/FAQPage';
import ContactPage from './pages/public/ContactPage';
import OnsiteLogisticsPage from './pages/public/OnsiteLogisticsPage';
import QuotePage from './pages/quote/QuotePage';

// Admin pages
import LoginPage from './pages/admin/LoginPage';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles theme={theme} />
      <AuthProvider>
        <Router basename={import.meta.env.BASE_URL}>
          <Routes>
            {/* Public site */}
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services/site-services" element={<SiteServicesPage />} />
              <Route path="/services/freight" element={<FreightServicesPage />} />
              <Route path="/services/international-freight" element={<InternationalFreightPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/services/onsite-logistics" element={<OnsiteLogisticsPage />} />
              <Route path="/quote" element={<QuotePage />} />
            </Route>

            {/* Admin — login is public, everything else is protected */}
            <Route path="/admin/login" element={<LoginPage />} />
            <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="bookings" element={<AdminDashboard />} />
              <Route path="overview" element={<AdminDashboard />} />
              <Route path="shows" element={<AdminDashboard />} />
              <Route path="quotes" element={<AdminDashboard />} />
              <Route path="jobs" element={<AdminDashboard />} />
              <Route path="organisers" element={<AdminDashboard />} />
              <Route path="suppliers" element={<AdminDashboard />} />
              <Route path="rate-cards" element={<AdminDashboard />} />
              <Route path="logs" element={<AdminDashboard />} />
              <Route path="settings" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;