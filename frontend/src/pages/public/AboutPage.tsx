import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AboutPage.module.scss';

const team = [
  {name:'Paul Kenna',role:'Director'},
  {name:'Joanne Law',role:'Managing Director'},
  {name:'Nicole Miller',role:'Head of Operations'},
  {name:'Caitlin Duncan',role:'Legal'},
  {name:'Jam',role:'Digital Lead'},
  {name:'Patrick G',role:'Operations'},
  {name:'Dan F',role:'Site Operations'},
  {name:'Andrew McHale',role:'Site Operations'},
  {name:'Ignacio N',role:'Site Operations'},
  {name:'Felipe F',role:'Site Operations'},
];

const values = [
  {label:'Reliability',desc:'We deliver on our promises with punctuality and professionalism. If challenges arise, we communicate openly and immediately to keep clients informed.',num:'01'},
  {label:'Innovation',desc:'We use practical technology to streamline logistics — tools that add real value. Streamlined bookings, automations, and real-time freight visibility built for the events industry.',num:'02'},
  {label:'Customer-Centric',desc:"Clear communication and responsiveness, always. We're upfront about costs — if extra services are required, we say so. No surprises, no hidden charges.",num:'03'},
  {label:'Integrity',desc:'We act transparently and ethically in everything we do — building trust through honesty and accountability. You can hold us to what we say.',num:'04'},
  {label:'Teamwork',desc:'Our crew works collaboratively — across clients, contractors, and each other. Events are a team effort, and we treat them that way.',num:'05'},
  {label:'Agility',desc:"Live events are unpredictable. We adapt quickly and solve problems on the fly — that's just part of working in a live environment.",num:'06'},
  {label:'Value',desc:'Lean operations, remote admin where possible, and competitive supplier partnerships mean we can offer strong pricing without cutting corners on quality or people.',num:'07'},
];

const PersonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>
  </svg>
);
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
  </svg>
);

