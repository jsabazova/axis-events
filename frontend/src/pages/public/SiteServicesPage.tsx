import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

/* Hero */
const PageHero = styled.section`
  background: #1a1c1e; position: relative; overflow: hidden; padding-top: 64px;
  &::before {
    content: ''; position: absolute; inset: 0;
    background-image: radial-gradient(circle, rgba(0,176,80,0.055) 1px, transparent 1px);
    background-size: 36px 36px; pointer-events: none;
  }
  &::after {
    content: ''; position: absolute; top: -80px; right: -120px; width: 600px; height: 600px;
    background: radial-gradient(ellipse, rgba(0,176,80,0.08) 0%, transparent 65%);
    pointer-events: none;
  }
`;
const HeroLines = styled.div`
  position: absolute; top: 0; right: 0; width: 50%; height: 100%; pointer-events: none; overflow: hidden;
  svg { position: absolute; top: 0; right: 0; width: 100%; height: 100%; }
`;
const HeroInner = styled.div`
  max-width: 1200px; margin: 0 auto; padding: 72px 40px 80px;
  position: relative; z-index: 2;
  display: grid; grid-template-columns: 1fr 340px; gap: 60px; align-items: center;
  @media (max-width: 1080px) { grid-template-columns: 1fr; }
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
  font-family: 'Syne', sans-serif; font-weight: 800;
  font-size: clamp(30px, 3.8vw, 50px); line-height: 1.06;
  color: #fff; letter-spacing: -0.028em; margin-bottom: 20px;
  em { font-style: normal; color: #00b050; }
`;
const HeroSub = styled.p`font-size: 15.5px; line-height: 1.75; color: rgba(255,255,255,0.4); max-width: 520px; margin-bottom: 36px;`;
const HeroCtas = styled.div`display: flex; align-items: center; gap: 12px; flex-wrap: wrap;`;
const BtnSolid = styled(Link)`
  display: inline-flex; align-items: center; gap: 7px;
  font-size: 14px; font-weight: 600; color: #fff;
  background: #00b050; border: 1.8px solid #00b050;
  padding: 13px 24px; border-radius: 8px; text-decoration: none; transition: background 0.18s;
  svg { width: 13px; height: 13px; }
  &:hover { background: #009140; }
`;
const BtnGhost = styled(Link)`
  display: inline-flex; align-items: center; gap: 7px;
  font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.5);
  background: transparent; border: 1.8px solid rgba(255,255,255,0.15);
  padding: 13px 24px; border-radius: 8px; text-decoration: none;
  transition: border-color 0.18s, color 0.18s;
  &:hover { border-color: rgba(255,255,255,0.4); color: rgba(255,255,255,0.82); }
`;
const HeroCard = styled.div`
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px; padding: 30px 26px;
  @media (max-width: 1080px) { display: none; }
`;
const HCardLabel = styled.div`font-size: 10px; font-weight: 700; letter-spacing: 0.13em; text-transform: uppercase; color: rgba(255,255,255,0.22); margin-bottom: 18px;`;
const HSvcList = styled.div`display: flex; flex-direction: column;`;
const HSvc = styled.div`
  display: flex; align-items: center; gap: 12px; padding: 10px 0;
  border-bottom: 1px solid rgba(255,255,255,0.055);
  &:last-child { border-bottom: none; }
`;
const HSvcNum = styled.span`font-family: 'Syne', sans-serif; font-weight: 800; font-size: 11px; color: rgba(255,255,255,0.14); width: 20px; flex-shrink: 0;`;
const HSvcName = styled.span`font-size: 13.5px; font-weight: 500; color: rgba(255,255,255,0.6); flex: 1;`;
const HSvcDot = styled.span`width: 5px; height: 5px; background: #00b050; border-radius: 50%; opacity: 0.45; flex-shrink: 0;`;

/* Shared */
const SectionWhite = styled.section`background: #fff; padding: 88px 40px; @media (max-width: 760px) { padding: 60px 20px; }`;
const SectionGrey = styled.section`background: #f5f5f3; border-top: 1.5px solid #e5e5e3; border-bottom: 1.5px solid #e5e5e3; padding: 88px 40px; @media (max-width: 760px) { padding: 60px 20px; }`;
const Inner = styled.div`max-width: 1200px; margin: 0 auto;`;
const Eyebrow = styled.span`display: inline-flex; align-items: center; gap: 6px; font-size: 10.5px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #007a35; margin-bottom: 12px; &::before { content: ''; width: 4px; height: 4px; background: #00b050; border-radius: 50%; }`;
const SectionH = styled.h2`font-family: 'Syne', sans-serif; font-weight: 800; font-size: clamp(26px, 2.8vw, 38px); letter-spacing: -0.022em; line-height: 1.1; color: #141414; margin-bottom: 14px;`;
const SectionP = styled.p`font-size: 15.5px; line-height: 1.72; color: #6b7280; max-width: 580px;`;

