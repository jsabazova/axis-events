import React from 'react';
import { Link } from 'react-router-dom';
import styles from './OnsiteLogisticsPage.module.scss';

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

const svcs = [
  { name: 'Expertise & Advisory', desc: 'We\'ve run logistics on events of all sizes. Before your show, we\'ll advise on the equipment and crew you actually need — based on your freight volume, venue, and schedule. So you\'re not over or under-resourced on the day.' },
  { name: 'Equipment', desc: 'Forklifts, cranes, elevated work platforms — we source and sort everything required. If specialist attachments or additional equipment are needed during the show, we\'ll get them to site. Pallet jacks and trolleys are available where included or required.' },
  { name: 'On-Site Crew', desc: 'Experienced forklift operators, spotters, site managers, supervisors, dock managers, porters, and general labour. We scale the team to your event. A basic crew handles deliveries — a full team manages the whole operation.' },
  { name: 'Dock & Delivery Management', desc: 'We run a dock management system — truck slots are pre-booked to control traffic flow, reducing congestion and wait times during bump-in and bump-out. We run the dock so it doesn\'t become your problem.' },
  { name: 'Storage', desc: 'From suitcases and small goods through to pallets and large crates — we handle pickup from and delivery back to stands. If space is tight, we can offer storage solutions to handle any surplus.' },
  { name: 'Safety & Compliance', desc: 'All work is performed legally, safely, and to venue requirements. We handle all required inductions, certifications, and compliance — so nothing gets held up on the day.' },
  { name: 'Supplies', desc: 'Things get forgotten or run out — pallet wrap, tape, markers, vests and everything else you might need on the day is always available on-site for purchase.' },
];

