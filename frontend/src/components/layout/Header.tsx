import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const location = useLocation();
  const dropRef  = useRef<HTMLLIElement>(null);

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  // close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // close mobile on route change
  useEffect(() => { setMobileOpen(false); setServicesOpen(false); }, [location]);

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          {/* Logo */}
          <Link to="/" className={styles.logoLink}>
            <div className={styles.logoBox}><span>A</span></div>
            <div className={styles.logoWords}>
              <strong>Axis Events</strong>
              <small>Event Logistics</small>
            </div>
          </Link>

          {/* Desktop nav links */}
          <ul className={styles.navLinks}>
            {/* Services mega dropdown */}
            <li className={styles.navLinkItem} ref={dropRef}>
              <button
                className={`${styles.dropBtn} ${servicesOpen ? styles.open : ''}`}
                onClick={() => setServicesOpen(o => !o)}
              >
                Services
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              <div className={`${styles.megaDropdown} ${servicesOpen ? styles.open : ''}`}>
                <div className={styles.ddCols}>
                  <div className={styles.ddCol}>
                    <span className={styles.ddColLabel}>For Exhibitors</span>
                    <Link to="/services/freight" className={styles.ddLinkEl} onClick={() => setServicesOpen(false)}>
                      <div className={styles.ddLinkIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                        </svg>
                      </div>
                      <div className={styles.ddLinkText}>
                        <span className={styles.ddLinkName}>Domestic Freight</span>
                        <span className={styles.ddLinkSub}>Warehouse to stand, nationwide</span>
                      </div>
                    </Link>
                    <Link to="/services/international-freight" className={styles.ddLinkEl} onClick={() => setServicesOpen(false)}>
                      <div className={styles.ddLinkIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253" />
                        </svg>
                      </div>
                      <div className={styles.ddLinkText}>
                        <span className={styles.ddLinkName}>International Freight</span>
                        <span className={styles.ddLinkSub}>Air, sea &amp; customs clearance</span>
                      </div>
                    </Link>
                    <Link to="/services/site-services" className={styles.ddLinkEl} onClick={() => setServicesOpen(false)}>
                      <div className={styles.ddLinkIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l5.653-4.655m5.8-5.8.35-.35a3.375 3.375 0 0 1 4.773 0l.709.71a3.375 3.375 0 0 1 0 4.773l-.35.35" />
                        </svg>
                      </div>
                      <div className={styles.ddLinkText}>
                        <span className={styles.ddLinkName}>On-Site Services</span>
                        <span className={styles.ddLinkSub}>Porters, unboxing &amp; pack-down</span>
                      </div>
                    </Link>
                  </div>
                  <div className={styles.ddCol}>
                    <span className={styles.ddColLabel}>For Organisers</span>
                    <Link to="/services/onsite-logistics" className={styles.ddLinkEl} onClick={() => setServicesOpen(false)}>
                      <div className={styles.ddLinkIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                        </svg>
                      </div>
                      <div className={styles.ddLinkText}>
                        <span className={styles.ddLinkName}>On-Site Logistics</span>
                        <span className={styles.ddLinkSub}>Full show floor management</span>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className={styles.ddFooter}>
                  <span className={styles.ddFooterText}>Not sure what you need?</span>
                  <Link to="/contact" className={styles.ddFooterLink} onClick={() => setServicesOpen(false)}>
                    Talk to us
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </li>

            <li className={styles.navLinkItem}>
              <Link to="/about" className={`${styles.navA} ${isActive('/about') ? styles.active : ''}`}>About</Link>
            </li>
            <li className={styles.navLinkItem}>
              <Link to="/faq" className={`${styles.navA} ${isActive('/faq') ? styles.active : ''}`}>FAQ</Link>
            </li>
            <li className={styles.navLinkItem}>
              <Link to="/contact" className={`${styles.navA} ${isActive('/contact') ? styles.active : ''}`}>Contact</Link>
            </li>
          </ul>

          {/* Desktop CTA */}
          <div className={styles.navBtns}>
            <Link to="/quote" className={styles.btnNavSolid}>Get a Quote</Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`${styles.mobileBtn} ${mobileOpen ? styles.open : ''}`}
            onClick={() => setMobileOpen(o => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.open : ''}`}>
        <Link to="/" className={styles.mobileLink}>Home</Link>
        <Link to="/services/freight" className={styles.mobileLink}>Domestic Freight</Link>
        <Link to="/services/international-freight" className={styles.mobileLink}>International Freight</Link>
        <Link to="/services/site-services" className={styles.mobileLink}>On-Site Services</Link>
        <Link to="/services/onsite-logistics" className={styles.mobileLink}>On-Site Logistics</Link>
        <Link to="/about" className={styles.mobileLink}>About</Link>
        <Link to="/faq" className={styles.mobileLink}>FAQ</Link>
        <Link to="/contact" className={styles.mobileLink}>Contact</Link>
        <Link to="/quote" className={styles.mobileSolid}>Get a Quote</Link>
      </div>
    </>
  );
};

export default Header;
