import React from 'react';
import { Link } from 'react-router-dom';
import styles from './FreightServicesPage.module.scss';

const FreightServicesPage: React.FC = () => (
  <>
    <section className={styles.pageHero}>
      <div className={styles.heroInner}>
        <div>
          <div className={styles.heroTag}>Domestic Freight</div>
          <h1 className={styles.heroH1}>Your freight.<br /><em>On the floor.</em><br />On time.</h1>
          <p className={styles.heroSub}>We handle domestic freight for exhibitors and event organisers across Australia — from a few boxes and a banner bag, to full pallet loads and oversized builds. You focus on the show. We'll handle the rest.</p>
          <div className={styles.heroBtns}>
            <Link className={styles.btnSolid} to="/contact">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width={15} height={15}><path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"/></svg>
              Get a Quote
            </Link>
            <a className={styles.btnGhost} href="#how-it-works">How it works</a>
          </div>
        </div>
        <div className={styles.heroPanel}>
          <div className={styles.panelLabel}>What we move</div>
          {['Boxes & cartons','Pallets & skids','Signage & banner bags','Stands & custom builds','Crates & flightcases','Equipment & machinery','Oversized & heavy loads'].map(item => (
            <div className={styles.panelRow} key={item}><span className={styles.pDot} /><span className={styles.pText}>{item}</span></div>
          ))}
        </div>
      </div>
    </section>

    <section className={styles.peStrip}>
      <div className={styles.peInner}>
        <div className={styles.peStep}>
          <div className={styles.peNum}>01</div>
          <h3 className={styles.peH3}>Tell us what you're sending</h3>
          <p className={styles.peP}>Number of boxes, pallets, or items — and where they're coming from. That's all we need to get started. No logistics jargon required.</p>
        </div>
        <div className={styles.peStep}>
          <div className={styles.peNum}>02</div>
          <h3 className={styles.peH3}>We collect and coordinate</h3>
          <p className={styles.peP}>We arrange pick-up from your office, warehouse, or supplier and handle everything in between — including any venue requirements or deadlines.</p>
        </div>
        <div className={styles.peStep}>
          <div className={styles.peNum}>03</div>
          <h3 className={styles.peH3}>It arrives at your stand</h3>
          <p className={styles.peP}>Your freight lands at the show, confirmed and accounted for. We'll let you know when it's there — so you can just show up and set up.</p>
        </div>
      </div>
    </section>

    <section className={styles.sectionWhite}>
      <div className={styles.sectionInner}>
        <div className={styles.handleLayout}>
          <div className={styles.handleLeft}>
            <span className={styles.eyebrow}>What we handle</span>
            <h2 className={styles.sectionH}>From 3 boxes to a full semi-load</h2>
            <p className="lead">We work with exhibitors of every size — from a small business sending their first trade show kit, to national brands with complex multi-site freight operations.</p>
            <p>Whether it's a few cartons of brochures and a branded banner, or a pallet of product samples and a custom-built display stand — we've moved it. We understand the timing pressures of events, the venue rules around bump-in, and the stress of freight going wrong the night before a show.</p>
            <p><strong>That's why we do things properly.</strong> We stay across every shipment and keep you informed — so nothing falls through the cracks.</p>
          </div>
          <div>
            <div className={styles.serviceRows}>
              {[
                { num: '01', name: 'Door-to-stand delivery', desc: 'We collect from your office, warehouse, or supplier and deliver directly to your stand at the venue. No middle steps, no confusion.' },
                { num: '02', name: 'Dedicated truck loads', desc: 'Got a semi-load worth of product heading to a show? Need a b-double moving items from your warehouse all day? We run dedicated trucks at scale — you book the load, we handle the rest.' },
                { num: '03', name: 'Return freight', desc: 'We handle the return leg too. Once the show wraps, we collect from your stand and get everything back to where it needs to go.' },
                { num: '04', name: 'Oversized & heavy freight', desc: 'Large exhibit builds, machinery, display structures — we manage the transport, permits, and handling for freight that doesn\'t fit a standard pallet.' },
                { num: '05', name: 'Storage between shows', desc: 'Doing multiple shows across the year? Rather than sending freight back and forth each time, it can be held between events. Talk to us about arranging it.' },
                { num: '06', name: 'Freight insurance', desc: 'General freight insurance is included on all shipments. Additional coverage is available for high-value or sensitive items — just let us know at the time of booking.' },
              ].map(r => (
                <div className={styles.serviceRow} key={r.num}>
                  <div className={styles.srLabel}><span className={styles.srDot} /><span className={styles.srName}>{r.name}</span></div>
                  <p className={styles.srDesc}>{r.desc}</p>
                  <span className={styles.srNum}>{r.num}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className={styles.sectionGrey} id="how-it-works">
      <div className={styles.sectionInner}>
        <div style={{ maxWidth: 520 }}>
          <span className={styles.eyebrow}>How it works</span>
          <h2 className={styles.sectionH}>Simple from your end.<br />Organised from ours.</h2>
          <p className={styles.sectionSub}>We've built the process to be easy for exhibitors — whether it's your first trade show or your fiftieth. Here's what it looks like.</p>
        </div>
        <div className={styles.timeline}>
          {[
            { n: '01', h: 'You submit your freight details', p: 'Fill out a simple booking form — what you\'re sending, how many pieces, where from, and the show dates. No guesswork. We\'ll confirm everything with you before we proceed.' },
            { n: '02', h: 'We send labels and instructions', p: 'You\'ll receive freight labels and clear packing instructions. Stick them on, and your freight is ready to go. We\'ll tell you exactly what needs to happen and when.' },
            { n: '03', h: 'We arrange collection', p: 'We coordinate pick-up from your nominated address — office, warehouse, supplier, or elsewhere. You don\'t need to drop anything off or chase a carrier.' },
            { n: '04', h: 'Freight arrives at the venue', p: 'We manage all venue receiving requirements and timing windows. Your freight comes through the dock and is brought to your stand — we keep an eye on it and follow up if anything looks off.' },
            { n: '05', h: 'You show up. You set up.', p: 'Your freight is at your stand when you arrive. No hunting around the venue, no waiting at the dock. We\'ll have kept you in the loop along the way — just open and go.' },
            { n: '06', h: 'We handle the return (if needed)', p: 'Post-show, we collect from your stand and return freight to your nominated address. Or arrange storage if you\'re doing multiple shows. Just let us know.' },
          ].map(s => (
            <div className={styles.timelineStep} key={s.n}>
              <div className={styles.tsNum}>{s.n}</div>
              <div className={styles.tsBody}><h4>{s.h}</h4><p>{s.p}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className={styles.sectionWhite}>
      <div className={styles.sectionInner}>
        <span className={styles.eyebrow}>Who we work with</span>
        <h2 className={styles.sectionH}>Built for anyone sending freight<br />to a show</h2>
        <div className={styles.whoGrid}>
          {[
            { title: 'First-time exhibitors', desc: 'Never sent freight to a trade show before? We\'ll walk you through everything — what to pack, how to label it, and what to expect on arrival. No stress.', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/></svg> },
            { title: 'Ongoing exhibitors', desc: 'Regular show circuit? We keep records, know your freight profile, and make repeat bookings quick. Familiar faces, consistent service, no re-explaining every time.', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"/></svg> },
            { title: 'Event organisers', desc: 'Managing freight across dozens of exhibitors? We can act as the official freight partner for your show — handling inbound, outbound, and on-floor delivery at scale.', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"/></svg> },
            { title: 'Display & stand builders', desc: 'Shipping crates, flightcases, or custom fabrication? We handle specialist requirements, tight delivery windows, and freight that needs extra care getting to and from the venue.', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l5.653-4.655m5.8-5.8.35-.35a3.375 3.375 0 0 1 4.773 0l.709.71a3.375 3.375 0 0 1 0 4.773l-.35.35"/></svg> },
            { title: 'High-volume shippers', desc: 'Need a semi-load of product running to a show, or a b-double shuttling items from your warehouse all day? We run dedicated trucks at scale — you book the load, we handle the rest.', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/></svg> },
            { title: 'Corporate exhibitors', desc: 'Attending industry conferences with a full booth setup? We\'ve worked across medical, tech, construction, finance, and more. We know the venues and we know the drill.', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"/></svg> },
          ].map(c => (
            <div className={styles.whoCard} key={c.title}>
              <div className={styles.whoIcon}>{c.icon}</div>
              <h4 className={styles.whoH4}>{c.title}</h4>
              <p className={styles.whoP}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className={styles.sectionGrey}>
      <div className={styles.sectionInner}>
        <div className={styles.coverageLayout}>
          <div className={styles.mapBox}>
            <svg style={{ width: '100%', maxWidth: 280 }} viewBox="0 0 400 420" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 120 60 L 140 50 L 170 45 L 210 48 L 250 55 L 285 70 L 310 90 L 325 115 L 330 140 L 328 165 L 320 190 L 318 215 L 325 240 L 330 260 L 320 280 L 305 295 L 285 308 L 268 318 L 255 330 L 248 348 L 240 360 L 230 365 L 218 358 L 210 345 L 205 330 L 198 320 L 188 312 L 172 308 L 158 305 L 145 295 L 132 282 L 120 268 L 108 252 L 98 235 L 90 215 L 85 195 L 82 172 L 80 148 L 82 125 L 88 105 L 100 85 L 110 72 Z" fill="rgba(0,176,80,0.08)" stroke="rgba(0,176,80,0.35)" strokeWidth="1.5"/>
              <path d="M 218 380 L 228 375 L 234 382 L 232 392 L 222 396 L 214 390 Z" fill="rgba(0,176,80,0.08)" stroke="rgba(0,176,80,0.35)" strokeWidth="1.5"/>
              <circle cx="296" cy="255" r="6" fill="#00b050" opacity="0.9"/><circle cx="296" cy="255" r="12" fill="#00b050" opacity="0.15"/>
              <text x="308" y="259" fontFamily="DM Sans, sans-serif" fontSize="10" fill="rgba(0,0,0,0.5)" fontWeight="600">Sydney</text>
              <circle cx="258" cy="305" r="6" fill="#00b050" opacity="0.9"/><circle cx="258" cy="305" r="12" fill="#00b050" opacity="0.15"/>
              <text x="270" y="309" fontFamily="DM Sans, sans-serif" fontSize="10" fill="rgba(0,0,0,0.5)" fontWeight="600">Melbourne</text>
              <circle cx="308" cy="205" r="5" fill="#00b050" opacity="0.75"/><circle cx="308" cy="205" r="10" fill="#00b050" opacity="0.12"/>
              <text x="320" y="209" fontFamily="DM Sans, sans-serif" fontSize="10" fill="rgba(0,0,0,0.5)" fontWeight="600">Brisbane</text>
              <circle cx="210" cy="285" r="5" fill="#00b050" opacity="0.75"/><circle cx="210" cy="285" r="10" fill="#00b050" opacity="0.12"/>
              <text x="148" y="289" fontFamily="DM Sans, sans-serif" fontSize="10" fill="rgba(0,0,0,0.5)" fontWeight="600">Adelaide</text>
              <circle cx="105" cy="225" r="5" fill="#00b050" opacity="0.75"/><circle cx="105" cy="225" r="10" fill="#00b050" opacity="0.12"/>
              <text x="115" y="229" fontFamily="DM Sans, sans-serif" fontSize="10" fill="rgba(0,0,0,0.5)" fontWeight="600">Perth</text>
            </svg>
          </div>
          <div className={styles.coverageBody}>
            <span className={styles.eyebrow}>National coverage</span>
            <h2 className={styles.sectionH}>Wherever the show is,<br />we'll get it there</h2>
            <p className="lead">We move freight to events and trade shows in every major Australian city — and plenty of regional venues too.</p>
            <p>Our carrier network covers metropolitan and regional routes, meaning we can coordinate collection and delivery whether your freight is coming from a suburban office in Melbourne, a warehouse in outer Sydney, or a supplier in Brisbane.</p>
            <div className={styles.cityPills}>
              {['Sydney','Melbourne','Brisbane','Adelaide','Perth','Gold Coast','Canberra','Regional'].map(c => <span className={styles.cityPill} key={c}>{c}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className={styles.techSection}>
      <div className={styles.techInner}>
        <div className={styles.techHeader}>
          <span className={styles.eyebrow} style={{ color: '#00b050' }}>For the logistics people</span>
          <h2>The specifics, if you need them</h2>
          <p>If you're the one who books freight regularly and wants to know the technical detail — here's how we operate.</p>
        </div>
        <div className={styles.techGrid}>
          <div className={styles.techCard}>
            <div className={styles.tcService}><span className={styles.tcAbbrev}>FTL</span><span className={styles.tcSlash}>/</span><span className={styles.tcFull}>Full Truckload</span></div>
            <h4 className={styles.tcH4}>Dedicated transport</h4>
            <p className={styles.tcP}>Direct, unshared vehicles for time-critical or high-volume freight. Semis, b-doubles, and rigid trucks available. Suitable for large stand builds, bulk product runs, and anything that needs its own vehicle and schedule.</p>
          </div>
          <div className={styles.techCard}>
            <div className={styles.tcService}><span className={styles.tcAbbrev}>OSOM</span><span className={styles.tcSlash}>/</span><span className={styles.tcFull}>Oversize &amp; Overmass</span></div>
            <h4 className={styles.tcH4}>Heavy &amp; oversized freight</h4>
            <p className={styles.tcP}>We manage OSOM consignments including wide loads, non-stackable items, and freight requiring permit coordination. We work with specialist carriers for machinery, custom builds, and structural elements.</p>
          </div>
          <div className={styles.techCard}>
            <div className={styles.tcService}><span className={styles.tcAbbrev}>Door-to-Stand</span></div>
            <h4 className={styles.tcH4}>Origin to stand delivery</h4>
            <p className={styles.tcP}>We coordinate pick-up from the origin address, manage carrier handoffs, handle all venue receiving requirements, and deliver to stand. Suitable for exhibitors who want one point of contact and clear communication throughout.</p>
          </div>
          <div className={styles.techCard}>
            <div className={styles.tcService}><span className={styles.tcAbbrev}>Insurance</span></div>
            <h4 className={styles.tcH4}>Freight insurance</h4>
            <p className={styles.tcP}>General freight insurance is included across all domestic shipments. Additional coverage is available for high-value, fragile, or sensitive freight — just declare at the time of booking and we'll sort it.</p>
          </div>
        </div>
        <div className={styles.techNote}>
          <strong>Also available:</strong> freight can be held between shows for exhibitors on a regular circuit rather than returning home each time, rail freight for select routes, and repackaging or relabelling on receipt. Talk to us about what you need.
        </div>
      </div>
    </section>

    <section className={styles.ctaSection}>
      <div className={styles.ctaInner}>
        <div className={styles.ctaText}>
          <h2>Ready to book your freight?</h2>
          <p>Whether you're sending a few boxes or a full truck — get in touch and we'll sort it out. Quotes are fast and there's no obligation.</p>
        </div>
        <div className={styles.ctaBtns}>
          <Link className={styles.btnSolid} to="/contact">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width={15} height={15}><path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"/></svg>
            Get a Quote
          </Link>
          <Link className={styles.btnGhost} to="/services/international-freight">International Freight</Link>
        </div>
      </div>
    </section>
  </>
);

export default FreightServicesPage;
