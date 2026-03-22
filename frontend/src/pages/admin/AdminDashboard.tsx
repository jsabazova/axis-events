import styles from './AdminDashboard.module.scss';

export default function AdminDashboard() {
  return (
    <div className={styles.wrap}>
      <div className={styles.icon}>
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="7" height="7" rx="1.5"/>
          <rect x="11" y="2" width="7" height="7" rx="1.5"/>
          <rect x="2" y="11" width="7" height="7" rx="1.5"/>
          <rect x="11" y="11" width="7" height="7" rx="1.5"/>
        </svg>
      </div>
      <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 18, color: '#111214' }}>
        Dashboard
      </h2>
      <p style={{ fontSize: 13.5, textAlign: 'center', maxWidth: 280, lineHeight: 1.6 }}>
        Live onsite view — truck unloads, driver assignments, storage, equipment and labour on site.
      </p>
      <span className={styles.badge}>Coming soon</span>
    </div>
  );
}
