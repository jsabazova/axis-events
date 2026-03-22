import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.scss';

const CheckSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" width="13" height="13" style={{ color: '#00b050', flexShrink: 0 }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>
);
const ArrowSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" width="13" height="13">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
  </svg>
);

const HomePage: React.FC = () => (
  <>
    {/* HERO */}
    <section className={styles.hero}>
      <div className={styles.heroLines}>
        <svg viewBox="0 0 600 480" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMaxYMid meet">
          <path d="M 600 40 L 480 40 Q 460 40 460 60 L 460 160" stroke="#00b050" strokeWidth="1.5" strokeOpacity="0.3" fill="none"/>
          <path d="M 600 160 L 520 160 Q 500 160 500 180 L 500 280 Q 500 300 480 300 L 380 300" stroke="#00b050" strokeWidth="1.5" strokeOpacity="0.18" fill="none"/>
          <path d="M 600 80 L 550 80" stroke="#00b050" strokeWidth="1.5" strokeOpacity="0.5" fill="none"/>
          <path d="M 600 260 L 540 260 Q 520 260 520 240 L 520 220" stroke="#00b050" strokeWidth="1" strokeOpacity="0.15" fill="none"/>
        </svg>
      </div>
      <div className={styles.heroInner}>
        <div className={styles.heroContent}>
          <h1 className={styles.h1}>Event Logistics<br />that <em>disappears</em><br />into the background.</h1>
          <p className={styles.heroSub}>From warehouse to stand, bump-in to bump-out — we handle every part of the logistics so you can focus on what matters: the show.</p>
          <div className={styles.heroCtas}>
            <Link to="/quote" className={styles.btnSolid}>
              Get a Quote
              <ArrowSvg />
            </Link>
            <Link to="/about" className={styles.btnOutline}>About us</Link>
          </div>
        </div>
        <div className={styles.heroImgWrap}>
          <div className={styles.heroCircle}>
            <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80" alt="Event floor" />
          </div>
        </div>
      </div>
    </section>

    {/* TRUST BAR */}
    <div className={styles.trustBar}>
      <div className={styles.trustInner}>
        <span className={styles.trustLabel}>Covering</span>
        <span className={styles.trustDiv} />
        <div className={styles.trustItems}>
          {['Sydney','Melbourne','Brisbane','Adelaide','Perth','Gold Coast','Canberra'].map(city => (
            <span key={city} className={styles.trustPill}><span className={styles.trustDot} />{city}</span>
          ))}
        </div>
      </div>
    </div>

    {/* WHO WE SERVE */}
    <section className={styles.paths}>
      <div className={styles.pathsGrid}>
        <Link to="/services/freight" className={styles.pathCard}>
          <div className={styles.pathTag}>For Exhibitors</div>
          <h3 className={styles.pathTitle}>Getting your freight to the show.</h3>
          <p className={styles.pathDesc}>From a few boxes and a banner bag to full pallet loads — we move it, track it, and get it to your stand.</p>
          <ul className={styles.pathFeatures}>
            <li>Domestic freight, door-to-stand</li>
            <li>International freight — air &amp; sea</li>
            <li>On-site handling services</li>
          </ul>
          <div className={styles.pathActions}>
            <Link to="/quote" className={styles.pathBtn}>
              Get a quote <ArrowSvg />
            </Link>
            <Link to="/services/freight" className={styles.pathMore}>
              Learn more
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/></svg>
            </Link>
          </div>
        </Link>

        <Link to="/services/onsite-logistics" className={styles.pathCard}>
          <div className={styles.pathTag}>For Organisers</div>
          <h3 className={styles.pathTitle}>Running the logistics side of your show.</h3>
          <p className={styles.pathDesc}>From dock management and crew to exhibitor freight tracking — we build the operation around your event.</p>
          <ul className={styles.pathFeatures}>
            <li>Forklift operators, spotters &amp; site managers</li>
            <li>Dock management &amp; truck scheduling</li>
            <li>Live freight tracking for exhibitors</li>
          </ul>
          <div className={styles.pathActions}>
            <Link to="/quote" className={styles.pathBtn}>
              Request a quote <ArrowSvg />
            </Link>
            <Link to="/services/onsite-logistics" className={styles.pathMore}>
              Learn more
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/></svg>
            </Link>
          </div>
        </Link>
      </div>
    </section>

    {/* SERVICES */}
    <section className={styles.section}>
      <div className={styles.sectionInner}>
        <span className={styles.eyebrow}>What we do</span>
        <h2 className={styles.sectionH}>Everything that moves<br />before, during, and after the show.</h2>
        <p className={styles.sectionP}>Comprehensive logistics for exhibitions, trade shows, and live events. Whether you need one service or all of them.</p>
        <div className={styles.servicesGrid}>
          <Link to="/services/freight" className={styles.svcCard}>
            <div className={styles.svcImg}>
              <img src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80" alt="Domestic Freight" />
            </div>
            <div className={styles.svcBody}>
              <div className={styles.svcIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/></svg>
              </div>
              <h3 className={styles.svcTitle}>Domestic Freight</h3>
              <p className={styles.svcDesc}>Door-to-stand delivery for exhibitors across Australia. Boxes, pallets, oversized loads — we move it all.</p>
              <span className={styles.svcLink}>Learn more <ArrowSvg /></span>
            </div>
          </Link>

          <Link to="/services/international-freight" className={styles.svcCard}>
            <div className={styles.svcImg}>
              <img src="https://images.unsplash.com/photo-1494961104209-3c223057bd26?w=800&q=80" alt="International Freight" />
            </div>
            <div className={styles.svcBody}>
              <div className={styles.svcIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253"/></svg>
              </div>
              <h3 className={styles.svcTitle}>International Freight</h3>
              <p className={styles.svcDesc}>Air and sea freight, customs clearance, ATA carnets. We handle every step so you don't have to.</p>
              <span className={styles.svcLink}>Learn more <ArrowSvg /></span>
            </div>
          </Link>

          <Link to="/services/onsite-logistics" className={styles.svcCardDark}>
            <div className={styles.svcImg}>
              <img src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80" alt="On-Site Logistics" style={{ opacity: 0.6 }} />
            </div>
            <div className={styles.svcBody}>
              <div className={styles.svcIconDark}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"/></svg>
              </div>
              <h3 className={styles.svcTitleDark}>On-Site Logistics &amp; Management</h3>
              <p className={styles.svcDescDark}>Full show floor management for organisers. Crew, equipment, dock management, and live freight tracking.</p>
              <span className={styles.svcLinkDark}>Learn more <ArrowSvg /></span>
            </div>
          </Link>
        </div>
      </div>
    </section>

    {/* WHY AXIS */}
    <section className={styles.why}>
      <div className={styles.whyLayout}>
        <div>
          <span className={styles.eyebrow}>Why Axis Events</span>
          <h2 className={styles.sectionH}>Built by people who've worked the floor.</h2>
          <p className={styles.sectionP} style={{ marginBottom: 0 }}>We know what it's like because we've done it — loading trucks, managing docks, running shows from the inside. That experience is in everything we do.</p>
          <div className={styles.whyPoints}>
            {[
              { title: 'Reliable',         body: 'We do what we say. If something comes up, we communicate immediately — no surprises.' },
              { title: 'Straight talkers', body: 'No jargon, no layers. You know what\'s happening with your freight and someone always knows your event.' },
              { title: 'Strong relationships', body: 'Years of groundwork with venues, carriers, and warehouses across Australia.' },
              { title: 'Value-driven',     body: 'Lean overheads, competitive supplier partnerships — strong pricing without cutting corners.' },
            ].map(p => (
              <div key={p.title} className={styles.whyPoint}>
                <div className={styles.whyTick}><CheckSvg /></div>
                <div className={styles.whyPtBody}>
                  <h4>{p.title}</h4>
                  <p>{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.whyVisual}>
          <div className={styles.whyImg}>
            <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80" alt="Trade show" />
          </div>
          <div className={styles.coveragePanel}>
            <div className={styles.coverageHeader}>
              <h4>National coverage</h4>
              <span className={styles.livePill}>Active</span>
            </div>
            {[
              { city: 'Sydney',       status: 'Active' },
              { city: 'Melbourne',    status: 'Active' },
              { city: 'Brisbane',     status: 'Active' },
              { city: 'Adelaide',     status: 'Active' },
              { city: 'Perth',        status: 'Active' },
              { city: 'Gold Coast',   status: 'Active' },
            ].map(r => (
              <div key={r.city} className={styles.covRow}>
                <span className={styles.covCity}>{r.city}</span>
                <span className={styles.covStatus}>{r.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* BOTTOM BAND */}
    <section className={styles.band}>
      <div className={styles.bandInner}>
        <div className={styles.bandIntro}>
          <h2>Not sure where<br />to start?</h2>
          <p>Every show is different. Tell us what you need and we'll put the right solution together.</p>
        </div>
        <div className={styles.bandLinks}>
          {[
            { to: '/services/freight',              label: 'Domestic Freight',         sub: 'Door-to-stand, Australia-wide' },
            { to: '/services/international-freight', label: 'International Freight',    sub: 'Air, sea & customs clearance' },
            { to: '/services/site-services',         label: 'On-Site Services',         sub: 'Porters, unboxing & pack-down' },
            { to: '/services/onsite-logistics',      label: 'Organiser Logistics',      sub: 'Full show floor management' },
          ].map(l => (
            <Link key={l.to} to={l.to} className={styles.bandLink}>
              <div className={styles.bandLinkText}>
                <span className={styles.bandLinkLabel}>{l.label}</span>
                <span className={styles.bandLinkSub}>{l.sub}</span>
              </div>
              <ArrowSvg />
            </Link>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default HomePage;
