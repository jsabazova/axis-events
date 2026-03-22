import React from 'react';
import { Link } from 'react-router-dom';
import styles from './InternationalFreightPage.module.scss';

const InternationalFreightPage: React.FC = () => (
  <>
    <section className={styles.pageHero}>
      <div className={styles.heroInner}>
        <div className={styles.heroTag}>International Freight</div>
        <h1 className={styles.h1}>Your freight.<br />Any country.<br /><em>We'll sort it.</em></h1>
        <p className={styles.heroSub}>We handle international freight for exhibitors and event organisers — air and sea, inbound and outbound. Customs, documentation, coordination with overseas agents. It's complex, but that's our job. Just get in touch and we'll take it from there.</p>
        <div className={styles.heroBtns}>
          <Link className={styles.btnSolid} to="/contact">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width={15} height={15}><path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"/></svg>
            Get in Touch
          </Link>
          <Link className={styles.btnGhost} to="/services/freight">Domestic Freight</Link>
        </div>
      </div>
    </section>

    <section className={styles.honestStrip}>
      <div className={styles.honestInner}>
        <div className={styles.honestText}>
          <h3>International freight isn't a form.<br />It's a conversation.</h3>
          <p>Every international shipment is different — different countries, different customs rules, different timelines, different carriers. There's no one-size-fits-all process here. So rather than making you fill out a complex form, we'd rather you just contact us, tell us what you're moving and where, and we'll come back with exactly what you need.</p>
        </div>
        <div className={styles.honestPoints}>
          {[
            'Every country has different import and customs requirements — we navigate them for you',
            'Timelines vary significantly between air and sea — we help you plan around show dates',
            'Temporary importation, carnets, and permits are standard for us — not exceptions',
            'We work with a network of international agents to handle the on-the-ground side wherever your show is',
          ].map(t => (
            <div className={styles.honestPoint} key={t}><span className={styles.hpDot} /><span className={styles.hpText}>{t}</span></div>
          ))}
        </div>
      </div>
    </section>

    <section className={styles.sectionWhite}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>How we move it</span>
        <h2 className={styles.sectionH}>Air freight or sea freight —<br />we handle both</h2>
        <div className={styles.modeGrid}>
          <div className={styles.modeCardLight}>
            <div className={styles.modeLabel}><span className={styles.modeDot} />Air Freight</div>
            <h3 className={styles.modeH3Light}>Fast. When timing is everything.</h3>
            <p className={styles.modePLight}>Air freight is the right call when your show is close, your freight is time-sensitive, or you simply can't afford the risk of a longer transit. We coordinate with airlines and freight handlers globally to get your materials where they need to be.</p>
            <div className={styles.modeRowsLight}>
              {[
                <><strong>Express and standard air options</strong> — matched to your show dates and budget</>,
                <><strong>Customs clearance</strong> at origin and destination, managed end-to-end</>,
                <><strong>Sensitive and high-value cargo</strong> handled with appropriate care and documentation</>,
                <><strong>Inbound to Australia</strong> or outbound — we work both directions</>,
              ].map((t, i) => (
                <div className={styles.modeRowLight} key={i}><span className={styles.mrDot} /><span className={styles.mrTextLight}>{t}</span></div>
              ))}
            </div>
          </div>
          <div className={styles.modeCardDark}>
            <div className={styles.modeLabelDark}><span className={styles.modeDot} />Sea Freight</div>
            <h3 className={styles.modeH3Dark}>Cost-effective for larger loads.</h3>
            <p className={styles.modePDark}>When you have more time and more volume, sea freight is often the smarter choice. Full container or shared — we coordinate the booking, documentation, and delivery at both ends through our international agent network.</p>
            <div className={styles.modeRowsDark}>
              {[
                <><strong>FCL (Full Container Load)</strong> for larger or dedicated shipments</>,
                <><strong>LCL (Less Than Container Load)</strong> when you don't need the whole box</>,
                <><strong>Ro/Ro and breakbulk</strong> for oversized, wheeled, or non-standard cargo</>,
                <><strong>Full documentation</strong> — bills of lading, packing lists, customs paperwork handled</>,
              ].map((t, i) => (
                <div className={styles.modeRowDark} key={i}><span className={styles.mrDot} /><span className={styles.mrTextDark}>{t}</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className={styles.sectionGrey}>
      <div className={styles.inner}>
        <div style={{ maxWidth: 560 }}>
          <span className={styles.eyebrow}>What we manage</span>
          <h2 className={styles.sectionH}>The paperwork, the compliance,<br />the coordination</h2>
          <p className={styles.sectionSub}>International freight involves a lot of moving parts beyond the transport itself. Here's what we take off your plate.</p>
        </div>
        <div className={styles.manageRows}>
          {[
            { num: '01', name: 'Customs clearance', desc: 'Import and export customs at both ends — declarations, duties, compliance with local regulations. We handle this as standard, not as an add-on.' },
            { num: '02', name: 'ATA Carnets', desc: 'Temporary importation for goods that will be returned after the show — display items, equipment, samples. We coordinate carnet documentation and ensure everything is returned correctly.' },
            { num: '03', name: 'Shipping documentation', desc: 'Bills of lading, airway bills, commercial invoices, packing lists, certificates of origin — all prepared and verified before freight moves.' },
            { num: '04', name: 'International agent network', desc: 'We work with trusted freight agents in key markets worldwide. They handle the local side — we handle your side. One point of contact for the whole journey.' },
            { num: '05', name: 'Freight insurance', desc: 'General coverage included. Additional insurance available for high-value, fragile, or sensitive items — declare at the time of booking and we\'ll arrange it.' },
            { num: '06', name: 'Return freight', desc: 'We coordinate the outbound and the return. After the show, freight is collected and shipped back — or held if needed for the next event.' },
          ].map(r => (
            <div className={styles.manageRow} key={r.num}>
              <div className={styles.mrLabel}><span className={styles.mrlDot} /><span className={styles.mrlName}>{r.name}</span></div>
              <p className={styles.mrDesc}>{r.desc}</p>
              <span className={styles.mrNum}>{r.num}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className={styles.sectionWhite}>
      <div className={styles.inner}>
        <div className={styles.approachLayout}>
          <div className={styles.approachLeft}>
            <span className={styles.eyebrow}>How we work</span>
            <h2 className={styles.sectionH}>Event freight specialists, not general forwarders</h2>
            <p className="lead">There's a meaningful difference between a general freight forwarder and someone who specialises in events and exhibitions.</p>
            <p>General forwarders move boxes. We move exhibition freight — which means we understand tight bump-in windows, venue receiving requirements, temporary importation, and what it means when something goes wrong the day before a show opens.</p>
            <p>We've built our international operation around event timelines, not standard transit schedules. And because we handle the domestic side too, we can manage the full journey — from overseas origin to your stand — without handing off to someone who doesn't know the show.</p>
          </div>
          <div className={styles.approachRight}>
            {[
              { n: '01', h: 'You tell us what you need', p: 'Origin, destination, what you\'re shipping, how much, and when the show is. That\'s all we need to start working on a plan.' },
              { n: '02', h: 'We come back with a plan', p: 'Air or sea recommendation, timeline, documentation requirements, customs considerations — laid out clearly so you know exactly what\'s happening.' },
              { n: '03', h: 'We manage the whole thing', p: 'Booking, collection, paperwork, agent coordination, customs clearance, delivery to venue. You stay informed — we handle the complexity.' },
              { n: '04', h: 'And we bring it home', p: 'Return freight coordinated the same way. Carnet goods returned correctly. Nothing left behind, nothing left to chance.' },
            ].map(p => (
              <div className={styles.approachPoint} key={p.n}>
                <span className={styles.apNum}>{p.n}</span>
                <div className={styles.apBody}><h4>{p.h}</h4><p>{p.p}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className={styles.ctaSection}>
      <div className={styles.ctaInner}>
        <div className={styles.ctaText}>
          <h2>Moving freight internationally?<br />Let's talk.</h2>
          <p>Tell us where it's going, what you're shipping, and when the show is. We'll take it from there.</p>
        </div>
        <div className={styles.ctaBtns}>
          <Link className={styles.btnSolid} to="/contact">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width={15} height={15}><path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"/></svg>
            Get in Touch
          </Link>
          <Link className={styles.btnGhost} to="/services/freight">Domestic Freight</Link>
        </div>
      </div>
    </section>
  </>
);

export default InternationalFreightPage;
