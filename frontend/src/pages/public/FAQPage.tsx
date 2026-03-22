import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

/* Hero */
const PageHero = styled.section`
  background: #1a1c1e; position: relative; overflow: hidden; padding-top: 64px;
  &::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(0,176,80,0.055) 1px, transparent 1px); background-size: 36px 36px; pointer-events: none; }
  &::after { content: ''; position: absolute; top: -80px; right: -120px; width: 520px; height: 520px; background: radial-gradient(ellipse at center, rgba(0,176,80,0.08) 0%, transparent 70%); pointer-events: none; }
`;
const HeroLines = styled.div`
  position: absolute; top: 0; right: 0; width: 55%; height: 100%; pointer-events: none; overflow: hidden;
  svg { position: absolute; top: 0; right: 0; width: 100%; height: 100%; }
`;
const HeroInner = styled.div`
  max-width: 1200px; margin: 0 auto; padding: 72px 40px 80px; position: relative; z-index: 2;
  @media (max-width: 760px) { padding: 48px 20px 56px; }
`;
const HeroTag = styled.div`
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 10.5px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
  color: #00b050; background: rgba(0,176,80,0.12); border: 1px solid rgba(0,176,80,0.25);
  padding: 4px 12px; border-radius: 100px; margin-bottom: 22px;
  &::before { content: ''; width: 5px; height: 5px; background: #00b050; border-radius: 50%; }
`;
const H1 = styled.h1`
  font-family: 'Syne', sans-serif; font-weight: 800; font-size: clamp(32px, 4vw, 52px);
  line-height: 1.04; color: #fff; letter-spacing: -0.03em; margin-bottom: 20px;
  em { font-style: normal; color: #00b050; }
`;
const HeroSub = styled.p`font-size: 15.5px; line-height: 1.75; color: rgba(255,255,255,0.42); max-width: 520px;`;

/* FAQ layout */
const FaqPage = styled.section`padding: 80px 40px; @media (max-width: 760px) { padding: 56px 20px; }`;
const FaqInner = styled.div`
  max-width: 1200px; margin: 0 auto;
  display: grid; grid-template-columns: 220px 1fr; gap: 64px; align-items: start;
  @media (max-width: 1080px) { grid-template-columns: 1fr; }
`;

/* Sidebar */
const FaqSidebar = styled.aside`
  position: sticky; top: 88px;
  @media (max-width: 1080px) { display: none; }
`;
const SidebarLabel = styled.div`font-size: 10px; font-weight: 700; letter-spacing: 0.13em; text-transform: uppercase; color: #a0a0a0; margin-bottom: 14px;`;
const SidebarNav = styled.ul`list-style: none; display: flex; flex-direction: column; gap: 2px;`;
const SidebarLink = styled.a<{ active?: boolean }>`
  font-size: 13px; color: #6b7280; text-decoration: none; padding: 6px 10px; border-radius: 6px;
  display: flex; align-items: center; gap: 8px; line-height: 1.4; transition: color 0.15s, background 0.15s;
  background: ${p => p.active ? '#e8f9ef' : 'transparent'};
  color: ${p => p.active ? '#007a35' : '#6b7280'};
  font-weight: ${p => p.active ? 600 : 400};
  &:hover { color: #007a35; background: #e8f9ef; }
`;
const SidebarDot = styled.span`width: 5px; height: 5px; background: #00b050; border-radius: 50%; flex-shrink: 0; opacity: 0.5;`;

/* FAQ sections */
const FaqSections = styled.div`display: flex; flex-direction: column; gap: 72px;`;
const FaqSectionHeader = styled.div`margin-bottom: 32px;`;
const SectionEyebrow = styled.div`
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 10.5px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #007a35; margin-bottom: 10px;
  &::before { content: ''; width: 4px; height: 4px; background: #00b050; border-radius: 50%; }
`;
const SectionH2 = styled.h2`font-family: 'Syne', sans-serif; font-weight: 800; font-size: clamp(20px, 2.2vw, 27px); letter-spacing: -0.02em; line-height: 1.12; color: #141414; margin-bottom: 8px;`;
const SectionP = styled.p`font-size: 14.5px; line-height: 1.7; color: #6b7280; max-width: 560px;`;

