import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

/* Hero */
const PageHero = styled.section`
  background: #1a1c1e; position: relative; overflow: hidden;
  &::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(0,176,80,0.06) 1px, transparent 1px); background-size: 38px 38px; pointer-events: none; }
`;
const HeroLines = styled.div`
  position: absolute; top: 0; right: 0; width: 50%; height: 100%; pointer-events: none; overflow: hidden;
  svg { position: absolute; top: 0; right: 0; width: 100%; height: 100%; }
`;
const HeroInner = styled.div`
  max-width: 1200px; margin: 0 auto; padding: 80px 40px 72px; position: relative; z-index: 2;
  @media (max-width: 760px) { padding: 44px 20px 52px; }
`;
const HeroTag = styled.div`
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 10.5px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
  color: #00b050; background: rgba(0,176,80,0.12); border: 1px solid rgba(0,176,80,0.25);
  padding: 4px 12px; border-radius: 100px; margin-bottom: 20px;
  &::before { content: ''; width: 5px; height: 5px; background: #00b050; border-radius: 50%; }
`;
const H1 = styled.h1`
  font-family: 'Syne', sans-serif; font-weight: 800;
  font-size: clamp(30px, 3.8vw, 50px); line-height: 1.06;
  color: #fff; letter-spacing: -0.028em; margin-bottom: 18px; max-width: 680px;
  em { font-style: normal; color: #00b050; }
`;
const HeroSub = styled.p`font-size: 16px; line-height: 1.72; color: rgba(255,255,255,0.45); max-width: 580px; margin-bottom: 36px;`;
const HeroCtas = styled.div`display: flex; align-items: center; gap: 12px; flex-wrap: wrap;`;
const BtnSolid = styled(Link)`
  display: inline-flex; align-items: center; gap: 7px;
  font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600; color: #fff;
  background: #00b050; border: 1.8px solid #00b050; padding: 13px 24px; border-radius: 8px;
  text-decoration: none; transition: background 0.18s, transform 0.15s;
  svg { width: 13px; height: 13px; }
  &:hover { background: #009140; transform: translateY(-1px); }
`;
const BtnGhost = styled(Link)`
  display: inline-flex; align-items: center; gap: 7px;
  font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.5);
  background: transparent; border: 1.8px solid rgba(255,255,255,0.15); padding: 13px 24px; border-radius: 8px;
  text-decoration: none; transition: border-color 0.18s, color 0.18s;
  &:hover { border-color: rgba(255,255,255,0.4); color: rgba(255,255,255,0.8); }
`;
const BtnOutline = styled(Link)`
  display: inline-flex; align-items: center; gap: 7px;
  font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600; color: #6b7280;
  background: transparent; border: 1.8px solid #e5e5e3; padding: 13px 24px; border-radius: 8px;
  text-decoration: none; transition: background 0.18s;
  &:hover { background: #f5f5f3; }
`;

/* Intro strip */
const IntroStrip = styled.div`border-bottom: 1.5px solid #e5e5e3;`;
const IntroStripInner = styled.div`
  max-width: 1200px; margin: 0 auto;
  display: grid; grid-template-columns: repeat(4, 1fr);
  @media (max-width: 1080px) { grid-template-columns: 1fr 1fr; }
  @media (max-width: 760px) { grid-template-columns: 1fr; }
`;
const IntroItem = styled.div`
  padding: 26px 30px; border-right: 1.5px solid #e5e5e3;
  &:last-child { border-right: none; }
  @media (max-width: 1080px) {
    &:nth-child(2) { border-right: none; }
    border-bottom: 1.5px solid #e5e5e3;
  }
  @media (max-width: 760px) { border-right: none; }
  strong { display: block; font-family: 'Syne', sans-serif; font-weight: 700; font-size: 13px; color: #141414; margin-bottom: 5px; }
  span { font-size: 12.5px; color: #6b7280; line-height: 1.55; }
`;

