import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SiteServicesPage.module.scss';

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
  </svg>
);
const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
  </svg>
);

const services = [
  { num: '01', name: 'Vehicle to Stand', desc: 'Got a big show with a 3-hour dock queue and a semi load of freight? We work with stand builders and large deliveries to get your goods moving without the wait. Tell us when your truck is arriving — our forklift operator and spotter will be there waiting. Everything unloaded and delivered straight to your stand, bump-in and bump-out. Minimum costs apply — confirm requirements via the booking form.', tags: ['Forklift','Spotter','Bump-In & Out'], note: 'Minimum costs & requirements apply', query: 'vehicle-to-stand' },
  { num: '02', name: 'Porter Service', desc: 'Need an extra set of hands to carry, move, and position things at your stand? We provide a dedicated porter for bump-in, bump-out, or both. At Axis-run events, short-duration bookings are available. For other shows, minimum labour times apply.', tags: ['Labour','Bump-In & Out','Flexible Duration'], note: 'Min. times at non-Axis events', query: 'porter' },
  { num: '03', name: 'Unboxing & Unpacking', desc: 'We\'ll pull everything off the pallet, unbox your freight, and position items on your stand — following your setup photos or instructions. Cardboard and packaging cleared away. Flexible durations at Axis events; minimum labour times at others.', tags: ['Labour','Setup Ready','Rubbish Removal'], note: 'Min. times at non-Axis events', query: 'unboxing' },
  { num: '04', name: 'Stand Pack-Down', desc: 'From packing down your stand and getting everything back into your boxes and crates, to stacking a pallet and wrapping it ready for collection — we handle the full bump-out process so you can focus on getting out the door.', tags: ['Labour','Pallet Stacking','Bump-Out'], note: 'Waiver required — see below', query: 'pack-down' },
  { num: '05', name: 'Pallet Wrapping', desc: 'We\'ll wrap and secure your pallet ready for transport. Also a mandatory requirement if your goods need forklift handling — it\'s a safety requirement, not an optional extra. Where required, it will be done and charged accordingly.', tags: ['Labour','Per Pallet','Safety Requirement'], note: 'Also required with forklift handling', query: 'pallet-wrapping' },
];