/* Services list */
const ServicesHeader = styled.div`
  display: grid; grid-template-columns: 1fr 420px; gap: 80px; align-items: end; margin-bottom: 56px;
  @media (max-width: 1080px) { grid-template-columns: 1fr; gap: 20px; }
`;
const ServicesHeaderRight = styled.div`
  p { font-size: 14.5px; line-height: 1.72; color: #6b7280; }
  a { color: #007a35; font-weight: 500; }
`;
const SvcList = styled.div`border-top: 1.5px solid #e5e5e3;`;
const SvcRow = styled.div`
  display: grid; grid-template-columns: 64px 1fr 240px; border-bottom: 1.5px solid #e5e5e3;
  padding: 40px 0; align-items: start; position: relative; transition: background 0.15s;
  &::before { content: ''; position: absolute; left: -40px; right: -40px; top: 0; bottom: 0; background: #f5f5f3; opacity: 0; transition: opacity 0.15s; pointer-events: none; }
  &:hover::before { opacity: 1; }
  @media (max-width: 1080px) { grid-template-columns: 48px 1fr; }
  @media (max-width: 760px) { padding: 28px 0; grid-template-columns: 40px 1fr; &::before { left: -20px; right: -20px; } }
`;
const SvcNum = styled.div`font-family: 'Syne', sans-serif; font-weight: 800; font-size: 12px; color: #e5e5e3; letter-spacing: 0.04em; padding-top: 6px; position: relative; z-index: 1; transition: color 0.15s; ${SvcRow}:hover & { color: rgba(0,176,80,0.3); }`;
const SvcBody = styled.div`padding-right: 48px; position: relative; z-index: 1; @media (max-width: 1080px) { padding-right: 0; }`;
const SvcName = styled.div`font-family: 'Syne', sans-serif; font-weight: 800; font-size: clamp(17px, 1.7vw, 22px); color: #141414; letter-spacing: -0.015em; line-height: 1.15; margin-bottom: 12px;`;
const SvcDesc = styled.p`font-size: 14.5px; line-height: 1.78; color: #6b7280;`;
const SvcTags = styled.div`display: flex; flex-wrap: wrap; gap: 6px; margin-top: 14px;`;
const SvcTag = styled.span`font-size: 10.5px; font-weight: 600; letter-spacing: 0.07em; text-transform: uppercase; color: #a0a0a0; background: #f5f5f3; border: 1px solid #e5e5e3; padding: 3px 9px; border-radius: 100px;`;
const SvcAction = styled.div`
  display: flex; flex-direction: column; align-items: flex-end; gap: 12px;
  position: relative; z-index: 1; padding-top: 4px;
  @media (max-width: 1080px) { grid-column: 2; flex-direction: row; align-items: center; justify-content: space-between; margin-top: 20px; }
  @media (max-width: 760px) { flex-direction: column; align-items: flex-start; }
`;
const SvcBook = styled(Link)`
  display: inline-flex; align-items: center; gap: 7px;
  font-size: 13.5px; font-weight: 600; color: #007a35; text-decoration: none;
  padding: 11px 18px; border: 1.5px solid rgba(0,176,80,0.22); border-radius: 8px;
  background: #e8f9ef; transition: background 0.15s, border-color 0.15s; white-space: nowrap;
  svg { width: 12px; height: 12px; transition: transform 0.15s; }
  &:hover { background: #d0f2e0; border-color: rgba(0,176,80,0.38); svg { transform: translateX(3px); } }
`;
const SvcNote = styled.p`font-size: 12px; color: #a0a0a0; text-align: right; line-height: 1.5; max-width: 190px; @media (max-width: 1080px) { text-align: left; }`;

