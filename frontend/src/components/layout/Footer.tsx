import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

const Footer: React.FC = () => (
  <footer className={styles.footerEl}>
    <div className={styles.footerGrid}>
      <div className={styles.footerBrand}>
        <div className={styles.logoRow}>
          <div className={styles.lBox}><span>A</span></div>
          <div className={styles.lWords}>
            <strong>Axis Events</strong>
            <small>Event Logistics</small>
          </div>
        </div>
        <p>Professional event logistics across Australia. Freight, on-site services, and show management for exhibitors and organisers.</p>
      </div>

      <div className={styles.footerCol}>
        <h5>Services</h5>
        <ul>
          <li><Link to="/services/freight">Domestic Freight</Link></li>
          <li><Link to="/services/international-freight">International Freight</Link></li>
          <li><Link to="/services/site-services">On-Site Services</Link></li>
          <li><Link to="/services/onsite-logistics">On-Site Logistics</Link></li>
        </ul>
      </div>

      <div className={styles.footerCol}>
        <h5>Company</h5>
        <ul>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/faq">FAQ</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/quote">Get a Quote</Link></li>
        </ul>
      </div>

      <div className={styles.footerCol}>
        <h5>Legal</h5>
        <ul>
          <li><Link to="/privacy">Privacy Policy</Link></li>
          <li><Link to="/terms">Terms &amp; Conditions</Link></li>
        </ul>
      </div>
    </div>

    <div className={styles.footerBottom}>
      <p>© {new Date().getFullYear()} Axis Events Pty Ltd. All rights reserved.</p>
      <div className={styles.fbLinks}>
        <Link to="/privacy">Privacy</Link>
        <Link to="/terms">Terms</Link>
      </div>
    </div>
  </footer>
);

export default Footer;
