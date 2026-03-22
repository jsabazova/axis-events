import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';

// ── LAYOUT ────────────────────────────────────────────────────────────────────
const LayoutWrap = styled.div<{ $collapsed: boolean }>`
  display: grid;
  grid-template-columns: ${p => p.$collapsed ? '56px' : '240px'} 1fr;
  height: 100vh;
  overflow: hidden;
  transition: grid-template-columns 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: #f5f5f3;
  font-family: 'DM Sans', sans-serif;
`;

// ── SIDEBAR ───────────────────────────────────────────────────────────────────
const Sidebar = styled.aside`
  background: #16181a;
  display: flex;
  flex-direction: column;
  overflow: visible;
  position: relative;
  z-index: 20;
  border-right: 1px solid rgba(255,255,255,0.05);
`;

const CollapseTab = styled.button`
  position: absolute;
  top: 50%;
  right: -18px;
  transform: translateY(-50%);
  width: 18px;
  height: 56px;
  background: #16181a;
  border: 1px solid rgba(255,255,255,0.09);
  border-left: none;
  border-radius: 0 10px 10px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 30;
  padding: 0;
  transition: background 0.15s, width 0.15s;

  svg { width: 9px; height: 9px; color: #00c05a; transition: transform 0.3s; }
  &:hover { background: #2a2e32; width: 22px; }
`;

const SidebarTop = styled.div<{ $collapsed: boolean }>`
  padding: ${p => p.$collapsed ? '14px 0' : '18px 14px 16px'};
  border-bottom: 1px solid rgba(255,255,255,0.06);
  display: flex;
  align-items: center;
  justify-content: ${p => p.$collapsed ? 'center' : 'flex-start'};
  gap: 10px;
  flex-shrink: 0;
`;

const LogoBox = styled.div`
  width: 34px; height: 34px; flex-shrink: 0;
  background: #00c05a; border-radius: 9px;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Syne', sans-serif; font-weight: 800; font-size: 17px; color: #000;
`;

const LogoWords = styled.div<{ $collapsed: boolean }>`
  overflow: hidden;
  white-space: nowrap;
  opacity: ${p => p.$collapsed ? 0 : 1};
  max-width: ${p => p.$collapsed ? '0' : '160px'};
  transition: opacity 0.22s, max-width 0.3s;

  strong { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 13.5px; color: white; display: block; line-height: 1.25; }
  small  { font-size: 9.5px; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.28); }
`;

const SidebarNav = styled.nav`
  flex: 1;
  padding: 12px 10px;
  overflow-y: auto;
  overflow-x: hidden;
`;

const NavSection = styled.div`
  margin-bottom: 4px;
`;

const SectionLabel = styled.div<{ $collapsed: boolean }>`
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.2);
  padding: 8px 8px 5px;
  white-space: nowrap;
  overflow: hidden;
  opacity: ${p => p.$collapsed ? 0 : 1};
  transition: opacity 0.18s;
`;

const SectionLabelCollapsible = styled.div<{ $collapsed: boolean; $open: boolean }>`
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.2);
  padding: 8px 8px 5px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border-radius: 6px;
  transition: opacity 0.18s, color 0.15s;
  opacity: ${p => p.$collapsed ? 0 : 1};

  &:hover { color: rgba(255,255,255,0.4); }

  svg {
    width: 10px; height: 10px; flex-shrink: 0;
    color: #00c05a; opacity: 0.5;
    transform: ${p => p.$open ? 'rotate(180deg)' : 'none'};
    transition: transform 0.2s;
  }
`;

const SectionItems = styled.div<{ $open: boolean }>`
  overflow: hidden;
  max-height: ${p => p.$open ? '400px' : '0'};
  opacity: ${p => p.$open ? 1 : 0};
  pointer-events: ${p => p.$open ? 'all' : 'none'};
  transition: max-height 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s;
`;

const navItemBase = `
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 8px;
  border-radius: 8px;
  cursor: pointer;
  color: rgba(255,255,255,0.42);
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.15s;
  margin-bottom: 1px;
  white-space: nowrap;
  position: relative;
  user-select: none;

  &:hover { color: rgba(255,255,255,0.78); background: rgba(255,255,255,0.06); }
  &.active { color: white; background: rgba(0,192,90,0.16); }
  &.active .nav-icon { color: #00c05a; }
`;

const NavItem = styled(NavLink)<{ $collapsed: boolean }>`
  ${navItemBase}
  justify-content: ${p => p.$collapsed ? 'center' : 'flex-start'};
  padding: ${p => p.$collapsed ? '9px 0' : '9px 8px'};
`;

const NavIcon = styled.span`
  width: 20px; height: 20px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px;
  svg { width: 18px; height: 18px; }
`;

const NavLabel = styled.span<{ $collapsed: boolean }>`
  overflow: hidden;
  white-space: nowrap;
  opacity: ${p => p.$collapsed ? 0 : 1};
  max-width: ${p => p.$collapsed ? '0' : '160px'};
  transition: opacity 0.18s, max-width 0.3s;
`;