/* Any show */
const AnyShow = styled.div`
  background: #1a1c1e; position: relative; overflow: hidden; padding: 88px 40px;
  &::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(0,176,80,0.042) 1px, transparent 1px); background-size: 32px 32px; pointer-events: none; }
  &::after { content: ''; position: absolute; bottom: -60px; left: -60px; width: 480px; height: 480px; background: radial-gradient(circle, rgba(0,176,80,0.08) 0%, transparent 70%); pointer-events: none; }
  @media (max-width: 760px) { padding: 60px 20px; }
`;
const AnyShowInner = styled.div`
  max-width: 1200px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; position: relative; z-index: 1;
  @media (max-width: 1080px) { grid-template-columns: 1fr; gap: 44px; }
`;
const AnyShowLeft = styled.div`
  h2 { font-family: 'Syne', sans-serif; font-weight: 800; font-size: clamp(28px, 3vw, 42px); color: #fff; letter-spacing: -0.025em; line-height: 1.08; margin-bottom: 20px; em { font-style: normal; color: #00b050; } }
  p { font-size: 15.5px; line-height: 1.75; color: rgba(255,255,255,0.36); max-width: 420px; margin-bottom: 32px; }
`;
const AnyShowRight = styled.div`display: flex; flex-direction: column; gap: 14px;`;
const AnyShowPoint = styled.div`
  display: flex; align-items: flex-start; gap: 14px; padding: 20px 22px;
  background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);
  border-radius: 14px; transition: border-color 0.2s;
  &:hover { border-color: rgba(0,176,80,0.2); }
`;
const AnyTick = styled.div`
  width: 22px; height: 22px; background: rgba(0,176,80,0.12); border: 1px solid rgba(0,176,80,0.25);
  border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px;
  svg { width: 10px; height: 10px; color: #00b050; }
`;
const AnyText = styled.div`
  strong { display: block; font-size: 13.5px; font-weight: 600; color: rgba(255,255,255,0.75); margin-bottom: 3px; }
  span { font-size: 13px; color: rgba(255,255,255,0.28); line-height: 1.55; }
`;
const AnyBtn = styled(Link)`
  display: inline-flex; align-items: center; gap: 7px;
  font-size: 14px; font-weight: 600; color: #fff;
  background: #00b050; border: 1.8px solid #00b050; padding: 13px 24px; border-radius: 8px;
  text-decoration: none; transition: background 0.18s; margin-top: 4px;
  &:hover { background: #009140; }
`;

/* Supplies */
const SuppliesGrid = styled.div`
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-top: 44px;
  @media (max-width: 1080px) { grid-template-columns: 1fr 1fr; }
`;
const SupplyCard = styled.div`
  background: #fff; border: 1.5px solid #e5e5e3; border-radius: 14px; padding: 24px 20px;
  transition: border-color 0.2s;
  &:hover { border-color: rgba(0,176,80,0.22); }
`;
const SupplyIcon = styled.div`
  width: 34px; height: 34px; background: #e8f9ef; border-radius: 8px;
  display: flex; align-items: center; justify-content: center; margin-bottom: 14px;
  svg { width: 16px; height: 16px; color: #007a35; }
`;
const SuppliesNote = styled.div`
  margin-top: 18px; display: flex; align-items: center; justify-content: space-between; gap: 24px;
  background: #fffbeb; border: 1.5px solid #fde68a; border-radius: 12px; padding: 16px 20px;
  @media (max-width: 1080px) { flex-direction: column; align-items: flex-start; gap: 10px; }
  p { font-size: 14px; line-height: 1.65; color: #92400e; strong { color: #78350f; } }
`;
const SuppliesBadge = styled.span`
  font-size: 10.5px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
  color: #b45309; white-space: nowrap; background: #fef3c7; border: 1px solid #fde68a;
  padding: 5px 12px; border-radius: 100px; flex-shrink: 0;
`;

/* Liability */
const LiabilityWrap = styled.div`
  margin-top: 52px; display: grid; grid-template-columns: 1fr 1fr; gap: 18px;
  @media (max-width: 1080px) { grid-template-columns: 1fr; }
`;
const LCardDark = styled.div`
  background: #1f2123; border: 1.5px solid rgba(255,255,255,0.06);
  border-radius: 18px; padding: 36px 32px;
  h3 { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 16px; letter-spacing: -0.01em; margin-bottom: 12px; line-height: 1.3; color: #fff; }
  p { font-size: 14.5px; line-height: 1.75; color: rgba(255,255,255,0.32); }
`;
const LCardLight = styled.div`
  background: #f5f5f3; border: 1.5px solid #e5e5e3;
  border-radius: 18px; padding: 36px 32px;
  h3 { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 16px; letter-spacing: -0.01em; margin-bottom: 12px; line-height: 1.3; color: #141414; }
  p { font-size: 14.5px; line-height: 1.75; color: #6b7280; a { color: #007a35; text-decoration: underline; text-underline-offset: 3px; } }
`;
const LBar = styled.div<{ green?: boolean }>`
  width: 28px; height: 3px; border-radius: 2px; margin-bottom: 20px;
  background: ${p => p.green ? '#00b050' : '#e5e5e3'};
`;