const SiteServicesPage: React.FC = () => (
  <>
    <section className={styles.pageHero}>
      <div className={styles.heroLines}>
        <svg viewBox="0 0 600 420" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMaxYMid meet">
          <path d="M 600 40 L 500 40 Q 480 40 480 60 L 480 150" stroke="#00b050" strokeWidth="1.5" strokeOpacity="0.32" fill="none"/>
          <path d="M 600 200 L 540 200 Q 520 200 520 220 L 520 310 Q 520 330 500 330 L 400 330" stroke="#00b050" strokeWidth="1.5" strokeOpacity="0.18" fill="none"/>
          <path d="M 600 80 L 558 80" stroke="#00b050" strokeWidth="2" strokeOpacity="0.5" fill="none"/>
        </svg>
      </div>
      <div className={styles.heroInner}>
        <div>
          <div className={styles.heroTag}>For Exhibitors</div>
          <h1 className={styles.h1}>Need a hand<br />at the <em>show?</em></h1>
          <p className={styles.heroSub}>Book what you need, nothing more. From getting your freight off the truck and to your stand, to packing everything down and getting it wrapped for the return — we're there when it matters.</p>
          <div className={styles.heroCtas}>
            <Link to="/quote" className={styles.btnSolid}>
              Book a Service <ArrowIcon />
            </Link>
            <Link to="/contact" className={styles.btnGhost}>Ask us first</Link>
          </div>
        </div>
        <div className={styles.heroCard}>
          <div className={styles.hCardLabel}>Services available</div>
          <div className={styles.hSvcList}>
            {[['01','Vehicle to Stand'],['02','Porter Service'],['03','Unboxing & Unpacking'],['04','Stand Pack-Down'],['05','Pallet Wrapping']].map(([n, name]) => (
              <div key={n} className={styles.hSvc}>
                <span className={styles.hSvcNum}>{n}</span>
                <span className={styles.hSvcName}>{name}</span>
                <span className={styles.hSvcDot} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className={styles.sectionWhite}>
      <div className={styles.inner}>
        <div className={styles.servicesHeader}>
          <div>
            <span className={styles.eyebrow}>What we offer</span>
            <h2 className={styles.sectionH}>Hands-on help,<br />scoped to what you need.</h2>
          </div>
          <div className={styles.servicesHeaderRight}>
            <p>All services are available to pre-book. Terms &amp; Conditions and a waiver form are included with every booking — sent through when you submit your request via <Link to="/quote">the booking form</Link>.</p>
          </div>
        </div>
        <div className={styles.svcList}>
          {services.map(s => (
            <div key={s.num} className={styles.svcRow}>
              <div className={styles.svcNum}>{s.num}</div>
              <div className={styles.svcBody}>
                <div className={styles.svcName}>{s.name}</div>
                <p className={styles.svcDesc}>{s.desc}</p>
                <div className={styles.svcTags}>{s.tags.map(t => <span key={t} className={styles.svcTag}>{t}</span>)}</div>
              </div>
              <div className={styles.svcAction}>
                <Link to="/quote" className={styles.svcBook}>Book this <ArrowIcon /></Link>
                <p className={styles.svcNote}>{s.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <div className={styles.anyShow}>
      <div className={styles.anyShowInner}>
        <div className={styles.anyShowLeft}>
          <span className={styles.eyebrowGreen}>Good to know</span>
          <h2>We work at<br /><em>any show.</em><br />Not just ours.</h2>
          <p>You don't need to be at an Axis-managed event to use our on-site services. Whether it's a venue we're running or one we're not — if you need the help, we'll be there.</p>
          <Link to="/contact" className={styles.anyBtn}>Get in touch</Link>
        </div>
        <div className={styles.anyShowRight}>
          {[
            { strong: 'Any venue, Australia-wide', span: 'We can arrange crew and equipment at events across all major cities.' },
            { strong: 'Large or complex deliveries welcome', span: 'We regularly work with stand builders and semi-load deliveries to get around dock congestion.' },
            { strong: 'Labour minimums at non-Axis events', span: 'We\'ll confirm minimum times at booking — no surprises.' },
          ].map(p => (
            <div key={p.strong} className={styles.anyShowPoint}>
              <div className={styles.anyTick}><CheckIcon /></div>
              <div className={styles.anyText}><strong>{p.strong}</strong><span>{p.span}</span></div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <section className={styles.sectionGrey}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>Supplies</span>
        <h2 className={styles.sectionH}>Materials at the service desk</h2>
        <p className={styles.sectionP}>Where Axis Events is the on-site logistics operator for your show, we stock commonly needed items for purchase at the service desk during bump-in and bump-out.</p>
        <div className={styles.suppliesGrid}>
          {[
            { name: 'Pallet Wrap', desc: 'Stretch film for securing your pallet for the return trip', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"/></svg> },
            { name: 'Packing Tape', desc: 'Heavy-duty tape for sealing boxes and cartons', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6"/></svg> },
            { name: 'Markers', desc: 'For labelling cartons, pallets, and storage items', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z"/></svg> },
            { name: 'Labels & Tags', desc: 'Storage labels and freight tags from our team', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"/></svg> },
          ].map(s => (
            <div key={s.name} className={styles.supplyCard}>
              <div className={styles.supplyIcon}>{s.icon}</div>
              <strong style={{ display: 'block', fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '13.5px', color: '#141414', marginBottom: 5 }}>{s.name}</strong>
              <span style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.55 }}>{s.desc}</span>
            </div>
          ))}
        </div>
        <div className={styles.suppliesNote}>
          <p>These items cost us significantly to transport and stock on-site — pricing reflects that. <strong>It's much cheaper to come prepared and grab your supplies before the show.</strong></p>
          <span className={styles.suppliesBadge}>Axis shows only</span>
        </div>
      </div>
    </section>

    <section className={styles.sectionWhite}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>Important to know</span>
        <h2 className={styles.sectionH}>Terms, waivers &amp; liability</h2>
        <p className={styles.sectionP}>A couple of things to be across before you book.</p>
        <div className={styles.liabilityWrap}>
          <div className={styles.lCardDark}>
            <div className={styles.lBarGreen} />
            <h3>A waiver is part of every booking</h3>
            <p>For any service where our crew is physically handling, moving, or packing your goods, a waiver is required. It's included in the booking process — you'll receive it with your confirmation to sign before the event. It confirms that while we take every care, liability for your goods remains with you.</p>
          </div>
          <div className={styles.lCardLight}>
            <div className={styles.lBar} />
            <h3>Terms &amp; Conditions apply to all services</h3>
            <p>All on-site services are subject to our standard <Link to="/terms">Terms &amp; Conditions</Link>. If you have questions about what's covered before booking, <Link to="/contact">get in touch</Link> and we'll walk you through it.</p>
          </div>
        </div>
      </div>
    </section>

    <section className={styles.ctaSection}>
      <div className={styles.ctaInner}>
        <div className={styles.ctaText}>
          <h2>Ready to book?</h2>
          <p>Fill in the service request form and we'll confirm everything well before the show.</p>
        </div>
        <div className={styles.ctaBtns}>
          <Link to="/quote" className={styles.btnCtaSolid}>Book a Service</Link>
          <Link to="/contact" className={styles.btnCtaGhost}>Ask a question first</Link>
        </div>
      </div>
    </section>
  </>
);

export default SiteServicesPage;