/* Accordion */
const Accordion = styled.div`display: flex; flex-direction: column; border-top: 1.5px solid #e5e5e3;`;
const AccItem = styled.div`border-bottom: 1.5px solid #e5e5e3;`;
const AccTrigger = styled.button`
  width: 100%; display: flex; align-items: flex-start; justify-content: space-between; gap: 20px;
  padding: 20px 0; background: none; border: none; cursor: pointer; text-align: left;
  &:hover .acc-q { color: #007a35; }
`;
const AccQ = styled.span`font-family: 'DM Sans', sans-serif; font-size: 15.5px; font-weight: 600; color: #141414; line-height: 1.45; flex: 1; transition: color 0.18s;`;
const AccIcon = styled.span<{ open?: boolean }>`
  width: 22px; height: 22px; background: ${p => p.open ? '#e8f9ef' : '#f5f5f3'};
  border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;
  transition: background 0.18s, transform 0.25s;
  transform: ${p => p.open ? 'rotate(180deg)' : 'rotate(0)'};
  svg { width: 10px; height: 10px; color: ${p => p.open ? '#007a35' : '#6b7280'}; transition: color 0.18s; }
`;
const AccBody = styled.div<{ open?: boolean }>`
  display: ${p => p.open ? 'block' : 'none'}; padding: 0 0 22px 0; max-width: 700px;
  p { font-size: 15px; line-height: 1.78; color: #6b7280; margin-bottom: 12px; &:last-child { margin-bottom: 0; } }
  a { color: #007a35; text-decoration: underline; text-underline-offset: 3px; font-weight: 500; &:hover { color: #00b050; } }
  ul { list-style: none; display: flex; flex-direction: column; gap: 8px; margin: 8px 0 12px; }
  ul li { font-size: 15px; line-height: 1.72; color: #6b7280; display: flex; align-items: flex-start; gap: 10px; }
  ul li::before { content: ''; width: 5px; height: 5px; background: #00b050; border-radius: 50%; flex-shrink: 0; margin-top: 8px; }
`;
const AccTip = styled.div`
  display: inline-flex; align-items: flex-start; gap: 10px;
  background: #e8f9ef; border: 1px solid rgba(0,176,80,0.22); border-radius: 9px;
  padding: 12px 16px; margin-top: 10px;
  span { font-size: 13.5px; line-height: 1.65; color: #007a35; }
`;

/* Still Qs */
const StillQs = styled.div`
  background: #f5f5f3; border-top: 1.5px solid #e5e5e3; border-bottom: 1.5px solid #e5e5e3; padding: 56px 40px;
  @media (max-width: 760px) { padding: 40px 20px; }
`;
const StillQsInner = styled.div`
  max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 40px;
  @media (max-width: 760px) { flex-direction: column; align-items: flex-start; }
  h3 { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 22px; letter-spacing: -0.015em; color: #141414; margin-bottom: 8px; }
  p { font-size: 15px; line-height: 1.68; color: #6b7280; max-width: 440px; }
`;
const StillQsBtns = styled.div`display: flex; gap: 10px; flex-shrink: 0; @media (max-width: 760px) { flex-wrap: wrap; }`;
const BtnGreen = styled(Link)`
  display: inline-flex; align-items: center; gap: 7px; font-size: 14px; font-weight: 600;
  color: #fff; background: #00b050; border: 1.5px solid #00b050; padding: 11px 22px; border-radius: 8px;
  text-decoration: none; transition: background 0.18s;
  &:hover { background: #009140; border-color: #009140; }
`;
const BtnOutline = styled(Link)`
  display: inline-flex; align-items: center; gap: 7px; font-size: 14px; font-weight: 600;
  color: #6b7280; background: transparent; border: 1.5px solid #e5e5e3; padding: 11px 22px; border-radius: 8px;
  text-decoration: none; transition: border-color 0.18s, color 0.18s;
  &:hover { border-color: #6b7280; color: #141414; }
`;

const ChevronDown = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
  </svg>
);