const Tooltip = styled.span`
  position: absolute;
  left: calc(100% + 16px);
  top: 50%;
  transform: translateY(-50%);
  background: #1e2124;
  color: white;
  font-size: 12px;
  font-weight: 500;
  padding: 5px 10px;
  border-radius: 7px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  border: 1px solid rgba(255,255,255,0.08);
  z-index: 200;

  &::before {
    content: '';
    position: absolute;
    right: 100%; top: 50%;
    transform: translateY(-50%);
    border: 5px solid transparent;
    border-right-color: #1e2124;
  }
`;

const NavItemWithTooltip = styled(NavItem)`
  &:hover ${Tooltip} { opacity: 1; transition: opacity 0.15s 0.08s; }
`;

// ── BOTTOM USER AREA ──────────────────────────────────────────────────────────
const SidebarBottom = styled.div<{ $collapsed: boolean }>`
  padding: ${p => p.$collapsed ? '10px 0' : '14px'};
  border-top: 1px solid rgba(255,255,255,0.06);
  flex-shrink: 0;
  position: relative;
  display: flex;
  justify-content: ${p => p.$collapsed ? 'center' : 'flex-start'};
`;

const UserRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  overflow: hidden;
  cursor: pointer;
  padding: 8px 10px;
  border-radius: 9px;
  transition: background 0.15s;
  margin: -8px -10px;
  &:hover { background: rgba(255,255,255,0.07); }
