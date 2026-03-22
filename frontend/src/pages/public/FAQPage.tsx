import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './FAQPage.module.scss';

const ChevronDown = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
  </svg>
);

interface FaqItemProps { q: string; children: React.ReactNode; }
const FaqItem: React.FC<FaqItemProps> = ({ q, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.accItem}>
      <button className={styles.accTrigger} onClick={() => setOpen(o => !o)}>
        <span className={styles.accQ}>{q}</span>
        <span className={`${styles.accIcon} ${open ? styles.accIconOpen : ''}`}><ChevronDown /></span>
      </button>
      <div className={`${styles.accBody} ${open ? styles.accBodyOpen : ''}`}>{children}</div>
    </div>
  );
};

const sidebarItems = [
  { id: 'freight', label: 'Freight' },
  { id: 'packing', label: 'Packing & Packaging' },
  { id: 'onsite', label: 'Freight Handling & On-Site' },
  { id: 'returns', label: 'Post-Event & Returns' },
  { id: 'axis-shows', label: 'Axis Shows' },
  { id: 'site-services', label: 'On-Site Services' },
  { id: 'costs', label: 'Costs & Billing' },
  { id: 'international', label: 'International' },
  { id: 'general', label: 'General' },
];

const FAQPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('freight');
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const handler = () => {
      let current = 'freight';
      for (const { id } of sidebarItems) {
        const el = sectionRefs.current[id];
        if (el && window.scrollY >= el.offsetTop - 120) current = id;
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = (id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className={styles.pageHero}>
        <div className={styles.heroLines}>
          <svg viewBox="0 0 600 480" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMaxYMid meet">
            <path d="M 600 40 L 480 40 Q 460 40 460 60 L 460 160" stroke="#00b050" strokeWidth="1.5" strokeOpacity="0.3" fill="none"/>
            <path d="M 600 160 L 520 160 Q 500 160 500 180 L 500 280 Q 500 300 480 300 L 380 300" stroke="#00b050" strokeWidth="1.5" strokeOpacity="0.18" fill="none"/>
            <path d="M 600 80 L 550 80" stroke="#00b050" strokeWidth="1.5" strokeOpacity="0.5" fill="none"/>
          </svg>
        </div>
        <div className={styles.heroInner}>
          <div className={styles.heroTag}>FAQ</div>
          <h1 className={styles.h1}>Everything you need<br />to know before <em>the show.</em></h1>
          <p className={styles.heroSub}>Answers to the most common questions about freight, on-site logistics, and working with Axis Events. Can't find what you're after? Just ask.</p>
        </div>
      </section>

      <section className={styles.faqPage}>
        <div className={styles.faqInner}>
          <aside className={styles.faqSidebar}>
            <div className={styles.sidebarLabel}>Jump to</div>
            <ul className={styles.sidebarNav}>
              {sidebarItems.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={`${styles.sidebarLink} ${activeSection === id ? styles.sidebarLinkActive : ''}`}
                    onClick={e => { e.preventDefault(); scrollTo(id); }}
                  >
                    <span className={styles.sidebarDot} />{label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <div className={styles.faqSections}>
            <div ref={el => { sectionRefs.current['freight'] = el; }} id="freight">
              <div className={styles.faqSectionHeader}>
                <div className={styles.sectionEyebrow}>Freight</div>
                <h2 className={styles.sectionH2}>Booking, pickups &amp; getting your freight to the show</h2>
                <p className={styles.sectionP}>Everything you need to know before your freight leaves the building.</p>
              </div>
              <div className={styles.accordion}>
                <FaqItem q="How do I get a quote for domestic freight?">
                  <p>Use our online quote tool — <Link to="/quote">get a quote here</Link>. For complex shipments, unusual items, or anything you're unsure about, just <Link to="/contact">contact us</Link> directly and we'll figure it out together.</p>
                </FaqItem>
                <FaqItem q="When do I need to submit my freight booking by?">
                  <p>The sooner the better. A safe rule is at least 2 weeks before bump-in to make sure everything is sorted and confirmed in time.</p>
                  <p>It's not worth leaving it to the last minute — you've already spent thousands on your attendance at the show. Having your freight not arrive in time would be a nightmare, and it's entirely avoidable.</p>
                </FaqItem>
                <FaqItem q="How do I label my freight?">
                  <p>The more detail the better — things get lost with poor labelling. At minimum, each item should clearly show:</p>
                  <ul>
                    <li>Event name</li>
                    <li>Venue name and full address</li>
                    <li>Your stand name and number</li>
                    <li>Your contact number</li>
                    <li>Item count (e.g. 1 of 4, 2 of 4, 3 of 4)</li>
                  </ul>
                  <p>If you're booking transport through us, we'll send you labels directly.</p>
                </FaqItem>
                <FaqItem q="Can you pick up from any address?">
                  <p>Yes — we have a range of vehicles available including vans with ramps for loading pallets from hard-to-reach or residential locations, right through to B-double trucks for the largest consignments.</p>
                </FaqItem>
                <FaqItem q="What if I don't know the exact dimensions or weight of my freight?">
                  <p>Getting it right matters more than you might think. If you under-declare, there can be surcharges, delays, and real problems — the vehicle booked may not fit your goods. Depending on how close to the event that happens, you might not make it at all.</p>
                  <p>Be as accurate as possible when filling out your details. If you're genuinely unsure, <Link to="/contact">contact us</Link> before booking and we can help work it out.</p>
                </FaqItem>
                <FaqItem q="My freight is oversized. What do I do?">
                  <p>Make sure to fill out your freight measurements accurately and enter the correct weight. Oversized freight can require specialised forklifts, crane equipment, or adjusted bump-in scheduling — some venues even require cranes for specific items.</p>
                  <p>If you're unsure at all, <Link to="/contact">contact us before booking</Link> and we can clarify exactly what's needed.</p>
                </FaqItem>
                <FaqItem q="What if my freight is delayed and won't arrive during bump-in?">
                  <p>Contact us immediately. We'll look at the most practical way to get it there in time. Last-resort options like next-flight air freight exist but come at a cost — the earlier you flag it, the more options we have.</p>
                </FaqItem>
                <FaqItem q="Do I need to be present at pickup?">
                  <p>In most cases, yes — missed pickups will incur fees. See our <Link to="/terms">Terms &amp; Conditions</Link> for details.</p>
                  <p>For show bump-outs, if everything is clearly labelled our on-site freight team can usually manage the return without you needing to be present.</p>
                </FaqItem>
              </div>
            </div>

            <div ref={el => { sectionRefs.current['packing'] = el; }} id="packing">
              <div className={styles.faqSectionHeader}>
                <div className={styles.sectionEyebrow}>Packing &amp; Packaging</div>
                <h2 className={styles.sectionH2}>Getting your freight protected for the journey</h2>
                <p className={styles.sectionP}>Transport is rough. The way you pack your freight makes a bigger difference than most people realise.</p>
              </div>
              <div className={styles.accordion}>
                <FaqItem q="How should I pack my freight?">
                  <p>Properly. We regularly see goods arrive in varying states of damage — transport is a bumpy, dirty, dusty environment and proper protection goes a long way.</p>
                  <p>Palletise anything with multiple items and wrap it securely to the base. For fragile or high-value gear, use bubble wrap, foam padding, and crating. If you're unsure how to pack something specific, <Link to="/contact">ask us</Link> — we'd rather help upfront than deal with a damage claim later.</p>
                </FaqItem>
                <FaqItem q="I forgot to bring shrink wrap. What do I do?">
                  <p>If it's an Axis show, we stock pallet wrap, tape, markers, and other essentials at the on-site service desk. That said — it costs us significantly to transport and keep these supplies on hand, and pricing reflects that. It's much cheaper to come prepared and grab your supplies before the show.</p>
                </FaqItem>
                <FaqItem q="Who is responsible for packing up my freight after the event?">
                  <p>That's on you — it's your responsibility to make sure all your goods are packed correctly, safely, and in a way that minimises damage risk before they go back on a truck.</p>
                  <p>We do offer services to fully pack up your freight, palletise, and wrap it. There are waivers to sign as we cannot accept liability for your goods. See our <Link to="/terms">Terms &amp; Conditions</Link> and <Link to="/services/site-services">On-Site Services</Link> for more information.</p>
                </FaqItem>
                <FaqItem q="Do you offer pallet wrapping on-site?">
                  <p>Yes. Where wrapping is required for safety or handling, we'll do it and charge accordingly. This is non-negotiable — it's a safety requirement, not an optional extra.</p>
                </FaqItem>
              </div>
            </div>

            <div ref={el => { sectionRefs.current['onsite'] = el; }} id="onsite">
              <div className={styles.faqSectionHeader}>
                <div className={styles.sectionEyebrow}>Freight Handling &amp; On-Site</div>
                <h2 className={styles.sectionH2}>From the loading dock to your stand</h2>
                <p className={styles.sectionP}>What to expect once your freight arrives at the venue.</p>
              </div>
              <div className={styles.accordion}>
                <FaqItem q="What is material handling and will I be charged for it?">
                  <p>Material handling is the process of moving your freight from the loading dock to your stand — and back again at bump-out. For pallets, crates, or anything too heavy to hand-carry, we use forklifts.</p>
                  <p>On some shows this is covered by the event organiser. On others it's a charged service. Goods cannot be unloaded from vehicles unless Terms &amp; Conditions have been agreed to and payment received — we're not legally able to unload without these being met.</p>
                </FaqItem>
                <FaqItem q="Do I need to pre-book forklift handling?">
                  <p>Yes, and if you don't, there can be extensive delays on bigger shows. On certain shows, surcharges apply for late or unbooked services. Pre-booking guarantees your availability and avoids the on-the-day premium.</p>
                </FaqItem>
                <FaqItem q="Do I need to book a loading dock timeslot?">
                  <p>It varies by show — you'll be informed through our communications leading up to the event.</p>
                </FaqItem>
                <FaqItem q="Will there be trolleys available on-site?">
                  <p>It depends on the show and what package the organiser is using. Even when trolleys are supplied, they're in extremely high demand during bump-in and you may find yourself waiting.</p>
                  <div className={styles.accTip}><span>We strongly recommend bringing your own trolley. A simple fold-down trolley will save you serious time and stress on the big shows — the last thing you want is to arrive already running late and then wait an hour to get one.</span></div>
                </FaqItem>
                <FaqItem q="Can I access my stored freight during the event?">
                  <p>Access to stored freight varies by event — some events have accessible storage, some don't. Our pre-show communications will inform you of what's available for your specific event.</p>
                </FaqItem>
                <FaqItem q="My freight has arrived damaged. What do I do?">
                  <p>If our team spots damage on arrival, we'll document it with photos immediately. If you discover damage after unpacking, photograph everything straight away and notify our team on the spot.</p>
                  <p>It's also best practice to photograph your goods before loading at your end — for your own protection in any future claim. See our <Link to="/terms">Terms &amp; Conditions</Link> for full details.</p>
                </FaqItem>
              </div>
            </div>

            <div ref={el => { sectionRefs.current['returns'] = el; }} id="returns">
              <div className={styles.faqSectionHeader}>
                <div className={styles.sectionEyebrow}>Post-Event &amp; Returns</div>
                <h2 className={styles.sectionH2}>Getting your freight home after the show</h2>
              </div>
              <div className={styles.accordion}>
                <FaqItem q="When will my freight be returned after the event?">
                  <p>We aim to return items as swiftly as possible to minimise holding costs, but delays can happen on the bigger shows. If you need a fast return — or have another show coming up back-to-back — let us know in advance and we'll expedite it.</p>
                </FaqItem>
                <FaqItem q="Can you store my freight between events?">
                  <p>Yes — we have depot access across all major states and can hold your freight close to an upcoming show, making sure it's positioned to arrive on time. <Link to="/contact">Get in touch</Link> to discuss your requirements.</p>
                </FaqItem>
              </div>
            </div>

            <div ref={el => { sectionRefs.current['axis-shows'] = el; }} id="axis-shows">
              <div className={styles.faqSectionHeader}>
                <div className={styles.sectionEyebrow}>Axis Shows</div>
                <h2 className={styles.sectionH2}>If we're running the logistics at your event</h2>
                <p className={styles.sectionP}>For event organisers and venues using Axis Events for full on-site logistics management.</p>
              </div>
              <div className={styles.accordion}>
                <FaqItem q="What does on-site logistics management involve?">
                  <p>We run the full logistics operation for your event floor — loading dock management, dock traffic control, forklift and crew coordination, freight scheduling, exhibitor support, and bump-out operations. The goal is smooth movement, no bottlenecks, and everything where it needs to be when it needs to be there.</p>
                  <p>See <Link to="/services/onsite-logistics">On-Site Logistics &amp; Services</Link> for full detail on what we offer.</p>
                </FaqItem>
                <FaqItem q="Can I hire crew without taking on full site management?">
                  <p>Yes. If you just need a forklift operator, spotter, dock supervisor, or general labour for bump-in or bump-out, we can scope that separately — no full logistics contract required. See <Link to="/services/site-services">On-Site Services</Link>.</p>
                </FaqItem>
                <FaqItem q="How do you source your crew?">
                  <p>We handpick people we know and trust, and pay above standard rates because quality matters more than cutting corners on labour. Our crew includes forklift operators, spotters, dock supervisors, and general labour — deployed based on what your show actually needs.</p>
                </FaqItem>
                <FaqItem q="What is a service desk?">
                  <p>For larger, full-service events we operate an on-site service desk during bump-in and bump-out. All deliveries come through the desk, enabling recording and tracking of every item that arrives on-site. It's also where exhibitors can get storage labels, purchase supplies, and raise any issues.</p>
                </FaqItem>
              </div>
            </div>

            <div ref={el => { sectionRefs.current['site-services'] = el; }} id="site-services">
              <div className={styles.faqSectionHeader}>
                <div className={styles.sectionEyebrow}>On-Site Services</div>
                <h2 className={styles.sectionH2}>Hands-on help at the show</h2>
                <p className={styles.sectionP}>Add-on services for exhibitors who need a bit more support on the day.</p>
              </div>
              <div className={styles.accordion}>
                <FaqItem q="What on-site services do you offer exhibitors?">
                  <p>We offer a range of hands-on services including unboxing freight, pallet wrapping, stand pack-down, and palletising goods for return. These can be pre-booked or arranged on the day. See <Link to="/services/site-services">On-Site Services</Link> for the full list.</p>
                </FaqItem>
                <FaqItem q="I need help setting up or packing down my stand. Can you help?">
                  <p>Yes — contact us before the event to pre-book, or speak to our team at the service desk on-site. Note that liability for your goods remains with you and waivers are involved. See <Link to="/services/site-services">On-Site Services</Link> and our <Link to="/terms">Terms &amp; Conditions</Link>.</p>
                </FaqItem>
              </div>
            </div>

            <div ref={el => { sectionRefs.current['costs'] = el; }} id="costs">
              <div className={styles.faqSectionHeader}>
                <div className={styles.sectionEyebrow}>Costs &amp; Billing</div>
                <h2 className={styles.sectionH2}>How freight is priced and what to expect</h2>
                <p className={styles.sectionP}>We aim to be as transparent as possible — no surprises if we can help it.</p>
              </div>
              <div className={styles.accordion}>
                <FaqItem q="What affects the cost of my freight?">
                  <p>Freight pricing is complex, but the main factors include:</p>
                  <ul>
                    <li>Distance between pickup and delivery</li>
                    <li>Freight dimensions and volumetric weight</li>
                    <li>Actual weight (whichever is greater between actual and volumetric)</li>
                    <li>Delivery speed required</li>
                    <li>Type of vehicle or equipment needed</li>
                    <li>Whether specialised handling is required</li>
                  </ul>
                </FaqItem>
                <FaqItem q="What is volumetric (cubic) weight?">
                  <p>On certain shipments — usually interstate and international — carriers charge based on the greater of actual weight or cubic (volumetric) weight. Cubic weight accounts for the space your freight takes up in a vehicle, not just how heavy it is.</p>
                  <p>A large but lightweight display stand can be surprisingly expensive to ship purely because of the space it occupies. This is why accurate dimensions are important when getting a quote.</p>
                </FaqItem>
                <FaqItem q="What is a tailgate vehicle?">
                  <p>If your freight is too heavy or bulky to load by hand but you don't have a forklift at your end, we can arrange a tailgate truck — a vehicle with a hydraulic platform that lowers to ground level, making it easy to load pallets and heavy items without a forklift on your end.</p>
                </FaqItem>
                <FaqItem q="Are there extra charges I should know about?">
                  <p>We'll always try to inform you of any costs or surprises before you agree to anything with us. Common additional charges include:</p>
                  <ul>
                    <li>Surcharges for incorrect dimensions or weight declarations</li>
                    <li>Missed pickup fees</li>
                    <li>Weekend and public holiday rates</li>
                    <li>Delays caused by missing or incorrect documentation</li>
                    <li>On-site add-on services arranged on the day</li>
                  </ul>
                  <p>See our <Link to="/terms">Terms &amp; Conditions</Link> for full details.</p>
                </FaqItem>
              </div>
            </div>

            <div ref={el => { sectionRefs.current['international'] = el; }} id="international">
              <div className={styles.faqSectionHeader}>
                <div className={styles.sectionEyebrow}>International Freight</div>
                <h2 className={styles.sectionH2}>Shipping to and from Australia for events</h2>
              </div>
              <div className={styles.accordion}>
                <FaqItem q="Do you handle international freight?">
                  <p>Yes — we handle international shipments. Every job is different, so reach out via our <Link to="/contact">contact page</Link> and we'll walk you through exactly what's involved for your shipment.</p>
                </FaqItem>
                <FaqItem q="What is an ATA Carnet?">
                  <p>An ATA Carnet is a customs document that allows goods to be temporarily imported into a country — including Australia — without paying duties and taxes. It's commonly used for trade show exhibits and display equipment, and is valid for up to 12 months with goods required to be re-exported within that period.</p>
                  <p>Important note: promotional items like giveaways and samples generally don't qualify. ATA Carnets cover exhibit items and stands only.</p>
                </FaqItem>
                <FaqItem q="What's the difference between air freight and sea freight for events?">
                  <p>Air freight is faster and suited for time-sensitive or high-value exhibit materials. Sea freight is more cost-effective for bulk or large items but has significantly longer transit times. For events with fixed move-in dates, the timeline usually makes the decision for you.</p>
                </FaqItem>
              </div>
            </div>

            <div ref={el => { sectionRefs.current['general'] = el; }} id="general">
              <div className={styles.faqSectionHeader}>
                <div className={styles.sectionEyebrow}>General</div>
                <h2 className={styles.sectionH2}>Everything else</h2>
              </div>
              <div className={styles.accordion}>
                <FaqItem q="Is my freight insured?">
                  <p>All freight is covered for up to $5,000 AUD. If your goods are worth more than that or you require additional coverage, let us know and we can point you in the right direction.</p>
                </FaqItem>
                <FaqItem q="Do you work at any event, or just specific shows?">
                  <p>We work across exhibitions, trade shows, and events of all sizes Australia-wide. Not sure if we cover your event or city? Just <Link to="/contact">ask us</Link>.</p>
                </FaqItem>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.stillQs}>
        <div className={styles.stillQsInner}>
          <div>
            <h3>Still have questions?</h3>
            <p>Can't find what you're after? Get in touch and we'll help you out directly.</p>
          </div>
          <div className={styles.stillQsBtns}>
            <Link to="/contact" className={styles.btnGreen}>Get in touch</Link>
            <Link to="/quote" className={styles.btnOutline}>Get a quote</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQPage;
