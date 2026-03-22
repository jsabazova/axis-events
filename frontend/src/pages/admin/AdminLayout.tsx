import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './AdminLayout.module.scss';

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
  const [collapsed, setCollapsed]       = useState(false);
  const [libraryOpen, setLibraryOpen]   = useState(false);
  const [adminOpen, setAdminOpen]       = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const initials = user?.email?.slice(0, 2).toUpperCase() ?? 'AE';

  return (
    <div className={`${styles.layoutWrap} ${collapsed ? styles.collapsed : ''}`}>
      <aside className={styles.sidebar}>
        <button className={styles.collapseTab} onClick={() => setCollapsed(c => !c)}>
          <svg
            viewBox="0 0 8 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transform: collapsed ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}
          >
            <path d="M6 1L2 6l4 5"/>
          </svg>
        </button>

        <div className={`${styles.sidebarTop} ${collapsed ? styles.collapsed : ''}`}>
          <div className={styles.logoBox}>A</div>
          <div className={`${styles.logoWords} ${collapsed ? styles.collapsed : ''}`}>
            <strong>Axis Events</strong>
            <small>Admin Panel</small>
          </div>
        </div>

        <nav className={styles.sidebarNav}>
          {NAV.map(section => {
            const isOpen = section.label === 'Library' ? libraryOpen : adminOpen;
            const toggle = section.label === 'Library'
              ? () => setLibraryOpen(o => !o)
              : () => setAdminOpen(o => !o);

            return (
              <div className={styles.navSection} key={section.label}>
                {section.collapsible ? (
                  <div
                    className={`${styles.sectionLabelCollapsible} ${collapsed ? styles.collapsed : ''} ${isOpen ? styles.open : ''}`}
                    onClick={toggle}
                  >
                    {section.label}
                    <svg viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                      <path d="M1 1l4 4 4-4"/>
                    </svg>
                  </div>
                ) : (
                  <div className={`${styles.sectionLabel} ${collapsed ? styles.collapsed : ''}`}>
                    {section.label}
                  </div>
                )}

                <div className={`${styles.sectionItems} ${(!section.collapsible || isOpen) ? styles.open : ''}`}>
                  {section.items.map(item => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={'end' in item ? item.end : false}
                      className={({ isActive }) =>
                        `${styles.navItem} ${collapsed ? styles.collapsed : ''} ${isActive ? styles.active : ''}`
                      }
                    >
                      <span className={styles.navIcon}>{item.icon}</span>
                      <span className={`${styles.navLabel} ${collapsed ? styles.collapsed : ''}`}>
                        {item.label}
                      </span>
                      {collapsed && <span className={styles.tooltip}>{item.label}</span>}
                    </NavLink>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>

        <div className={`${styles.sidebarBottom} ${collapsed ? styles.collapsed : ''}`}>
          <div className={`${styles.userMenu} ${userMenuOpen ? styles.open : ''} ${collapsed ? styles.collapsed : ''}`}>
            <div className={`${styles.userMenuItem} ${styles.danger}`} onClick={handleSignOut}>
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 4h3a2 2 0 012 2v8a2 2 0 01-2 2h-3"/><path d="M8 15l5-5-5-5"/><path d="M13 10H3"/>
              </svg>
              Sign Out
            </div>
          </div>
          <div className={styles.userRow} onClick={e => { e.stopPropagation(); setUserMenuOpen(o => !o); }}>
            <div className={styles.userAvatar}>{initials}</div>
            <div className={`${styles.userInfo} ${collapsed ? styles.collapsed : ''}`}>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.72)', fontWeight: 500 }}>{user?.email}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.28)' }}>Admin</div>
            </div>
          </div>
        </div>
      </aside>

      <div className={styles.main} onClick={() => setUserMenuOpen(false)}>
        <div className={styles.topbar}>
          <span className={styles.pageTitle}>Admin</span>
        </div>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