const OnsiteLogisticsPage: React.FC = () => (
  <>
    <section className={styles.pageHero}>
      <div className={styles.heroLines}>
        <svg viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMaxYMid meet">
          <path d="M 600 40 L 500 40 Q 480 40 480 60 L 480 140" stroke="#00b050" strokeWidth="1.5" strokeOpacity="0.35" fill="none"/>
          <path d="M 600 200 L 540 200 Q 520 200 520 220 L 520 300 Q 520 320 500 320 L 420 320" stroke="#00b050" strokeWidth="1.5" strokeOpacity="0.2" fill="none"/>
          <path d="M 600 80 L 560 80" stroke="#00b050" strokeWidth="1.5" strokeOpacity="0.5" fill="none"/>
        </svg>
      </div>
      <div className={styles.heroInner}>
        <div className={styles.heroTag}>For Event Organisers</div>
        <h1 className={styles.h1}>The show is yours.<br />The logistics <em>are ours.</em></h1>
        <p className={styles.heroSub}>From the first truck on the dock to the last pallet out the door — we build the right team around your show and run it.</p>
        <div className={styles.heroCtas}>
          <Link className={styles.btnSolid} to="/quote">Request a Quote <ArrowIcon /></Link>
          <Link className={styles.btnGhost} to="/contact">Talk to us first</Link>
        </div>
      </div>
    </section>

    <div className={styles.introStrip}>
      <div className={styles.introStripInner}>
        {[
          { strong: 'Advisory first', span: 'We tell you what you actually need — not what makes us the most money.' },
          { strong: 'Crew & equipment', span: 'Scaled to your event. From one forklift to a full floor operation.' },
          { strong: 'Dock management', span: 'Pre-booked truck slots. Controlled flow. No chaos at bump-in.' },
          { strong: 'Storage & handling', span: 'Suitcases to pallets — picked up, stored, delivered back to stand.' },
        ].map(i => (
          <div className={styles.introItem} key={i.strong}><strong>{i.strong}</strong><span>{i.span}</span></div>
        ))}
      </div>
    </div>

    <section className={styles.sectionWhite}>
      <div className={styles.inner}>
        <div className={styles.twoCol}>
          <div>
            <span className={styles.eyebrow}>What's included</span>
            <h2 className={styles.sectionH}>No two shows are the same. We don't treat them that way.</h2>
            <p className={styles.sectionP}>Whether you need a basic forklift crew for bump-in or a full show management operation — we handle everything that happens behind the scenes. Dock management, crew, equipment, storage, the lot. Tell us about your show and we'll put the right operation together around it.</p>
          </div>
          <div className={styles.pageImg}>
            <img src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80" alt="Event floor operations" />
          </div>
        </div>
        <div className={styles.servicesList}>
          {svcs.map(s => (
            <div className={styles.svcRow} key={s.name}>
              <div className={styles.svcLabel}><span className={styles.svcDot} /><strong style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '13.5px', color: '#141414' }}>{s.name}</strong></div>
              <div className={styles.svcDesc}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className={styles.sectionGrey}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>On-site service desk</span>
        <h2 className={styles.sectionH}>Every delivery.<br />Accounted for.</h2>
        <p className={styles.sectionP}>For shows with a full service setup, we run an on-site service desk. Everything that comes through the dock is logged, tracked, and confirmed — automatically.</p>
        <div className={styles.portalWrap}>
          <div className={styles.portalContent}>
            <h3>Every delivery. Tracked. Confirmed. Visible.</h3>
            <p>Every delivery that comes through — couriers, pallets, signage, boxes — is logged and itemised. Exhibitors get a text and email confirmation with photos the moment their items arrive at their stand. Organisers have live access to monitor all activity at any time.</p>
            <div className={styles.portalFeats}>
              {[
                { strong: 'Live delivery log', span: 'Every item in, itemised as it happens' },
                { strong: 'Photo confirmations', span: 'Sent to exhibitors when items hit their stand' },
                { strong: 'SMS & email alerts', span: 'Automatic — exhibitors don\'t need to chase anyone' },
                { strong: 'Organiser dashboard', span: 'Live access, activity history, and priority requests' },
              ].map(f => (
                <div className={styles.portalFeat} key={f.strong}>
                  <div className={styles.pfeatTick}><CheckIcon /></div>
                  <div className={styles.pfeatBody}><strong>{f.strong}</strong><span>{f.span}</span></div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.portalImgBox}>
            <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80" alt="Event operations" />
          </div>
        </div>
      </div>
    </section>

    <section className={styles.sectionWhite}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>How we work with you</span>
        <h2 className={styles.sectionH}>Two ways to engage us.<br />Every show is different.</h2>
        <div className={styles.modelGrid}>
          <div className={styles.modelCard}>
            <div className={styles.modelTag}>Organiser-Managed</div>
            <h3 className={styles.modelH3}>You're in control.</h3>
            <p className={styles.modelP}>You engage Axis and pay for the crew and equipment you need. Works well for smaller shows — sometimes just a forklift operator and a spotter. It scales for larger shows too, though as complexity grows, so does the investment. We put together the right team based on your show size and predicted freight volume.</p>
            <ul className={styles.modelPoints}>
              <li>Pay for exactly what you need — nothing more</li>
              <li>Tailored to your show size and freight volume</li>
              <li>Clear pricing upfront — no surprises after the event</li>
            </ul>
          </div>
          <div className={styles.modelCardHighlight}>
            <div className={styles.modelTagHighlight}>Exhibitor-Funded</div>
            <h3 className={styles.modelH3}>Full service. No cost to you.</h3>
            <p className={styles.modelPHighlight}>The organiser gets a fully managed on-site logistics service at no cost. The service is funded by charging exhibitors directly for forklifting, storage, porterage, and any labour they require. A minimum freight volume needs to be met — not sure if your show qualifies? We'll work it out with you.</p>
            <ul className={styles.modelPoints}>
              <li>Zero cost to the organiser</li>
              <li>Exhibitors charged only for what they actually use</li>
              <li>Includes service desk, dock management &amp; real-time freight notifications</li>
              <li>Minimum freight volume applies — ask us if you qualify</li>
            </ul>
          </div>
        </div>
        <div className={styles.btnRow}>
          <Link className={styles.btnSolid} to="/quote">Request a Services Quote <ArrowIcon /></Link>
          <Link className={styles.btnOutline} to="/contact">Not sure where to start? Talk to us.</Link>
        </div>
      </div>
    </section>
  </>
);

export default OnsiteLogisticsPage;
