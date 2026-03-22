import { useEffect, useRef, useState } from 'react';
import styles from './PrivacyPolicyPage.module.scss';

const SECTIONS = [
  { id: 'collection',    title: 'Information We Collect' },
  { id: 'use',          title: 'How We Use It' },
  { id: 'sharing',      title: 'Sharing' },
  { id: 'storage',      title: 'Data Storage' },
  { id: 'rights',       title: 'Your Rights' },
  { id: 'cookies',      title: 'Cookies' },
  { id: 'contact-us',   title: 'Contact Us' },
];

export default function PrivacyPolicyPage() {
  const [active, setActive] = useState('collection');
  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const handler = () => {
      for (const s of SECTIONS) {
        const el = refs.current[s.id];
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top < 120) setActive(s.id);
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = (id: string) => {
    const el = refs.current[id];
    if (!el) return;
    window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - 88, behavior: 'smooth' });
  };

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.tag}>Legal</div>
          <h1 className={styles.heroH1}>Privacy <em>Policy</em></h1>
          <p className={styles.heroSub}>How we collect, use, and protect your personal information.</p>
          <div className={styles.heroMeta}>
            <span className={styles.metaItem}>Last updated March 2026</span>
            <span className={styles.metaItem}>Axis Events Pty Ltd</span>
          </div>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.contentLayout}>
          <div className={styles.toc}>
            <div className={styles.tocLabel}>On this page</div>
            <nav className={styles.tocList}>
              {SECTIONS.map(s => (
                <button
                  key={s.id}
                  className={`${styles.tocLink} ${active === s.id ? styles.tocLinkActive : ''}`}
                  onClick={() => scrollTo(s.id)}
                >
                  {s.title}
                </button>
              ))}
            </nav>
          </div>

          <article>
            <div className={styles.section} ref={el => { refs.current['collection'] = el; }}>
              <h2 className={styles.sectionH2}>Information We Collect</h2>
              <div className={styles.body}>
                <p>We collect information you provide directly to us when you request a quote, contact us, or use our services. This includes your name, company name, email address, phone number, and details about your freight or event logistics requirements.</p>
                <p>We may also collect information automatically when you visit our website, including your IP address, browser type, pages visited, and the referring URL.</p>
              </div>
            </div>

            <div className={styles.section} ref={el => { refs.current['use'] = el; }}>
              <h2 className={styles.sectionH2}>How We Use It</h2>
              <div className={styles.body}>
                <p>We use the information we collect to:</p>
                <ul>
                  <li>Provide, operate, and improve our logistics services</li>
                  <li>Respond to enquiries and provide customer support</li>
                  <li>Send service-related communications</li>
                  <li>Comply with legal obligations</li>
                  <li>Detect and prevent fraud or misuse</li>
                </ul>
                <p>We do not sell, rent, or share your personal information with third parties for their own marketing purposes.</p>
              </div>
            </div>

            <div className={styles.section} ref={el => { refs.current['sharing'] = el; }}>
              <h2 className={styles.sectionH2}>Sharing</h2>
              <div className={styles.body}>
                <p>We may share your information with trusted third-party service providers who assist us in operating our website and conducting our business, subject to confidentiality obligations. These may include freight carriers, customs agents, and technology providers.</p>
                <p>We may also disclose your information if required by law or to protect the rights, property, or safety of Axis Events, our customers, or others.</p>
              </div>
            </div>

            <div className={styles.section} ref={el => { refs.current['storage'] = el; }}>
              <h2 className={styles.sectionH2}>Data Storage</h2>
              <div className={styles.body}>
                <p>Your information is stored securely on servers located in Australia. We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, loss, or disclosure.</p>
                <p>We retain your personal information for as long as necessary to fulfil the purposes for which it was collected, or as required by law.</p>
              </div>
            </div>

            <div className={styles.section} ref={el => { refs.current['rights'] = el; }}>
              <h2 className={styles.sectionH2}>Your Rights</h2>
              <div className={styles.body}>
                <p>Under the Australian Privacy Act 1988, you have the right to:</p>
                <ul>
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate or incomplete information</li>
                  <li>Request deletion of your personal information (subject to legal obligations)</li>
                  <li>Opt out of marketing communications at any time</li>
                </ul>
                <p>To exercise any of these rights, please contact us using the details below.</p>
              </div>
            </div>

            <div className={styles.section} ref={el => { refs.current['cookies'] = el; }}>
              <h2 className={styles.sectionH2}>Cookies</h2>
              <div className={styles.body}>
                <p>We use cookies and similar tracking technologies to improve your experience on our website. Cookies help us understand how visitors interact with our site and allow us to remember your preferences.</p>
                <p>You can control cookies through your browser settings. Disabling cookies may affect some functionality of our website.</p>
              </div>
            </div>

            <div className={styles.section} ref={el => { refs.current['contact-us'] = el; }}>
              <h2 className={styles.sectionH2}>Contact Us</h2>
              <div className={styles.body}>
                <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:</p>
                <p><strong style={{color:'#141414'}}>Axis Events Pty Ltd</strong><br />
                Email: privacy@axis-events.com.au<br />
                Website: axis-events.com.au</p>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