interface FaqItemProps { q: string; children: React.ReactNode; }
const FaqItem: React.FC<FaqItemProps> = ({ q, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <AccItem>
      <AccTrigger onClick={() => setOpen(o => !o)}>
        <AccQ className="acc-q">{q}</AccQ>
        <AccIcon open={open}><ChevronDown /></AccIcon>
      </AccTrigger>
      <AccBody open={open}>{children}</AccBody>
    </AccItem>
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
      <PageHero>
        <HeroLines>
          <svg viewBox="0 0 600 480" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMaxYMid meet">
            <path d="M 600 40 L 480 40 Q 460 40 460 60 L 460 160" stroke="#00b050" strokeWidth="1.5" strokeOpacity="0.3" fill="none"/>
            <path d="M 600 160 L 520 160 Q 500 160 500 180 L 500 280 Q 500 300 480 300 L 380 300" stroke="#00b050" strokeWidth="1.5" strokeOpacity="0.18" fill="none"/>
            <path d="M 600 80 L 550 80" stroke="#00b050" strokeWidth="1.5" strokeOpacity="0.5" fill="none"/>
          </svg>
        </HeroLines>
        <HeroInner>
          <HeroTag>FAQ</HeroTag>
          <H1>Everything you need<br />to know before <em>the show.</em></H1>
          <HeroSub>Answers to the most common questions about freight, on-site logistics, and working with Axis Events. Can't find what you're after? Just ask.</HeroSub>
        </HeroInner>
      </PageHero>

      <FaqPage>
        <FaqInner>
          <FaqSidebar>
            <SidebarLabel>Jump to</SidebarLabel>
            <SidebarNav>
              {sidebarItems.map(({ id, label }) => (
                <li key={id}>
                  <SidebarLink
                    href={`#${id}`}
                    active={activeSection === id}
                    onClick={e => { e.preventDefault(); scrollTo(id); }}
                  >
                    <SidebarDot />{label}
                  </SidebarLink>
                </li>
              ))}
            </SidebarNav>
          </FaqSidebar>

          <FaqSections>
            <div ref={el => { sectionRefs.current['freight'] = el; }} id="freight">
              <FaqSectionHeader>
                <SectionEyebrow>Freight</SectionEyebrow>
                <SectionH2>Booking, pickups &amp; getting your freight to the show</SectionH2>
                <SectionP>Everything you need to know before your freight leaves the building.</SectionP>
              </FaqSectionHeader>
              <Accordion>
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
              </Accordion>
            </div>

            <div ref={el => { sectionRefs.current['packing'] = el; }} id="packing">
              <FaqSectionHeader>
                <SectionEyebrow>Packing &amp; Packaging</SectionEyebrow>
                <SectionH2>Getting your freight protected for the journey</SectionH2>
                <SectionP>Transport is rough. The way you pack your freight makes a bigger difference than most people realise.</SectionP>
              </FaqSectionHeader>
              <Accordion>
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
              </Accordion>
            </div>

            <div ref={el => { sectionRefs.current['onsite'] = el; }} id="onsite">
              <FaqSectionHeader>
                <SectionEyebrow>Freight Handling &amp; On-Site</SectionEyebrow>
                <SectionH2>From the loading dock to your stand</SectionH2>
                <SectionP>What to expect once your freight arrives at the venue.</SectionP>
              </FaqSectionHeader>
              <Accordion>
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
                  <AccTip><span>We strongly recommend bringing your own trolley. A simple fold-down trolley will save you serious time and stress on the big shows — the last thing you want is to arrive already running late and then wait an hour to get one.</span></AccTip>
                </FaqItem>
                <FaqItem q="Can I access my stored freight during the event?">
                  <p>Access to stored freight varies by event — some events have accessible storage, some don't. Our pre-show communications will inform you of what's available for your specific event.</p>
                </FaqItem>
                <FaqItem q="My freight has arrived damaged. What do I do?">
                  <p>If our team spots damage on arrival, we'll document it with photos immediately. If you discover damage after unpacking, photograph everything straight away and notify our team on the spot.</p>
                  <p>It's also best practice to photograph your goods before loading at your end — for your own protection in any future claim. See our <Link to="/terms">Terms &amp; Conditions</Link> for full details.</p>
                </FaqItem>
              </Accordion>
            </div>

            <div ref={el => { sectionRefs.current['returns'] = el; }} id="returns">
              <FaqSectionHeader>
                <SectionEyebrow>Post-Event &amp; Returns</SectionEyebrow>
                <SectionH2>Getting your freight home after the show</SectionH2>
              </FaqSectionHeader>
              <Accordion>
                <FaqItem q="When will my freight be returned after the event?">
                  <p>We aim to return items as swiftly as possible to minimise holding costs, but delays can happen on the bigger shows. If you need a fast return — or have another show coming up back-to-back — let us know in advance and we'll expedite it.</p>
                </FaqItem>
                <FaqItem q="Can you store my freight between events?">
                  <p>Yes — we have depot access across all major states and can hold your freight close to an upcoming show, making sure it's positioned to arrive on time. <Link to="/contact">Get in touch</Link> to discuss your requirements.</p>
                </FaqItem>
              </Accordion>
            </div>

            <div ref={el => { sectionRefs.current['axis-shows'] = el; }} id="axis-shows">
              <FaqSectionHeader>
                <SectionEyebrow>Axis Shows</SectionEyebrow>
                <SectionH2>If we're running the logistics at your event</SectionH2>
                <SectionP>For event organisers and venues using Axis Events for full on-site logistics management.</SectionP>
              </FaqSectionHeader>
              <Accordion>
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
              </Accordion>
            </div>

            <div ref={el => { sectionRefs.current['site-services'] = el; }} id="site-services">
              <FaqSectionHeader>
                <SectionEyebrow>On-Site Services</SectionEyebrow>
                <SectionH2>Hands-on help at the show</SectionH2>
                <SectionP>Add-on services for exhibitors who need a bit more support on the day.</SectionP>
              </FaqSectionHeader>
              <Accordion>
                <FaqItem q="What on-site services do you offer exhibitors?">
                  <p>We offer a range of hands-on services including unboxing freight, pallet wrapping, stand pack-down, and palletising goods for return. These can be pre-booked or arranged on the day. See <Link to="/services/site-services">On-Site Services</Link> for the full list.</p>
                </FaqItem>
                <FaqItem q="I need help setting up or packing down my stand. Can you help?">
                  <p>Yes — contact us before the event to pre-book, or speak to our team at the service desk on-site. Note that liability for your goods remains with you and waivers are involved. See <Link to="/services/site-services">On-Site Services</Link> and our <Link to="/terms">Terms &amp; Conditions</Link>.</p>
                </FaqItem>
              </Accordion>
            </div>

            <div ref={el => { sectionRefs.current['costs'] = el; }} id="costs">
              <FaqSectionHeader>
                <SectionEyebrow>Costs &amp; Billing</SectionEyebrow>
                <SectionH2>How freight is priced and what to expect</SectionH2>
                <SectionP>We aim to be as transparent as possible — no surprises if we can help it.</SectionP>
              </FaqSectionHeader>
              <Accordion>
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
              </Accordion>
            </div>

            <div ref={el => { sectionRefs.current['international'] = el; }} id="international">
              <FaqSectionHeader>
                <SectionEyebrow>International Freight</SectionEyebrow>
                <SectionH2>Shipping to and from Australia for events</SectionH2>
              </FaqSectionHeader>
              <Accordion>
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
              </Accordion>
            </div>

            <div ref={el => { sectionRefs.current['general'] = el; }} id="general">
              <FaqSectionHeader>
                <SectionEyebrow>General</SectionEyebrow>
                <SectionH2>Everything else</SectionH2>
              </FaqSectionHeader>
              <Accordion>
                <FaqItem q="Is my freight insured?">
                  <p>All freight is covered for up to $5,000 AUD. If your goods are worth more than that or you require additional coverage, let us know and we can point you in the right direction.</p>
                </FaqItem>
                <FaqItem q="Do you work at any event, or just specific shows?">
                  <p>We work across exhibitions, trade shows, and events of all sizes Australia-wide. Not sure if we cover your event or city? Just <Link to="/contact">ask us</Link>.</p>
                </FaqItem>
              </Accordion>
            </div>
          </FaqSections>
        </FaqInner>
      </FaqPage>

      <StillQs>
        <StillQsInner>
          <div>
            <h3>Still have questions?</h3>
            <p>Can't find what you're after? Get in touch and we'll help you out directly.</p>
          </div>
          <StillQsBtns>
            <BtnGreen to="/contact">Get in touch</BtnGreen>
            <BtnOutline to="/quote">Get a quote</BtnOutline>
          </StillQsBtns>
        </StillQsInner>
      </StillQs>
    </>
  );
};

export default FAQPage;