/* CTA */
const CtaSection = styled.section`
  background: #1a1c1e; padding: 88px 40px; position: relative; overflow: hidden;
  &::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(0,176,80,0.055) 1px, transparent 1px); background-size: 32px 32px; pointer-events: none; }
  @media (max-width: 760px) { padding: 60px 20px; }
`;
const CtaInner = styled.div`
  max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 40px; position: relative; z-index: 1;
  @media (max-width: 1080px) { flex-direction: column; align-items: flex-start; }
`;
const CtaText = styled.div`
  h2 { font-family: 'Syne', sans-serif; font-weight: 800; font-size: clamp(22px, 2.8vw, 34px); color: #fff; letter-spacing: -0.02em; margin-bottom: 10px; }
  p { font-size: 15px; color: rgba(255,255,255,0.38); line-height: 1.65; max-width: 440px; }
`;
const CtaBtns = styled.div`display: flex; gap: 12px; flex-wrap: wrap;`;
const BtnCtaSolid = styled(Link)`
  display: inline-flex; align-items: center; gap: 7px; font-size: 14px; font-weight: 600;
  color: #1a1c1e; background: #00b050; border: 1.5px solid #00b050;
  padding: 13px 26px; border-radius: 9px; text-decoration: none; white-space: nowrap; transition: background 0.18s;
  &:hover { background: #00c45a; }
`;
const BtnCtaGhost = styled(Link)`
  display: inline-flex; align-items: center; gap: 7px; font-size: 14px; font-weight: 600;
  color: rgba(255,255,255,0.55); background: transparent; border: 1.5px solid rgba(255,255,255,0.1);
  padding: 13px 26px; border-radius: 9px; text-decoration: none; white-space: nowrap; transition: border-color 0.18s, color 0.18s;
  &:hover { border-color: rgba(255,255,255,0.28); color: #fff; }
`;

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
    <PageHero>
      <HeroLines>
        <svg viewBox="0 0 600 420" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMaxYMid meet">
          <path d="M 600 40 L 500 40 Q 480 40 480 60 L 480 150" stroke="#00b050" strokeWidth="1.5" strokeOpacity="0.32" fill="none"/>
          <path d="M 600 200 L 540 200 Q 520 200 520 220 L 520 310 Q 520 330 500 330 L 400 330" stroke="#00b050" strokeWidth="1.5" strokeOpacity="0.18" fill="none"/>
          <path d="M 600 80 L 558 80" stroke="#00b050" strokeWidth="2" strokeOpacity="0.5" fill="none"/>
        </svg>
      </HeroLines>
      <HeroInner>
        <div>
          <HeroTag>For Exhibitors</HeroTag>
          <H1>Need a hand<br />at the <em>show?</em></H1>
          <HeroSub>Book what you need, nothing more. From getting your freight off the truck and to your stand, to packing everything down and getting it wrapped for the return — we're there when it matters.</HeroSub>
          <HeroCtas>
            <BtnSolid to="/quote">
              Book a Service <ArrowIcon />
            </BtnSolid>
            <BtnGhost to="/contact">Ask us first</BtnGhost>
          </HeroCtas>
        </div>
        <HeroCard>
          <HCardLabel>Services available</HCardLabel>
          <HSvcList>
            {[['01','Vehicle to Stand'],['02','Porter Service'],['03','Unboxing & Unpacking'],['04','Stand Pack-Down'],['05','Pallet Wrapping']].map(([n, name]) => (
              <HSvc key={n}><HSvcNum>{n}</HSvcNum><HSvcName>{name}</HSvcName><HSvcDot /></HSvc>
            ))}
          </HSvcList>
        </HeroCard>
      </HeroInner>
    </PageHero>

    <SectionWhite>
      <Inner>
        <ServicesHeader>
          <div>
            <Eyebrow>What we offer</Eyebrow>
            <SectionH>Hands-on help,<br />scoped to what you need.</SectionH>
          </div>
          <ServicesHeaderRight>
            <p>All services are available to pre-book. Terms &amp; Conditions and a waiver form are included with every booking — sent through when you submit your request via <Link to="/quote">the booking form</Link>.</p>
          </ServicesHeaderRight>
        </ServicesHeader>
        <SvcList>
          {services.map(s => (
            <SvcRow key={s.num}>
              <SvcNum>{s.num}</SvcNum>
              <SvcBody>
                <SvcName>{s.name}</SvcName>
                <SvcDesc>{s.desc}</SvcDesc>
                <SvcTags>{s.tags.map(t => <SvcTag key={t}>{t}</SvcTag>)}</SvcTags>
              </SvcBody>
              <SvcAction>
                <SvcBook to="/quote">Book this <ArrowIcon /></SvcBook>
                <SvcNote>{s.note}</SvcNote>
              </SvcAction>
            </SvcRow>
          ))}
        </SvcList>
      </Inner>
    </SectionWhite>

    <AnyShow>
      <AnyShowInner>
        <AnyShowLeft>
          <Eyebrow style={{ color: '#00b050' }}>Good to know</Eyebrow>
          <h2>We work at<br /><em>any show.</em><br />Not just ours.</h2>
          <p>You don't need to be at an Axis-managed event to use our on-site services. Whether it's a venue we're running or one we're not — if you need the help, we'll be there.</p>
          <AnyBtn to="/contact">Get in touch</AnyBtn>
        </AnyShowLeft>
        <AnyShowRight>
          {[
            { strong: 'Any venue, Australia-wide', span: 'We can arrange crew and equipment at events across all major cities.' },
            { strong: 'Large or complex deliveries welcome', span: 'We regularly work with stand builders and semi-load deliveries to get around dock congestion.' },
            { strong: 'Labour minimums at non-Axis events', span: 'We\'ll confirm minimum times at booking — no surprises.' },
          ].map(p => (
            <AnyShowPoint key={p.strong}>
              <AnyTick><CheckIcon /></AnyTick>
              <AnyText><strong>{p.strong}</strong><span>{p.span}</span></AnyText>
            </AnyShowPoint>
          ))}
        </AnyShowRight>
      </AnyShowInner>
    </AnyShow>

    <SectionGrey>
      <Inner>
        <Eyebrow>Supplies</Eyebrow>
        <SectionH>Materials at the service desk</SectionH>
        <SectionP>Where Axis Events is the on-site logistics operator for your show, we stock commonly needed items for purchase at the service desk during bump-in and bump-out.</SectionP>
        <SuppliesGrid>
          {[
            { name: 'Pallet Wrap', desc: 'Stretch film for securing your pallet for the return trip', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"/></svg> },
            { name: 'Packing Tape', desc: 'Heavy-duty tape for sealing boxes and cartons', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6"/></svg> },
            { name: 'Markers', desc: 'For labelling cartons, pallets, and storage items', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z"/></svg> },
            { name: 'Labels & Tags', desc: 'Storage labels and freight tags from our team', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"/></svg> },
          ].map(s => (
            <SupplyCard key={s.name}>
              <SupplyIcon>{s.icon}</SupplyIcon>
              <strong style={{ display: 'block', fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '13.5px', color: '#141414', marginBottom: 5 }}>{s.name}</strong>
              <span style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.55 }}>{s.desc}</span>
            </SupplyCard>
          ))}
        </SuppliesGrid>
        <SuppliesNote>
          <p>These items cost us significantly to transport and stock on-site — pricing reflects that. <strong>It's much cheaper to come prepared and grab your supplies before the show.</strong></p>
          <SuppliesBadge>Axis shows only</SuppliesBadge>
        </SuppliesNote>
      </Inner>
    </SectionGrey>

    <SectionWhite>
      <Inner>
        <Eyebrow>Important to know</Eyebrow>
        <SectionH>Terms, waivers &amp; liability</SectionH>
        <SectionP>A couple of things to be across before you book.</SectionP>
        <LiabilityWrap>
          <LCardDark>
            <LBar green />
            <h3>A waiver is part of every booking</h3>
            <p>For any service where our crew is physically handling, moving, or packing your goods, a waiver is required. It's included in the booking process — you'll receive it with your confirmation to sign before the event. It confirms that while we take every care, liability for your goods remains with you.</p>
          </LCardDark>
          <LCardLight>
            <LBar />
            <h3>Terms &amp; Conditions apply to all services</h3>
            <p>All on-site services are subject to our standard <Link to="/terms">Terms &amp; Conditions</Link>. If you have questions about what's covered before booking, <Link to="/contact">get in touch</Link> and we'll walk you through it.</p>
          </LCardLight>
        </LiabilityWrap>
      </Inner>
    </SectionWhite>

    <CtaSection>
      <CtaInner>
        <CtaText>
          <h2>Ready to book?</h2>
          <p>Fill in the service request form and we'll confirm everything well before the show.</p>
        </CtaText>
        <CtaBtns>
          <BtnCtaSolid to="/quote">Book a Service</BtnCtaSolid>
          <BtnCtaGhost to="/contact">Ask a question first</BtnCtaGhost>
        </CtaBtns>
      </CtaInner>
    </CtaSection>
  </>
);

export default SiteServicesPage;
