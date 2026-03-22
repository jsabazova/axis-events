import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import Layout from './components/layout/Layout';

// Page imports
import HomePage from './pages/public/HomePage';
import AboutPage from './pages/public/AboutPage';
import SiteServicesPage from './pages/public/SiteServicesPage';
import FreightServicesPage from './pages/public/FreightServicesPage';
import InternationalFreightPage from './pages/public/InternationalFreightPage';
import FAQPage from './pages/public/FAQPage';
import ContactPage from './pages/public/ContactPage';
import OnsiteLogisticsPage from './pages/public/OnsiteLogisticsPage';
import QuotePage from './pages/quote/QuotePage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles theme={theme} />
      <Router basename={import.meta.env.BASE_URL}>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services/site-services" element={<SiteServicesPage />} />
            <Route path="/services/freight" element={<FreightServicesPage />} />
            <Route path="/services/international-freight" element={<InternationalFreightPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/services/onsite-logistics" element={<OnsiteLogisticsPage />} />
            <Route path="/quote" element={<QuotePage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;