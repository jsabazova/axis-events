import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import ContactFreightPage from './pages/public/ContactFreightPage';
import ContactOnsitePage from './pages/public/ContactOnsitePage';
import PrivacyPolicyPage from './pages/public/PrivacyPolicyPage';
import TermsPage from './pages/public/TermsPage';
import QuotePage from './pages/quote/QuotePage';

// Admin pages
import LoginPage from './pages/admin/LoginPage';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import OrganisersPage from './pages/admin/OrganisersPage';
import SuppliersPage from './pages/admin/SuppliersPage';
import RateCardsPage from './pages/admin/RateCardsPage';
import ShowsPage from './pages/admin/ShowsPage';
import AdminQuotesPage from './pages/admin/AdminQuotesPage';

function App() {
  return (
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
              <Route path="/services/onsite-logistics" element={<OnsiteLogisticsPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/contact/freight" element={<ContactFreightPage />} />
              <Route path="/contact/onsite" element={<ContactOnsitePage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/quote" element={<QuotePage />} />
            </Route>

            {/* Admin */}
            <Route path="/admin/login" element={<LoginPage />} />
            <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="overview" element={<AdminDashboard />} />
              <Route path="bookings" element={<AdminDashboard />} />
              <Route path="shows" element={<ShowsPage />} />
              <Route path="quotes" element={<AdminQuotesPage />} />
              <Route path="jobs" element={<AdminDashboard />} />
              <Route path="organisers" element={<OrganisersPage />} />
              <Route path="suppliers" element={<SuppliersPage />} />
              <Route path="rate-cards" element={<RateCardsPage />} />
              <Route path="logs" element={<AdminDashboard />} />
              <Route path="settings" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
  );
}

export default App;