/* Shared */
const SectionWhite = styled.section`background: #fff; padding: 80px 40px; @media (max-width: 760px) { padding: 56px 20px; }`;
const SectionGrey = styled.section`background: #f5f5f3; border-top: 1.5px solid #e5e5e3; border-bottom: 1.5px solid #e5e5e3; padding: 80px 40px; @media (max-width: 760px) { padding: 56px 20px; }`;
const Inner = styled.div`max-width: 1200px; margin: 0 auto;`;
const Eyebrow = styled.span`display: inline-block; font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #007a35; margin-bottom: 12px;`;
const SectionH = styled.h2`font-family: 'Syne', sans-serif; font-weight: 800; font-size: clamp(24px, 2.8vw, 36px); letter-spacing: -0.02em; line-height: 1.1; color: #141414; margin-bottom: 14px;`;
const SectionP = styled.p`font-size: 15.5px; line-height: 1.72; color: #6b7280; max-width: 600px;`;

/* Two col */
const TwoCol = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start;
  @media (max-width: 1080px) { grid-template-columns: 1fr; gap: 40px; }
`;
const PageImg = styled.div`
  width: 100%; border-radius: 18px; overflow: hidden; height: 320px;
  img { width: 100%; height: 100%; object-fit: cover; display: block; }
`;

/* Services list */
const ServicesList = styled.div`margin-top: 52px;`;
const SvcRow = styled.div`
  display: grid; grid-template-columns: 200px 1fr; gap: 40px; padding: 28px 0; border-bottom: 1.5px solid #e5e5e3; align-items: start;
  &:first-child { border-top: 1.5px solid #e5e5e3; }
  @media (max-width: 760px) { grid-template-columns: 1fr; gap: 6px; }
`;
const SvcLabel = styled.div`display: flex; align-items: center; gap: 8px; padding-top: 3px;`;
const SvcDot = styled.span`width: 6px; height: 6px; background: #00b050; border-radius: 50%; flex-shrink: 0;`;
const SvcDesc = styled.div`font-size: 14.5px; line-height: 1.75; color: #6b7280;`;

/* Portal */
const PortalWrap = styled.div`
  background: #1a1c1e; border-radius: 20px; overflow: hidden;
  display: grid; grid-template-columns: 1.2fr 0.8fr; margin-top: 48px;
  @media (max-width: 1080px) { grid-template-columns: 1fr; }
`;
const PortalContent = styled.div`
  padding: 52px 48px;
  @media (max-width: 760px) { padding: 32px 24px; }
  h3 { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 22px; color: #fff; margin-bottom: 14px; letter-spacing: -0.02em; line-height: 1.2; }
  > p { font-size: 14.5px; line-height: 1.75; color: rgba(255,255,255,0.38); margin-bottom: 32px; }
`;
const PortalFeats = styled.div`display: flex; flex-direction: column; gap: 16px;`;
const PortalFeat = styled.div`display: flex; gap: 12px; align-items: flex-start;`;
const PfeatTick = styled.div`
  width: 20px; height: 20px; background: rgba(0,176,80,0.15); border: 1px solid rgba(0,176,80,0.3);
  border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;
  svg { width: 10px; height: 10px; color: #00b050; }
`;
const PfeatBody = styled.div`
  strong { display: block; font-size: 13.5px; font-weight: 600; color: rgba(255,255,255,0.8); margin-bottom: 2px; }
  span { font-size: 12.5px; color: rgba(255,255,255,0.3); line-height: 1.5; }
`;
const PortalImgBox = styled.div`
  overflow: hidden;
  @media (max-width: 1080px) { height: 240px; }
  img { width: 100%; height: 100%; object-fit: cover; display: block; opacity: 0.5; }
`;

/* Pricing models */
const ModelGrid = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 44px;
  @media (max-width: 1080px) { grid-template-columns: 1fr; }
`;
const ModelCard = styled.div<{ highlight?: boolean }>`
  border: 1.5px solid ${p => p.highlight ? '#00b050' : '#e5e5e3'};
  background: ${p => p.highlight ? '#e8f9ef' : 'transparent'};
  border-radius: 20px; padding: 40px 36px;
  @media (max-width: 760px) { padding: 28px 22px; }
`;
const ModelTag = styled.div<{ highlight?: boolean }>`
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 10.5px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
  color: ${p => p.highlight ? '#fff' : '#007a35'};
  background: ${p => p.highlight ? '#00b050' : '#fff'};
  border: 1px solid ${p => p.highlight ? '#00b050' : 'rgba(0,176,80,0.22)'};
  padding: 4px 10px; border-radius: 100px; margin-bottom: 18px;
`;
const ModelH3 = styled.h3`font-family: 'Syne', sans-serif; font-weight: 800; font-size: 21px; color: #141414; margin-bottom: 12px; letter-spacing: -0.02em;`;
const ModelP = styled.p<{ highlight?: boolean }>`
  font-size: 14.5px; line-height: 1.75; color: #6b7280;
  padding-bottom: 24px; margin-bottom: 24px;
  border-bottom: 1.5px solid ${p => p.highlight ? 'rgba(0,176,80,0.2)' : '#e5e5e3'};
`;
const ModelPoints = styled.ul`
  list-style: none; display: flex; flex-direction: column; gap: 11px;
  li { display: flex; align-items: flex-start; gap: 9px; font-size: 13.5px; color: #6b7280; line-height: 1.58; }
  li::before { content: ''; width: 5px; height: 5px; background: #00b050; border-radius: 50%; flex-shrink: 0; margin-top: 8px; }
`;
const BtnRow = styled.div`display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin-top: 32px;`;

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
    <PageHero>
      <HeroLines>
        <svg viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMaxYMid meet">
          <path d="M 600 40 L 500 40 Q 480 40 480 60 L 480 140" stroke="#00b050" strokeWidth="1.5" strokeOpacity="0.35" fill="none"/>
          <path d="M 600 200 L 540 200 Q 520 200 520 220 L 520 300 Q 520 320 500 320 L 420 320" stroke="#00b050" strokeWidth="1.5" strokeOpacity="0.2" fill="none"/>
          <path d="M 600 80 L 560 80" stroke="#00b050" strokeWidth="1.5" strokeOpacity="0.5" fill="none"/>
        </svg>
      </HeroLines>
      <HeroInner>
        <HeroTag>For Event Organisers</HeroTag>
        <H1>The show is yours.<br />The logistics <em>are ours.</em></H1>
        <HeroSub>From the first truck on the dock to the last pallet out the door — we build the right team around your show and run it.</HeroSub>
        <HeroCtas>
          <BtnSolid to="/quote">Request a Quote <ArrowIcon /></BtnSolid>
          <BtnGhost to="/contact">Talk to us first</BtnGhost>
        </HeroCtas>
      </HeroInner>
    </PageHero>

    <IntroStrip>
      <IntroStripInner>
        {[
          { strong: 'Advisory first', span: 'We tell you what you actually need — not what makes us the most money.' },
          { strong: 'Crew & equipment', span: 'Scaled to your event. From one forklift to a full floor operation.' },
          { strong: 'Dock management', span: 'Pre-booked truck slots. Controlled flow. No chaos at bump-in.' },
          { strong: 'Storage & handling', span: 'Suitcases to pallets — picked up, stored, delivered back to stand.' },
        ].map(i => (
          <IntroItem key={i.strong}><strong>{i.strong}</strong><span>{i.span}</span></IntroItem>
        ))}
      </IntroStripInner>
    </IntroStrip>

    <SectionWhite>
      <Inner>
        <TwoCol>
          <div>
            <Eyebrow>What's included</Eyebrow>
            <SectionH>No two shows are the same. We don't treat them that way.</SectionH>
            <SectionP>Whether you need a basic forklift crew for bump-in or a full show management operation — we handle everything that happens behind the scenes. Dock management, crew, equipment, storage, the lot. Tell us about your show and we'll put the right operation together around it.</SectionP>
          </div>
          <PageImg>
            <img src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80" alt="Event floor operations" />
          </PageImg>
        </TwoCol>
        <ServicesList>
          {svcs.map(s => (
            <SvcRow key={s.name}>
              <SvcLabel><SvcDot /><strong style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '13.5px', color: '#141414' }}>{s.name}</strong></SvcLabel>
              <SvcDesc>{s.desc}</SvcDesc>
            </SvcRow>
          ))}
        </ServicesList>
      </Inner>
    </SectionWhite>

    <SectionGrey>
      <Inner>
        <Eyebrow>On-site service desk</Eyebrow>
        <SectionH>Every delivery.<br />Accounted for.</SectionH>
        <SectionP>For shows with a full service setup, we run an on-site service desk. Everything that comes through the dock is logged, tracked, and confirmed — automatically.</SectionP>
        <PortalWrap>
          <PortalContent>
            <h3>Every delivery. Tracked. Confirmed. Visible.</h3>
            <p>Every delivery that comes through — couriers, pallets, signage, boxes — is logged and itemised. Exhibitors get a text and email confirmation with photos the moment their items arrive at their stand. Organisers have live access to monitor all activity at any time.</p>
            <PortalFeats>
              {[
                { strong: 'Live delivery log', span: 'Every item in, itemised as it happens' },
                { strong: 'Photo confirmations', span: 'Sent to exhibitors when items hit their stand' },
                { strong: 'SMS & email alerts', span: 'Automatic — exhibitors don\'t need to chase anyone' },
                { strong: 'Organiser dashboard', span: 'Live access, activity history, and priority requests' },
              ].map(f => (
                <PortalFeat key={f.strong}>
                  <PfeatTick><CheckIcon /></PfeatTick>
                  <PfeatBody><strong>{f.strong}</strong><span>{f.span}</span></PfeatBody>
                </PortalFeat>
              ))}
            </PortalFeats>
          </PortalContent>
          <PortalImgBox>
            <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80" alt="Event operations" />
          </PortalImgBox>
        </PortalWrap>
      </Inner>
    </SectionGrey>

    <SectionWhite>
      <Inner>
        <Eyebrow>How we work with you</Eyebrow>
        <SectionH>Two ways to engage us.<br />Every show is different.</SectionH>
        <ModelGrid>
          <ModelCard>
            <ModelTag>Organiser-Managed</ModelTag>
            <ModelH3>You're in control.</ModelH3>
            <ModelP>You engage Axis and pay for the crew and equipment you need. Works well for smaller shows — sometimes just a forklift operator and a spotter. It scales for larger shows too, though as complexity grows, so does the investment. We put together the right team based on your show size and predicted freight volume.</ModelP>
            <ModelPoints>
              <li>Pay for exactly what you need — nothing more</li>
              <li>Tailored to your show size and freight volume</li>
              <li>Clear pricing upfront — no surprises after the event</li>
            </ModelPoints>
          </ModelCard>
          <ModelCard highlight>
            <ModelTag highlight>Exhibitor-Funded</ModelTag>
            <ModelH3>Full service. No cost to you.</ModelH3>
            <ModelP highlight>The organiser gets a fully managed on-site logistics service at no cost. The service is funded by charging exhibitors directly for forklifting, storage, porterage, and any labour they require. A minimum freight volume needs to be met — not sure if your show qualifies? We'll work it out with you.</ModelP>
            <ModelPoints>
              <li>Zero cost to the organiser</li>
              <li>Exhibitors charged only for what they actually use</li>
              <li>Includes service desk, dock management &amp; real-time freight notifications</li>
              <li>Minimum freight volume applies — ask us if you qualify</li>
            </ModelPoints>
          </ModelCard>
        </ModelGrid>
        <BtnRow>
          <BtnSolid to="/quote">Request a Services Quote <ArrowIcon /></BtnSolid>
          <BtnOutline to="/contact">Not sure where to start? Talk to us.</BtnOutline>
        </BtnRow>
      </Inner>
    </SectionWhite>
  </>
);

export default OnsiteLogisticsPage;
