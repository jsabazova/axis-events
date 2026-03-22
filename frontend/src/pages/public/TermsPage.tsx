import { useEffect, useRef, useState } from 'react';
import styles from './TermsPage.module.scss';

const SECTIONS = [
  { id: 'acceptance',   title: 'Acceptance of Terms' },
  { id: 'services',     title: 'Our Services' },
  { id: 'obligations',  title: 'Your Obligations' },
  { id: 'liability',    title: 'Limitation of Liability' },
  { id: 'ip',           title: 'Intellectual Property' },
  { id: 'termination',  title: 'Termination' },
  { id: 'governing',    title: 'Governing Law' },
  { id: 'contact-us',   title: 'Contact Us' },
];

export default function TermsPage() {
  const [active, setActive] = useState('acceptance');
  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const handler = () => {
      for (const s of SECTIONS) {
        const el = refs.current[s.id];
        if (!el) continue;
        if (el.getBoundingClientRect().top < 120) setActive(s.id);
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
          <h1 className={styles.heroH1}>Terms &amp; <em>Conditions</em></h1>
          <p className={styles.heroSub}>Please read these terms carefully before using our services.</p>
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
            <div className={styles.section} ref={el => { refs.current['acceptance'] = el; }}>
              <h2 className={styles.sectionH2}>Acceptance of Terms</h2>
              <div className={styles.body}>
                <p>By accessing or using any services provided by Axis Events Pty Ltd ("Axis Events", "we", "us", "our"), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.</p>
                <p>These terms apply to all clients, visitors, and users who access or use our logistics and freight services.</p>
              </div>
            </div>

            <div className={styles.section} ref={el => { refs.current['services'] = el; }}>
              <h2 className={styles.sectionH2}>Our Services</h2>
              <div className={styles.body}>
                <p>Axis Events provides event logistics, on-site freight management, and international freight services. We reserve the right to modify, suspend, or discontinue any aspect of our services at any time.</p>
                <p>All service agreements, pricing, and scope of work will be confirmed in writing prior to commencement. Verbal agreements or informal communications do not constitute a binding commitment.</p>
                <ul>
                  <li>Quotes are valid for 30 days from the date of issue unless otherwise specified</li>
                  <li>Services are subject to availability at the time of booking</li>
                  <li>Any changes to agreed scope may result in revised pricing</li>
                </ul>
              </div>
            </div>

            <div className={styles.section} ref={el => { refs.current['obligations'] = el; }}>
              <h2 className={styles.sectionH2}>Your Obligations</h2>
              <div className={styles.body}>
                <p>When using our services, you agree to:</p>
                <ul>
                  <li>Provide accurate and complete information regarding your freight and event requirements</li>
                  <li>Notify us promptly of any changes to shipment details, timelines, or event schedules</li>
                  <li>Ensure all items comply with applicable laws, regulations, and customs requirements</li>
                  <li>Pay all invoices within the agreed payment terms</li>
                  <li>Not use our services for any unlawful or prohibited purpose</li>
                </ul>
                <p>You are responsible for ensuring that all goods you ask us to handle are properly declared, labelled, and comply with all relevant regulations including import/export laws.</p>
              </div>
            </div>

            <div className={styles.section} ref={el => { refs.current['liability'] = el; }}>
              <h2 className={styles.sectionH2}>Limitation of Liability</h2>
              <div className={styles.body}>
                <p>To the maximum extent permitted by law, Axis Events shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services.</p>
                <p>Our liability for any loss or damage is limited to the value of the specific service that gave rise to the claim. We are not responsible for:</p>
                <ul>
                  <li>Delays caused by customs, weather, or circumstances outside our control</li>
                  <li>Loss or damage resulting from inadequate packaging by the client</li>
                  <li>Consequential losses including loss of revenue, business interruption, or reputational damage</li>
                </ul>
                <p>Nothing in these terms excludes liability that cannot be excluded under the Australian Consumer Law.</p>
              </div>
            </div>

            <div className={styles.section} ref={el => { refs.current['ip'] = el; }}>
              <h2 className={styles.sectionH2}>Intellectual Property</h2>
              <div className={styles.body}>
                <p>All content on this website, including text, graphics, logos, and software, is the property of Axis Events Pty Ltd and is protected by Australian and international intellectual property laws.</p>
                <p>You may not reproduce, distribute, or create derivative works from our content without prior written permission.</p>
              </div>
            </div>

            <div className={styles.section} ref={el => { refs.current['termination'] = el; }}>
              <h2 className={styles.sectionH2}>Termination</h2>
              <div className={styles.body}>
                <p>Either party may terminate a service agreement with written notice in accordance with the terms specified in the service contract. In the event of termination:</p>
                <ul>
                  <li>All outstanding invoices become immediately payable</li>
                  <li>Any work completed up to the point of termination will be charged at the agreed rate</li>
                  <li>Axis Events reserves the right to terminate services immediately if a client breaches these terms</li>
                </ul>
              </div>
            </div>

            <div className={styles.section} ref={el => { refs.current['governing'] = el; }}>
              <h2 className={styles.sectionH2}>Governing Law</h2>
              <div className={styles.body}>
                <p>These Terms and Conditions are governed by the laws of New South Wales, Australia. Any disputes arising from these terms or your use of our services will be subject to the exclusive jurisdiction of the courts of New South Wales.</p>
                <p>We reserve the right to update these terms at any time. Continued use of our services after changes are posted constitutes acceptance of the updated terms.</p>
              </div>
            </div>

            <div className={styles.section} ref={el => { refs.current['contact-us'] = el; }}>
              <h2 className={styles.sectionH2}>Contact Us</h2>
              <div className={styles.body}>
                <p>If you have any questions about these Terms and Conditions, please contact us:</p>
                <p><strong style={{color:'#141414'}}>Axis Events Pty Ltd</strong><br />
                Email: legal@axis-events.com.au<br />
                Website: axis-events.com.au</p>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
