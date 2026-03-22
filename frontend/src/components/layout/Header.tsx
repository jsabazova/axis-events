import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

// ── NAV WRAPPER ──────────────────────────────────────────────────────────────
const Nav = styled.nav`
  position: fixed; top: 0; left: 0; right: 0; z-index: 200;
  background: rgba(255,255,255,0.97);
  backdrop-filter: blur(14px);
  border-bottom: 1.5px solid #e5e5e3;
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 40px;

  @media (max-width: 760px) { padding: 0 18px; }
`;

const NavInner = styled.div`
  width: 100%; max-width: 1200px; margin: 0 auto;
  display: flex; align-items: center; justify-content: space-between;
`;

// ── LOGO ─────────────────────────────────────────────────────────────────────
const LogoLink = styled(Link)`
  display: flex; align-items: center; gap: 10px; text-decoration: none;
`;
const LogoBox = styled.div`
  width: 32px; height: 32px; background: #1a1c1e; border-radius: 7px;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  span {
    font-family: 'Syne', sans-serif; font-weight: 800; font-size: 17px;
    color: #00b050; line-height: 1;
  }
`;
const LogoWords = styled.div`
  display: flex; flex-direction: column; line-height: 1.2;
  strong { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 14.5px; color: #1a1c1e; }
  small  { font-size: 10px; font-weight: 400; letter-spacing: 0.1em; text-transform: uppercase; color: #a0a0a0; }
`;

// ── NAV LINKS ─────────────────────────────────────────────────────────────────
const NavLinks = styled.ul`
  display: flex; align-items: center; gap: 2px; list-style: none;

  @media (max-width: 900px) { display: none; }
`;

const NavLinkItem = styled.li`
  position: relative;
`;

const NavA = styled(Link)<{ $active?: boolean }>`
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 14px; font-weight: 500;
  color: ${p => p.$active ? '#007a35' : '#6b7280'};
  font-weight: ${p => p.$active ? 600 : 500};
  background: none; border: none; cursor: pointer;
  padding: 7px 12px; border-radius: 7px;
  transition: color 0.18s, background 0.18s;
  white-space: nowrap; text-decoration: none;

  &:hover { color: #141414; background: #f5f5f3; }
`;

const DropBtn = styled.button<{ $open?: boolean }>`
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 14px; font-weight: 500; color: #6b7280;
  background: none; border: none; cursor: pointer;
  padding: 7px 12px; border-radius: 7px;
  transition: color 0.18s, background 0.18s;
  white-space: nowrap;

  &:hover { color: #141414; background: #f5f5f3; }

  svg { width: 12px; height: 12px; opacity: 0.4; transition: transform 0.2s; flex-shrink: 0;
    transform: ${p => p.$open ? 'rotate(180deg)' : 'none'}; }
`;

// ── MEGA DROPDOWN ─────────────────────────────────────────────────────────────
const MegaDropdown = styled.div<{ $open: boolean }>`
  display: ${p => p.$open ? 'block' : 'none'};
  position: absolute; top: calc(100% + 10px); left: 50%;
  transform: translateX(-50%);
  width: 480px;
  background: #ffffff; border: 1.5px solid #e5e5e3; border-radius: 18px;
  padding: 6px; box-shadow: 0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06);
  z-index: 300;
  animation: dropIn 0.18s ease;

  @keyframes dropIn {
    from { opacity: 0; transform: translateX(-50%) translateY(-6px); }
    to   { opacity: 1; transform: translateX(-50%) translateY(0); }
  }
`;