`;

const UserAvatar = styled.div`
  width: 30px; height: 30px; flex-shrink: 0;
  background: linear-gradient(135deg, #00c05a, #00a84e);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 700; color: #000;
`;

const UserInfo = styled.div<{ $collapsed: boolean }>`
  overflow: hidden;
  opacity: ${p => p.$collapsed ? 0 : 1};
  max-width: ${p => p.$collapsed ? '0' : '160px'};
  transition: opacity 0.18s, max-width 0.3s;
  white-space: nowrap;
`;

const UserMenu = styled.div<{ $open: boolean; $collapsed: boolean }>`
  position: absolute;
  bottom: calc(100% + 8px);
  ${p => p.$collapsed ? 'left: calc(100% + 10px); bottom: 0; right: auto; width: 180px;' : 'left: 10px; right: 10px;'}
  background: #1e2124;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 11px;
  overflow: hidden;
  box-shadow: 0 -8px 32px rgba(0,0,0,0.4);
  opacity: ${p => p.$open ? 1 : 0};
  pointer-events: ${p => p.$open ? 'all' : 'none'};
  transform: translateY(${p => p.$open ? 0 : '6px'});
  transition: opacity 0.18s, transform 0.18s;
  z-index: 50;
`;

const UserMenuItem = styled.div<{ $danger?: boolean }>`
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 10px 13px;
  font-size: 13px;
  color: rgba(255,255,255,0.6);
  cursor: pointer;
  transition: background 0.12s, color 0.12s;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  &:last-child { border-bottom: none; }
  &:hover {
    background: ${p => p.$danger ? 'rgba(239,68,68,0.12)' : 'rgba(255,255,255,0.07)'};
    color: ${p => p.$danger ? '#ef4444' : 'rgba(255,255,255,0.9)'};
  }
  svg { width: 14px; height: 14px; flex-shrink: 0; opacity: 0.7; }
`;

// ── MAIN AREA ─────────────────────────────────────────────────────────────────
const Main = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0;
`;

const Topbar = styled.div`
  height: 56px;
  border-bottom: 1px solid #eaeae8;
  display: flex;
  align-items: center;
  padding: 0 26px;
  background: #ffffff;
  flex-shrink: 0;
  gap: 10px;
`;

const PageTitle = styled.span`
  font-family: 'Syne', sans-serif;
  font-weight: 700;
  font-size: 15.5px;
  color: #111214;
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
`;

// ── NAV CONFIG ────────────────────────────────────────────────────────────────
const NAV = [
  {
    label: 'Logistics', collapsible: false, items: [
      { to: '/admin', label: 'Dashboard', end: true, icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="7" height="7" rx="1.5"/><rect x="11" y="2" width="7" height="7" rx="1.5"/><rect x="2" y="11" width="7" height="7" rx="1.5"/><rect x="11" y="11" width="7" height="7" rx="1.5"/></svg> },
      { to: '/admin/bookings', label: 'Bookings', icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10l4 4 8-8"/><rect x="2" y="2" width="16" height="16" rx="3"/></svg> },
    ]
  },
  {
    label: 'Operations', collapsible: false, items: [
      { to: '/admin/overview', label: 'Overview', icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="10" r="8"/><path d="M10 6v4l3 3"/></svg> },
      { to: '/admin/shows', label: 'Shows', icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="14" height="14" rx="2"/><path d="M7 2v4M13 2v4M3 9h14"/></svg> },
      { to: '/admin/quotes', label: 'Quotes', icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z"/><path d="M7 7h6M7 10h6M7 13h4"/></svg> },
      { to: '/admin/jobs', label: 'Jobs', icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M1 13V8l3-5h9v10H1z"/><path d="M13 6h3l3 4v3h-6V6z"/><circle cx="5" cy="15" r="1.5"/><circle cx="15.5" cy="15" r="1.5"/></svg> },
    ]
  },
  {
    label: 'Library', collapsible: true, items: [
      { to: '/admin/organisers', label: 'Organisers', icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M2 18c0-3.314 3.134-6 7-6s7 2.686 7 6"/></svg> },
      { to: '/admin/suppliers', label: 'Suppliers', icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h12l1 5H3L4 4z"/><rect x="3" y="9" width="14" height="7" rx="2"/></svg> },
      { to: '/admin/rate-cards', label: 'Rate Cards', icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="10" r="8"/><path d="M10 6v8M7.5 8.5c0-1 1-1.5 2.5-1.5s2.5.67 2.5 1.5-1 1.5-2.5 1.5-2.5.5-2.5 1.5S8.8 13 10 13s2.5-.5 2.5-1.5"/></svg> },
    ]
  },
  {
    label: 'Admin', collapsible: true, items: [
      { to: '/admin/logs', label: 'Logs', icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h12M4 10h8M4 14h5"/><rect x="2" y="2" width="16" height="16" rx="3"/></svg> },
      { to: '/admin/settings', label: 'Settings', icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="10" r="3"/><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.42 1.42M14.36 14.36l1.42 1.42M4.22 15.78l1.42-1.42M14.36 5.64l1.42-1.42"/></svg> },
    ]
  },
];

export default function AdminLayout() {
  const [collapsed, setCollapsed]     = useState(false);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [adminOpen, setAdminOpen]     = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const initials = user?.email?.slice(0, 2).toUpperCase() ?? 'AE';

  return (
    <LayoutWrap $collapsed={collapsed}>
      <Sidebar>
        <CollapseTab onClick={() => setCollapsed(c => !c)}>
          <svg viewBox="0 0 8 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
            style={{ transform: collapsed ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>
            <path d="M6 1L2 6l4 5"/>
          </svg>
        </CollapseTab>

        <SidebarTop $collapsed={collapsed}>
          <LogoBox>A</LogoBox>
          <LogoWords $collapsed={collapsed}>
            <strong>Axis Events</strong>
            <small>Admin Panel</small>
          </LogoWords>
        </SidebarTop>

        <SidebarNav>
          {NAV.map(section => {
            const isOpen = section.label === 'Library' ? libraryOpen : adminOpen;
            const toggle = section.label === 'Library'
              ? () => setLibraryOpen(o => !o)
              : () => setAdminOpen(o => !o);

            return (
              <NavSection key={section.label}>
                {section.collapsible ? (
                  <SectionLabelCollapsible $collapsed={collapsed} $open={isOpen} onClick={toggle}>
                    {section.label}
                    <svg viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                      <path d="M1 1l4 4 4-4"/>
                    </svg>
                  </SectionLabelCollapsible>
                ) : (
                  <SectionLabel $collapsed={collapsed}>{section.label}</SectionLabel>
                )}

                <SectionItems $open={!section.collapsible || isOpen}>
                  {section.items.map(item => (
                    <NavItemWithTooltip
                      key={item.to}
                      to={item.to}
                      end={'end' in item ? item.end : false}
                      $collapsed={collapsed}
                      className={({ isActive }) => isActive ? 'active' : ''}
                    >
                      <NavIcon className="nav-icon">{item.icon}</NavIcon>
                      <NavLabel $collapsed={collapsed}>{item.label}</NavLabel>
                      {collapsed && <Tooltip>{item.label}</Tooltip>}
                    </NavItemWithTooltip>
                  ))}
                </SectionItems>
              </NavSection>
            );
          })}
        </SidebarNav>

        <SidebarBottom $collapsed={collapsed}>
          <UserMenu $open={userMenuOpen} $collapsed={collapsed}>
            <UserMenuItem $danger onClick={handleSignOut}>
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 4h3a2 2 0 012 2v8a2 2 0 01-2 2h-3"/><path d="M8 15l5-5-5-5"/><path d="M13 10H3"/>
              </svg>
              Sign Out
            </UserMenuItem>
          </UserMenu>
          <UserRow onClick={e => { e.stopPropagation(); setUserMenuOpen(o => !o); }}>
            <UserAvatar>{initials}</UserAvatar>
            <UserInfo $collapsed={collapsed}>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.72)', fontWeight: 500 }}>{user?.email}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.28)' }}>Admin</div>
            </UserInfo>
          </UserRow>
        </SidebarBottom>
      </Sidebar>

      <Main onClick={() => setUserMenuOpen(false)}>
        <Topbar>
          <PageTitle>Admin</PageTitle>
        </Topbar>
        <Content>
          <Outlet />
        </Content>
      </Main>
    </LayoutWrap>
  );
}
