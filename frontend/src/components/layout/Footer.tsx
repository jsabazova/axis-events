import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterEl = styled.footer`
  background: #1a1c1e;
  padding: 56px 40px 30px;

  @media (max-width: 760px) { padding: 48px 20px 26px; }
`;

const FooterGrid = styled.div`
  max-width: 1200px; margin: 0 auto;
  display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 44px;
  padding-bottom: 40px; border-bottom: 1px solid rgba(255,255,255,0.06);

  @media (max-width: 1080px) { grid-template-columns: 1fr 1fr; }
  @media (max-width: 640px)  { grid-template-columns: 1fr; gap: 28px; }
`;

const FooterBrand = styled.div`
  p {
    font-size: 13px; line-height: 1.65; color: rgba(255,255,255,0.28);
    margin-top: 16px; max-width: 230px;
  }
`;

const LogoRow = styled.div`
  display: flex; align-items: center; gap: 10px;
`;
const LBox = styled.div`
  width: 32px; height: 32px; background: #222527; border-radius: 7px;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  span { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 17px; color: #00b050; line-height: 1; }
`;
const LWords = styled.div`
  display: flex; flex-direction: column; line-height: 1.2;
  strong { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 14.5px; color: rgba(255,255,255,0.85); }
  small  { font-size: 10px; font-weight: 400; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.25); }
`;

const FooterCol = styled.div`
  h5 {
    font-family: 'Syne', sans-serif; font-weight: 600; font-size: 10.5px;
    letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.18);
    margin-bottom: 16px;
  }
  ul {
    list-style: none; padding: 0; margin: 0;
    display: flex; flex-direction: column; gap: 9px;
  }
  a {
    font-size: 13px; color: rgba(255,255,255,0.4); text-decoration: none;
    transition: color 0.18s;
    &:hover { color: #00b050; }
  }
`;

const FooterBottom = styled.div`
  max-width: 1200px; margin: 26px auto 0;
  display: flex; align-items: center; justify-content: space-between;

  p, a {
    font-size: 12px; color: rgba(255,255,255,0.16); text-decoration: none;
    transition: color 0.18s;
    &:hover { color: rgba(255,255,255,0.35); }
  }

  @media (max-width: 640px) { flex-direction: column; gap: 8px; text-align: center; }
`;

const FbLinks = styled.div`
  display: flex; gap: 18px;
`;

const Footer: React.FC = () => (
  <FooterEl>
    <FooterGrid>
      <FooterBrand>
        <LogoRow>
          <LBox><span>A</span></LBox>
          <LWords>
            <strong>Axis Events</strong>
            <small>Event Logistics</small>
          </LWords>
        </LogoRow>
        <p>Professional event logistics across Australia. Freight, on-site services, and show management for exhibitors and organisers.</p>
      </FooterBrand>

      <FooterCol>
        <h5>Services</h5>
        <ul>
          <li><Link to="/services/freight">Domestic Freight</Link></li>
          <li><Link to="/services/international-freight">International Freight</Link></li>
          <li><Link to="/services/site-services">On-Site Services</Link></li>
          <li><Link to="/services/onsite-logistics">On-Site Logistics</Link></li>
        </ul>
      </FooterCol>

      <FooterCol>
        <h5>Company</h5>
        <ul>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/faq">FAQ</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/quote">Get a Quote</Link></li>
        </ul>
      </FooterCol>

      <FooterCol>
        <h5>Legal</h5>
        <ul>
          <li><Link to="/privacy">Privacy Policy</Link></li>
          <li><Link to="/terms">Terms &amp; Conditions</Link></li>
        </ul>
      </FooterCol>
    </FooterGrid>

    <FooterBottom>
      <p>© {new Date().getFullYear()} Axis Events Pty Ltd. All rights reserved.</p>
      <FbLinks>
        <Link to="/privacy">Privacy</Link>
        <Link to="/terms">Terms</Link>
      </FbLinks>
    </FooterBottom>
  </FooterEl>
);

export default Footer;