const DdCols = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 6px;
`;
const DdCol = styled.div`
  display: flex; flex-direction: column;
  & + & { border-left: 1.5px solid #e5e5e3; }
`;
const DdColLabel = styled.span`
  font-size: 9.5px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
  color: #a0a0a0; padding: 10px 12px 6px; display: block;
`;
const DdLinkEl = styled(Link)`
  display: flex; align-items: flex-start; gap: 10px; padding: 10px 12px;
  border-radius: 10px; text-decoration: none; transition: background 0.15s; color: inherit;
  &:hover { background: #f5f5f3; }
  &:hover .dd-name { color: #007a35; }
`;
const DdLinkIcon = styled.div`
  width: 32px; height: 32px; background: #e8f9ef; border: 1px solid rgba(0,176,80,0.22);
  border-radius: 8px; display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; margin-top: 1px;
  svg { width: 15px; height: 15px; color: #007a35; }
`;
const DdLinkText = styled.div`
  display: flex; flex-direction: column; gap: 2px;
`;
const DdLinkName = styled.span`
  font-size: 13.5px; font-weight: 600; color: #141414; line-height: 1.3;
`;
const DdLinkSub = styled.span`
  font-size: 11.5px; color: #a0a0a0; line-height: 1.4;
`;
const DdFooter = styled.div`
  border-top: 1.5px solid #e5e5e3; margin-top: 6px; padding: 10px 12px 6px;
  display: flex; align-items: center; justify-content: space-between;
`;
const DdFooterText = styled.span`
  font-size: 12px; color: #a0a0a0;
`;
const DdFooterLink = styled(Link)`
  font-size: 12px; font-weight: 600; color: #007a35; text-decoration: none;
  display: inline-flex; align-items: center; gap: 4px;
  &:hover { color: #00b050; }
  svg { width: 10px; height: 10px; }
`;

// ── NAV BTNS ──────────────────────────────────────────────────────────────────
const NavBtns = styled.div`
  display: flex; align-items: center; gap: 8px;
  @media (max-width: 900px) { display: none; }
`;
const BtnNavSolid = styled(Link)`
  display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600;
  color: #ffffff; background: #00b050; border: 1.5px solid #00b050;
  padding: 8px 18px; border-radius: 7px; text-decoration: none; white-space: nowrap;
  transition: background 0.18s;
  &:hover { background: #009140; border-color: #009140; }
`;

// ── MOBILE MENU BTN ────────────────────────────────────────────────────────────
const MobileBtn = styled.button<{ $open: boolean }>`
  display: none; flex-direction: column; gap: 5px; padding: 4px;
  background: none; border: none; cursor: pointer;
  @media (max-width: 900px) { display: flex; }
  span {
    display: block; width: 22px; height: 2px; background: #141414;
    transition: all 0.25s;
    &:first-child  { transform: ${p => p.$open ? 'rotate(45deg) translate(5px, 5px)' : 'none'}; }
    &:nth-child(2) { opacity: ${p => p.$open ? 0 : 1}; }
    &:last-child   { transform: ${p => p.$open ? 'rotate(-45deg) translate(5px, -5px)' : 'none'}; }
  }
`;

const MobileMenu = styled.div<{ $open: boolean }>`
  display: ${p => p.$open ? 'flex' : 'none'};
  position: fixed; top: 64px; left: 0; right: 0; bottom: 0;
  background: rgba(255,255,255,0.98); backdrop-filter: blur(14px);
  flex-direction: column; padding: 24px 20px; gap: 4px; z-index: 190;
  overflow-y: auto;
`;
const MobileLink = styled(Link)`
  font-size: 16px; font-weight: 500; color: #141414;
  padding: 12px 0; border-bottom: 1px solid #e5e5e3;
  text-decoration: none;
  &:hover { color: #00b050; }
`;
const MobileSolid = styled(Link)`
  display: block; text-align: center; margin-top: 12px;
  background: #00b050; color: #fff; padding: 13px 24px; border-radius: 8px;
  font-size: 15px; font-weight: 600; text-decoration: none;
  &:hover { background: #009140; }
`;

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
      <Nav>
        <NavInner>
          {/* Logo */}
          <LogoLink to="/">
            <LogoBox><span>A</span></LogoBox>
            <LogoWords>
              <strong>Axis Events</strong>
              <small>Event Logistics</small>
            </LogoWords>
          </LogoLink>

          {/* Desktop nav links */}
          <NavLinks>
            {/* Services mega dropdown */}
            <NavLinkItem ref={dropRef}>
              <DropBtn $open={servicesOpen} onClick={() => setServicesOpen(o => !o)}>
                Services
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </DropBtn>
              <MegaDropdown $open={servicesOpen}>
                <DdCols>
                  <DdCol>
                    <DdColLabel>For Exhibitors</DdColLabel>
                    <DdLinkEl to="/services/freight" onClick={() => setServicesOpen(false)}>
                      <DdLinkIcon>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                        </svg>
                      </DdLinkIcon>
                      <DdLinkText>
                        <DdLinkName className="dd-name">Domestic Freight</DdLinkName>
                        <DdLinkSub>Warehouse to stand, nationwide</DdLinkSub>
                      </DdLinkText>
                    </DdLinkEl>
                    <DdLinkEl to="/services/international-freight" onClick={() => setServicesOpen(false)}>
                      <DdLinkIcon>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253" />
                        </svg>
                      </DdLinkIcon>
                      <DdLinkText>
                        <DdLinkName className="dd-name">International Freight</DdLinkName>
                        <DdLinkSub>Air, sea &amp; customs clearance</DdLinkSub>
                      </DdLinkText>
                    </DdLinkEl>
                    <DdLinkEl to="/services/site-services" onClick={() => setServicesOpen(false)}>
                      <DdLinkIcon>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l5.653-4.655m5.8-5.8.35-.35a3.375 3.375 0 0 1 4.773 0l.709.71a3.375 3.375 0 0 1 0 4.773l-.35.35" />
                        </svg>
                      </DdLinkIcon>
                      <DdLinkText>
                        <DdLinkName className="dd-name">On-Site Services</DdLinkName>
                        <DdLinkSub>Porters, unboxing &amp; pack-down</DdLinkSub>
                      </DdLinkText>
                    </DdLinkEl>
                  </DdCol>
                  <DdCol>
                    <DdColLabel>For Organisers</DdColLabel>
                    <DdLinkEl to="/services/onsite-logistics" onClick={() => setServicesOpen(false)}>
                      <DdLinkIcon>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                        </svg>
                      </DdLinkIcon>
                      <DdLinkText>
                        <DdLinkName className="dd-name">On-Site Logistics</DdLinkName>
                        <DdLinkSub>Full show floor management</DdLinkSub>
                      </DdLinkText>
                    </DdLinkEl>
                  </DdCol>
                </DdCols>
                <DdFooter>
                  <DdFooterText>Not sure what you need?</DdFooterText>
                  <DdFooterLink to="/contact" onClick={() => setServicesOpen(false)}>
                    Talk to us
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </DdFooterLink>
                </DdFooter>
              </MegaDropdown>
            </NavLinkItem>

            <NavLinkItem>
              <NavA to="/about" $active={isActive('/about')}>About</NavA>
            </NavLinkItem>
            <NavLinkItem>
              <NavA to="/faq" $active={isActive('/faq')}>FAQ</NavA>
            </NavLinkItem>
            <NavLinkItem>
              <NavA to="/contact" $active={isActive('/contact')}>Contact</NavA>
            </NavLinkItem>
          </NavLinks>

          {/* Desktop CTA */}
          <NavBtns>
            <BtnNavSolid to="/quote">Get a Quote</BtnNavSolid>
          </NavBtns>

          {/* Mobile hamburger */}
          <MobileBtn $open={mobileOpen} onClick={() => setMobileOpen(o => !o)}>
            <span /><span /><span />
          </MobileBtn>
        </NavInner>
      </Nav>

      {/* Mobile menu */}
      <MobileMenu $open={mobileOpen}>
        <MobileLink to="/">Home</MobileLink>
        <MobileLink to="/services/freight">Domestic Freight</MobileLink>
        <MobileLink to="/services/international-freight">International Freight</MobileLink>
        <MobileLink to="/services/site-services">On-Site Services</MobileLink>
        <MobileLink to="/services/onsite-logistics">On-Site Logistics</MobileLink>
        <MobileLink to="/about">About</MobileLink>
        <MobileLink to="/faq">FAQ</MobileLink>
        <MobileLink to="/contact">Contact</MobileLink>
        <MobileSolid to="/quote">Get a Quote</MobileSolid>
      </MobileMenu>
    </>
  );
};

export default Header;