const AboutPage: React.FC = () => (
  <>
    {/* HERO */}
    <section className={styles.pageHero}>
      <div className={styles.heroLines}>
        <svg viewBox="0 0 600 480" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMaxYMid meet">
          <path d="M 600 40 L 480 40 Q 460 40 460 60 L 460 160" stroke="#00b050" strokeWidth="1.5" strokeOpacity="0.3" fill="none"/>
          <path d="M 600 160 L 520 160 Q 500 160 500 180 L 500 280 Q 500 300 480 300 L 380 300" stroke="#00b050" strokeWidth="1.5" strokeOpacity="0.18" fill="none"/>
          <path d="M 600 80 L 550 80" stroke="#00b050" strokeWidth="1.5" strokeOpacity="0.5" fill="none"/>
        </svg>
      </div>
      <div className={styles.heroInner}>
        <div>
          <div className={styles.heroTag}>About Axis Events</div>
          <h1 className={styles.h1}>Built around the<br />demands of<br /><em>live events.</em></h1>
          <p className={styles.heroSub}>We started at the bottom — long days loading trucks, managing docks, learning the deep intricacies of the events world from the inside. That's what Axis Events is built on.</p>
          <div className={styles.heroTagline}>Your Trusted Partner in Event Logistics</div>
        </div>
        <div className={styles.heroCircle}>
          <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80" alt="Axis Events team" />
        </div>
      </div>
    </section>

    {/* WHO WE ARE */}
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.whoGrid}>
          <div className={styles.introBody}>
            <span className={styles.eyebrow}>Who we are</span>
            <h2 className={styles.sectionH}>We know what it takes to run a live event.</h2>
            <p className={styles.leadP}>Axis Events was founded by people who started at the bottom — spending long, gruelling days loading trucks, managing docks, and learning the deep intricacies and special requirements of the events world.</p>
            <p>From an individual freight booking for a single exhibitor to full site management for an entire show — we provide exactly the support the event requires. No more, no less.</p>
            <p>We've built strong working relationships with venues, carriers, and suppliers across Australia. That groundwork means fewer complications, quicker problem-solving, and smoother delivery on every job.</p>
            <p><strong>We do whatever it takes to get a successful show across the line for our clients.</strong></p>
            <p>We also keep our overheads lean — operating remotely where we can, maintaining competitive supplier partnerships — so our pricing reflects that without compromising on quality or service.</p>
          </div>
          <div className={styles.introVisual}>
            <div className={styles.introImg}><img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80" alt="Trade show floor" /></div>
            <div className={styles.introQuote}><p>We don't just show up — we take pride in the work, build strong relationships, and keep things running smoothly. In a live, fast-changing environment, we stay agile and solve problems as they happen.</p></div>
          </div>
        </div>
      </div>
    </section>

    {/* MISSION & VISION */}
    <section className={styles.sectionAlt}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>What drives us</span>
        <h2 className={styles.sectionH}>Our mission &amp; vision</h2>
        <div className={styles.mvGrid}>
          <div className={styles.mvCard}>
            <div className={styles.mvLabel}>Mission</div>
            <h3 className={styles.mvTitle}>Make logistics invisible — so organisers and exhibitors can focus on the event.</h3>
            <p className={styles.mvBody}>We provide reliable, professional logistics and site management tailored for exhibitions, trade shows, and events across Australia. Through clear communication, efficient operations, and practical technology, we deliver cost-effective solutions and a smoother, more transparent experience for everyone involved.</p>
          </div>
          <div className={styles.mvCardDark}>
            <div className={styles.mvLabelDark}>Vision</div>
            <h3 className={styles.mvTitleDark}>Australia's leading force in event logistics — on every major show floor.</h3>
            <p className={styles.mvBodyDark}>We're building toward a recognised position as the go-to partner for event freight and site services across Australia — known for our technology, our professionalism, and a friendly, capable presence on every site we touch.</p>
          </div>
        </div>
      </div>
    </section>

    {/* CORE VALUES */}
    <section className={styles.section}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>Core values</span>
        <h2 className={styles.sectionH}>How we show up,<br />every time.</h2>
        <div className={styles.valuesList}>
          {values.map(v => (
            <div className={styles.valueRow} key={v.num}>
              <div className={styles.valueLabel}><strong>{v.label}</strong></div>
              <p className={styles.valueDesc}>{v.desc}</p>
              <span className={styles.valueNum}>{v.num}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* WHAT SETS US APART */}
    <section className={styles.sectionAlt}>
      <div className={styles.inner}>
        <div className={styles.apartLayout}>
          <div className={styles.apartImg}><img src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80" alt="On-site logistics" /></div>
          <div className={styles.apartBody}>
            <span className={styles.eyebrow}>What sets us apart</span>
            <h2 className={styles.sectionH}>Logistics that disappears into the background.</h2>
            <p style={{fontSize:'15.5px',lineHeight:1.78,color:'#6b7280',margin:0}}>Our goal is simple — make logistics invisible. No chaos, no chasing, no wondering where things are. Just confidence that everything is moving, on time, in order.</p>
            <div className={styles.apartPoints}>
              {[
                {strong:'Any size, any role.',body:"Individual freight for an exhibitor or full site operations for an organiser — we run it so you don't have to think about it."},
                {strong:'Experienced crew, above-rate pay.',body:'We handpick capable people and pay above standard — so the quality shows on site.'},
                {strong:'Straight communication.',body:"No fluff, no layers. You know what's happening with your freight — and someone always knows your event."},
                {strong:'Strong supplier and venue relationships.',body:'Years of groundwork with carriers, warehouses, and venues across Australia — fewer complications, faster resolution.'},
              ].map(p => (
                <div className={styles.apartPoint} key={p.strong}>
                  <div className={styles.apCheck}><CheckIcon /></div>
                  <p style={{fontSize:'14.5px',lineHeight:1.65,color:'#6b7280',margin:0}}><strong style={{color:'#141414',fontWeight:600}}>{p.strong}</strong> {p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* TEAM */}
    <section className={styles.section}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>The team</span>
        <h2 className={styles.sectionH}>The people behind it.</h2>
        <div className={styles.teamGrid}>
          {team.map(t => (
            <div className={styles.teamCard} key={t.name}>
              <div className={styles.teamAvatar}><PersonIcon /></div>
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:'12.5px',color:'#141414',lineHeight:1.3}}>{t.name}</div>
              <div style={{fontSize:'11px',color:'#a0a0a0',textTransform:'uppercase',letterSpacing:'.08em',fontWeight:600}}>{t.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* TRACKING */}
    <section className={styles.trackSection}>
      <div className={styles.trackInner}>
        <div className={styles.trackHeader}>
          <div>
            <span className={styles.eyebrow} style={{color:'#00b050'}}>Freight visibility</span>
            <h2 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:'clamp(24px,2.8vw,36px)',color:'#fff',letterSpacing:'-.025em',lineHeight:1.08,marginBottom:14}}>Every delivery. Tracked.<br />Confirmed. Visible.</h2>
            <p style={{fontSize:'15.5px',lineHeight:1.72,color:'rgba(255,255,255,.4)',maxWidth:560,margin:0}}>Every item that comes through — couriers, pallets, signage, boxes — is logged and itemised. Exhibitors get photo confirmations and automatic alerts on delivery to stand. Organisers get live admin access to all activity.</p>
          </div>
          <span className={styles.trackBadge}>Live now</span>
        </div>
        <div className={styles.trackPills}>
          {[
            {strong:'Live delivery log',span:'Every item in, itemised in real time'},
            {strong:'Photo confirmations',span:'Sent to exhibitors on delivery to stand'},
            {strong:'SMS & email alerts',span:'Exhibitors notified automatically — no chasing'},
            {strong:'Organiser dashboard',span:'Live access to all activity and data exports'},
          ].map(p => (
            <div className={styles.trackPill} key={p.strong}><strong>{p.strong}</strong><span>{p.span}</span></div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className={styles.ctaSection}>
      <div className={styles.ctaInner}>
        <div>
          <h2 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:'clamp(22px,2.8vw,34px)',color:'#fff',letterSpacing:'-.02em',marginBottom:10}}>Want to know more about what we do?</h2>
          <p style={{fontSize:15,color:'rgba(255,255,255,.38)',lineHeight:1.65,maxWidth:460,margin:0}}>Explore our services — from individual freight bookings to full on-site operations.</p>
        </div>
        <div style={{display:'flex',gap:12,flexShrink:0,flexWrap:'wrap'}}>
          <Link to="/services/site-services" className={styles.btnSolid}>On-Site Services</Link>
          <Link to="/services/freight" className={styles.btnGhost}>Domestic Freight</Link>
          <Link to="/services/international-freight" className={styles.btnGhost}>International Freight</Link>
        </div>
      </div>
    </section>
  </>
);

export default AboutPage;
