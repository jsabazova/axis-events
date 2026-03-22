import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

/* ── Hero ── */
const PageHero = styled.section`
  background: #1a1c1e; position: relative; overflow: hidden; padding-top: 64px;
  &::before {
    content: ''; position: absolute; inset: 0;
    background-image: radial-gradient(circle, rgba(0,176,80,0.055) 1px, transparent 1px);
    background-size: 36px 36px; pointer-events: none;
  }
  &::after {
    content: ''; position: absolute; top: -80px; right: -120px;
    width: 520px; height: 520px;
    background: radial-gradient(ellipse at center, rgba(0,176,80,0.08) 0%, transparent 70%);
    pointer-events: none;
  }
`;
const HeroInner = styled.div`
  max-width: 1200px; margin: 0 auto; padding: 72px 40px 80px;
  position: relative; z-index: 2;
  display: grid; grid-template-columns: 1fr 400px; gap: 60px; align-items: center;
  @media (max-width: 900px) { grid-template-columns: 1fr; padding: 48px 20px 60px; }
`;
const HeroTag = styled.div`
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 10.5px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
  color: #00b050; background: rgba(0,176,80,0.12); border: 1px solid rgba(0,176,80,0.25);
  padding: 4px 12px; border-radius: 100px; margin-bottom: 22px;
  &::before { content: ''; width: 5px; height: 5px; background: #00b050; border-radius: 50%; }
`;
const HeroH1 = styled.h1`
  font-family: 'Syne', sans-serif; font-weight: 800;
  font-size: clamp(32px, 4vw, 52px); line-height: 1.04;
  color: #fff; letter-spacing: -0.03em; margin-bottom: 22px;
  em { font-style: normal; color: #00b050; }
`;
const HeroSub = styled.p`
  font-size: 15.5px; line-height: 1.75; color: rgba(255,255,255,0.42);
  max-width: 500px; margin-bottom: 32px;
`;
const HeroBtns = styled.div`
  display: flex; gap: 12px; flex-wrap: wrap;
`;
const BtnSolid = styled(Link)`
  display: inline-flex; align-items: center; gap: 7px;
  font-size: 14px; font-weight: 600; color: #1a1c1e;
  background: #00b050; border: 1.5px solid #00b050;
  padding: 12px 24px; border-radius: 9px; text-decoration: none;
  transition: background 0.18s;
  &:hover { background: #00c45a; border-color: #00c45a; }
`;
const BtnGhost = styled.a`
  display: inline-flex; align-items: center; gap: 7px;
  font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.55);
  background: transparent; border: 1.5px solid rgba(255,255,255,0.1);
  padding: 12px 24px; border-radius: 9px; text-decoration: none;
  transition: border-color 0.18s, color 0.18s;
  &:hover { border-color: rgba(255,255,255,0.28); color: #fff; }
`;
const HeroPanel = styled.div`
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px; padding: 32px; display: flex; flex-direction: column;
  @media (max-width: 900px) { display: none; }
`;
const PanelLabel = styled.div`
  font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
  color: rgba(255,255,255,0.3); margin-bottom: 20px;
`;
const PanelRow = styled.div`
  display: flex; align-items: center; gap: 12px;
  padding: 13px 0; border-bottom: 1px solid rgba(255,255,255,0.05);
  &:last-child { border-bottom: none; }
`;
const PDot = styled.span`
  width: 5px; height: 5px; background: #00b050; border-radius: 50%; flex-shrink: 0; opacity: 0.7;
`;
const PText = styled.span`
  font-size: 13.5px; font-weight: 500; color: rgba(255,255,255,0.55);
`;

/* ── Plain English Strip ── */
const PEStrip = styled.section`
  background: #222527;
  border-top: 1px solid rgba(255,255,255,0.05);
  border-bottom: 1px solid rgba(255,255,255,0.05);
  padding: 0 40px;
  @media (max-width: 900px) { padding: 0 20px; }
`;
const PEInner = styled.div`
  max-width: 1200px; margin: 0 auto; padding: 52px 0;
  display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0;
  @media (max-width: 900px) { grid-template-columns: 1fr; gap: 32px; padding: 40px 0; }
`;
const PEStep = styled.div`
  display: flex; flex-direction: column; padding: 0 48px 0 0; position: relative;
  &:not(:last-child)::after {
    content: ''; position: absolute; right: 24px; top: 16px;
    width: 1px; height: calc(100% - 16px); background: rgba(255,255,255,0.07);
  }
  @media (max-width: 900px) { padding: 0; &::after { display: none; } }
`;
const PENum = styled.div`
  font-family: 'Syne', sans-serif; font-weight: 800; font-size: 11px;
  color: #00b050; letter-spacing: 0.1em; margin-bottom: 12px; opacity: 0.7;
`;
const PEH3 = styled.h3`
  font-family: 'Syne', sans-serif; font-weight: 700; font-size: 16px;
  color: rgba(255,255,255,0.88); margin-bottom: 8px; line-height: 1.3;
`;
const PEP = styled.p`
  font-size: 13.5px; line-height: 1.72; color: rgba(255,255,255,0.35);
`;

/* ── Shared section styles ── */
const SectionWhite = styled.section`
  background: #fff; padding: 88px 40px;
  @media (max-width: 900px) { padding: 60px 20px; }
`;
const SectionGrey = styled.section`
  background: #f5f5f3; border-top: 1.5px solid #e5e5e3; border-bottom: 1.5px solid #e5e5e3;
  padding: 88px 40px;
  @media (max-width: 900px) { padding: 60px 20px; }
`;
const SectionInner = styled.div`
  max-width: 1200px; margin: 0 auto;
`;
const Eyebrow = styled.span`
  display: inline-block; font-size: 11px; font-weight: 600;
  letter-spacing: 0.12em; text-transform: uppercase; color: #007a35; margin-bottom: 12px;
`;
const SectionH = styled.h2`
  font-family: 'Syne', sans-serif; font-weight: 800;
  font-size: clamp(26px, 2.8vw, 38px); letter-spacing: -0.022em;
  line-height: 1.1; color: #141414; margin-bottom: 16px;
`;
const SectionSub = styled.p`
  font-size: 15.5px; line-height: 1.75; color: #6b7280; max-width: 580px;
`;

/* ── Handle layout (what we handle) ── */
const HandleLayout = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start;
  @media (max-width: 900px) { grid-template-columns: 1fr; gap: 40px; }
`;
const HandleLeft = styled.div`
  display: flex; flex-direction: column; gap: 20px;
  p { font-size: 15.5px; line-height: 1.78; color: #6b7280; }
  p.lead { font-size: 17px; line-height: 1.7; color: #141414; font-weight: 500; }
  p strong { color: #141414; font-weight: 600; }
`;
const ServiceRows = styled.div`
  border-top: 1.5px solid #e5e5e3;
`;
const ServiceRow = styled.div`
  display: grid; grid-template-columns: 180px 1fr auto; gap: 24px;
  padding: 20px 0; border-bottom: 1.5px solid #e5e5e3; align-items: start;
  @media (max-width: 600px) { grid-template-columns: 1fr; gap: 8px; }
`;
const SrLabel = styled.div`
  display: flex; align-items: flex-start; gap: 8px; padding-top: 2px;
`;
const SrDot = styled.span`
  width: 6px; height: 6px; background: #00b050; border-radius: 50%; flex-shrink: 0; margin-top: 5px;
`;
const SrName = styled.span`
  font-family: 'Syne', sans-serif; font-weight: 700; font-size: 13px; color: #141414; line-height: 1.35;
`;
const SrDesc = styled.p`
  font-size: 13.5px; line-height: 1.68; color: #6b7280;
`;
const SrNum = styled.span`
  font-family: 'Syne', sans-serif; font-weight: 800; font-size: 11px;
  color: #e5e5e3; letter-spacing: 0.05em; padding-top: 3px; white-space: nowrap;
  @media (max-width: 600px) { display: none; }
`;

/* ── Timeline ── */
const Timeline = styled.div`
  margin-top: 56px; position: relative;
  &::before {
    content: ''; position: absolute; left: 19px; top: 24px; bottom: 24px;
    width: 2px; background: #e5e5e3;
  }
`;
const TimelineStep = styled.div`
  display: flex; gap: 28px; align-items: flex-start; margin-bottom: 36px; position: relative;
  &:last-child { margin-bottom: 0; }
  &:hover .ts-num { border-color: #00b050; color: #007a35; }
`;
const TsNum = styled.div`
  width: 40px; height: 40px; border-radius: 50%;
  background: #fff; border: 2px solid #e5e5e3;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  font-family: 'Syne', sans-serif; font-weight: 800; font-size: 13px; color: #a0a0a0;
  z-index: 1; transition: border-color 0.2s, color 0.2s;
`;
const TsBody = styled.div`
  padding-top: 8px;
  h4 { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 15px; color: #141414; margin-bottom: 6px; }
  p { font-size: 14px; line-height: 1.68; color: #6b7280; }
`;

/* ── Who we serve ── */
const WhoGrid = styled.div`
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 48px;
  @media (max-width: 900px) { grid-template-columns: 1fr 1fr; }
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;
const WhoCard = styled.div`
  background: #fff; border: 1.5px solid #e5e5e3; border-radius: 16px; padding: 28px 26px;
  transition: border-color 0.2s, box-shadow 0.2s;
  &:hover { border-color: rgba(0,176,80,0.22); box-shadow: 0 6px 28px rgba(0,0,0,0.06); }
`;
const WhoIcon = styled.div`
  width: 40px; height: 40px; background: #e8f9ef; border-radius: 10px;
  display: flex; align-items: center; justify-content: center; margin-bottom: 16px;
  svg { width: 18px; height: 18px; color: #007a35; }
`;
const WhoH4 = styled.h4`
  font-family: 'Syne', sans-serif; font-weight: 700; font-size: 14.5px;
  color: #141414; margin-bottom: 8px;
`;
const WhoP = styled.p`
  font-size: 13.5px; line-height: 1.65; color: #6b7280;
`;

/* ── Coverage ── */
const CoverageLayout = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;
  @media (max-width: 900px) { grid-template-columns: 1fr; gap: 40px; }
`;
const MapBox = styled.div`
  background: #f5f5f3; border: 1.5px solid #e5e5e3; border-radius: 20px;
  padding: 40px; display: flex; align-items: center; justify-content: center;
  min-height: 340px; position: relative; overflow: hidden;
  &::after {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse at 50% 60%, rgba(0,176,80,0.05) 0%, transparent 70%);
    pointer-events: none;
  }
`;
const CoverageBody = styled.div`
  display: flex; flex-direction: column; gap: 28px;
  .lead { font-size: 17px; line-height: 1.7; color: #141414; font-weight: 500; }
  p { font-size: 15px; line-height: 1.78; color: #6b7280; }
`;
const CityPills = styled.div`
  display: flex; flex-wrap: wrap; gap: 8px;
`;
const CityPill = styled.span`
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 12.5px; font-weight: 500; padding: 6px 13px;
  border-radius: 100px; background: #f5f5f3; border: 1.5px solid #e5e5e3; color: #141414;
  &::before { content: ''; width: 5px; height: 5px; background: #00b050; border-radius: 50%; flex-shrink: 0; }
`;

/* ── Tech section ── */
const TechSection = styled.section`
  background: #1a1c1e; padding: 88px 40px; position: relative; overflow: hidden;
  border-top: 1px solid rgba(255,255,255,0.05);
  &::before {
    content: ''; position: absolute; inset: 0;
    background-image: radial-gradient(circle, rgba(0,176,80,0.045) 1px, transparent 1px);
    background-size: 32px 32px; pointer-events: none;
  }
  &::after {
    content: ''; position: absolute; top: -60px; left: -60px;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(0,176,80,0.07) 0%, transparent 70%);
    pointer-events: none;
  }
  @media (max-width: 900px) { padding: 60px 20px; }
`;
const TechInner = styled.div`
  max-width: 1200px; margin: 0 auto; position: relative; z-index: 1;
`;
const TechHeader = styled.div`
  margin-bottom: 44px;
  h2 {
    font-family: 'Syne', sans-serif; font-weight: 800;
    font-size: clamp(24px, 2.8vw, 36px); color: #fff;
    letter-spacing: -0.025em; line-height: 1.08; margin-bottom: 14px;
  }
  p { font-size: 15px; color: rgba(255,255,255,0.4); max-width: 560px; line-height: 1.72; }
`;
const TechGrid = styled.div`
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;
  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;
const TechCard = styled.div`
  background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
  border-radius: 14px; padding: 28px 26px;
  transition: border-color 0.2s;
  &:hover { border-color: rgba(0,176,80,0.25); }
`;
const TcService = styled.div`
  display: flex; align-items: center; gap: 10px; margin-bottom: 10px;
`;
const TcAbbrev = styled.span`
  font-family: 'Syne', sans-serif; font-weight: 800; font-size: 13px; color: #00b050;
`;
const TcSlash = styled.span`color: rgba(255,255,255,0.1);`;
const TcFull = styled.span`font-size: 12px; color: rgba(255,255,255,0.3); font-weight: 500;`;
const TcH4 = styled.h4`
  font-family: 'Syne', sans-serif; font-weight: 700; font-size: 14px;
  color: rgba(255,255,255,0.82); margin-bottom: 8px;
`;
const TcP = styled.p`font-size: 13.5px; line-height: 1.65; color: rgba(255,255,255,0.35);`;
const TechNote = styled.div`
  margin-top: 28px; padding: 20px 24px;
  background: rgba(0,176,80,0.07); border: 1px solid rgba(0,176,80,0.18);
  border-radius: 12px; font-size: 13.5px; line-height: 1.65; color: rgba(255,255,255,0.4);
  strong { color: #00b050; font-weight: 600; }
`;

/* ── CTA ── */
const CtaSection = styled.section`
  background: #1a1c1e; padding: 80px 40px; position: relative; overflow: hidden;
  &::before {
    content: ''; position: absolute; inset: 0;
    background-image: radial-gradient(circle, rgba(0,176,80,0.055) 1px, transparent 1px);
    background-size: 32px 32px; pointer-events: none;
  }
  @media (max-width: 900px) { padding: 60px 20px; }
`;
const CtaInner = styled.div`
  max-width: 1200px; margin: 0 auto;
  display: flex; align-items: center; justify-content: space-between; gap: 40px;
  position: relative; z-index: 1;
  @media (max-width: 900px) { flex-direction: column; align-items: flex-start; }
`;
const CtaText = styled.div`
  h2 {
    font-family: 'Syne', sans-serif; font-weight: 800;
    font-size: clamp(22px, 2.8vw, 34px); color: #fff;
    letter-spacing: -0.02em; margin-bottom: 10px;
  }
  p { font-size: 15px; color: rgba(255,255,255,0.38); line-height: 1.65; max-width: 460px; }
`;
const CtaBtns = styled.div`
  display: flex; gap: 12px; flex-shrink: 0; flex-wrap: wrap;
`;

const FreightServicesPage: React.FC = () => (
  <>
    <PageHero>
      <HeroInner>
        <div>
          <HeroTag>Domestic Freight</HeroTag>
          <HeroH1>Your freight.<br /><em>On the floor.</em><br />On time.</HeroH1>
          <HeroSub>We handle domestic freight for exhibitors and event organisers across Australia — from a few boxes and a banner bag, to full pallet loads and oversized builds. You focus on the show. We'll handle the rest.</HeroSub>
          <HeroBtns>
            <BtnSolid to="/contact">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width={15} height={15}><path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"/></svg>
              Get a Quote
            </BtnSolid>
            <BtnGhost href="#how-it-works">How it works</BtnGhost>
          </HeroBtns>
        </div>
        <HeroPanel>
          <PanelLabel>What we move</PanelLabel>
          {['Boxes & cartons','Pallets & skids','Signage & banner bags','Stands & custom builds','Crates & flightcases','Equipment & machinery','Oversized & heavy loads'].map(item => (
            <PanelRow key={item}><PDot /><PText>{item}</PText></PanelRow>
          ))}
        </HeroPanel>
      </HeroInner>
    </PageHero>

    <PEStrip>
      <PEInner>
        <PEStep>
          <PENum>01</PENum>
          <PEH3>Tell us what you're sending</PEH3>
          <PEP>Number of boxes, pallets, or items — and where they're coming from. That's all we need to get started. No logistics jargon required.</PEP>
        </PEStep>
        <PEStep>
          <PENum>02</PENum>
          <PEH3>We collect and coordinate</PEH3>
          <PEP>We arrange pick-up from your office, warehouse, or supplier and handle everything in between — including any venue requirements or deadlines.</PEP>
        </PEStep>
        <PEStep>
          <PENum>03</PENum>
          <PEH3>It arrives at your stand</PEH3>
          <PEP>Your freight lands at the show, confirmed and accounted for. We'll let you know when it's there — so you can just show up and set up.</PEP>
        </PEStep>
      </PEInner>
    </PEStrip>

    <SectionWhite>
      <SectionInner>
        <HandleLayout>
          <HandleLeft>
            <Eyebrow>What we handle</Eyebrow>
            <SectionH>From 3 boxes to a full semi-load</SectionH>
            <p className="lead">We work with exhibitors of every size — from a small business sending their first trade show kit, to national brands with complex multi-site freight operations.</p>
            <p>Whether it's a few cartons of brochures and a branded banner, or a pallet of product samples and a custom-built display stand — we've moved it. We understand the timing pressures of events, the venue rules around bump-in, and the stress of freight going wrong the night before a show.</p>
            <p><strong>That's why we do things properly.</strong> We stay across every shipment and keep you informed — so nothing falls through the cracks.</p>
          </HandleLeft>
          <div>
            <ServiceRows>
              {[
                { num: '01', name: 'Door-to-stand delivery', desc: 'We collect from your office, warehouse, or supplier and deliver directly to your stand at the venue. No middle steps, no confusion.' },
                { num: '02', name: 'Dedicated truck loads', desc: 'Got a semi-load worth of product heading to a show? Need a b-double moving items from your warehouse all day? We run dedicated trucks at scale — you book the load, we handle the rest.' },
                { num: '03', name: 'Return freight', desc: 'We handle the return leg too. Once the show wraps, we collect from your stand and get everything back to where it needs to go.' },
                { num: '04', name: 'Oversized & heavy freight', desc: 'Large exhibit builds, machinery, display structures — we manage the transport, permits, and handling for freight that doesn\'t fit a standard pallet.' },
                { num: '05', name: 'Storage between shows', desc: 'Doing multiple shows across the year? Rather than sending freight back and forth each time, it can be held between events. Talk to us about arranging it.' },
                { num: '06', name: 'Freight insurance', desc: 'General freight insurance is included on all shipments. Additional coverage is available for high-value or sensitive items — just let us know at the time of booking.' },
              ].map(r => (
                <ServiceRow key={r.num}>
                  <SrLabel><SrDot /><SrName>{r.name}</SrName></SrLabel>
                  <SrDesc>{r.desc}</SrDesc>
                  <SrNum>{r.num}</SrNum>
                </ServiceRow>
              ))}
            </ServiceRows>
          </div>
        </HandleLayout>
      </SectionInner>
    </SectionWhite>

    <SectionGrey id="how-it-works">
      <SectionInner>
        <div style={{ maxWidth: 520 }}>
          <Eyebrow>How it works</Eyebrow>
          <SectionH>Simple from your end.<br />Organised from ours.</SectionH>
          <SectionSub>We've built the process to be easy for exhibitors — whether it's your first trade show or your fiftieth. Here's what it looks like.</SectionSub>
        </div>
        <Timeline>
          {[
            { n: '01', h: 'You submit your freight details', p: 'Fill out a simple booking form — what you\'re sending, how many pieces, where from, and the show dates. No guesswork. We\'ll confirm everything with you before we proceed.' },
            { n: '02', h: 'We send labels and instructions', p: 'You\'ll receive freight labels and clear packing instructions. Stick them on, and your freight is ready to go. We\'ll tell you exactly what needs to happen and when.' },
            { n: '03', h: 'We arrange collection', p: 'We coordinate pick-up from your nominated address — office, warehouse, supplier, or elsewhere. You don\'t need to drop anything off or chase a carrier.' },
            { n: '04', h: 'Freight arrives at the venue', p: 'We manage all venue receiving requirements and timing windows. Your freight comes through the dock and is brought to your stand — we keep an eye on it and follow up if anything looks off.' },
            { n: '05', h: 'You show up. You set up.', p: 'Your freight is at your stand when you arrive. No hunting around the venue, no waiting at the dock. We\'ll have kept you in the loop along the way — just open and go.' },
            { n: '06', h: 'We handle the return (if needed)', p: 'Post-show, we collect from your stand and return freight to your nominated address. Or arrange storage if you\'re doing multiple shows. Just let us know.' },
          ].map(s => (
            <TimelineStep key={s.n}>
              <TsNum className="ts-num">{s.n}</TsNum>
              <TsBody><h4>{s.h}</h4><p>{s.p}</p></TsBody>
            </TimelineStep>
          ))}
        </Timeline>
      </SectionInner>
    </SectionGrey>

    <SectionWhite>
      <SectionInner>
        <Eyebrow>Who we work with</Eyebrow>
        <SectionH>Built for anyone sending freight<br />to a show</SectionH>
        <WhoGrid>
          {[
            { title: 'First-time exhibitors', desc: 'Never sent freight to a trade show before? We\'ll walk you through everything — what to pack, how to label it, and what to expect on arrival. No stress.', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/></svg> },
            { title: 'Ongoing exhibitors', desc: 'Regular show circuit? We keep records, know your freight profile, and make repeat bookings quick. Familiar faces, consistent service, no re-explaining every time.', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"/></svg> },
            { title: 'Event organisers', desc: 'Managing freight across dozens of exhibitors? We can act as the official freight partner for your show — handling inbound, outbound, and on-floor delivery at scale.', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"/></svg> },
            { title: 'Display & stand builders', desc: 'Shipping crates, flightcases, or custom fabrication? We handle specialist requirements, tight delivery windows, and freight that needs extra care getting to and from the venue.', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l5.653-4.655m5.8-5.8.35-.35a3.375 3.375 0 0 1 4.773 0l.709.71a3.375 3.375 0 0 1 0 4.773l-.35.35"/></svg> },
            { title: 'High-volume shippers', desc: 'Need a semi-load of product running to a show, or a b-double shuttling items from your warehouse all day? We run dedicated trucks at scale — you book the load, we handle the rest.', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/></svg> },
            { title: 'Corporate exhibitors', desc: 'Attending industry conferences with a full booth setup? We\'ve worked across medical, tech, construction, finance, and more. We know the venues and we know the drill.', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"/></svg> },
          ].map(c => (
            <WhoCard key={c.title}>
              <WhoIcon>{c.icon}</WhoIcon>
              <WhoH4>{c.title}</WhoH4>
              <WhoP>{c.desc}</WhoP>
            </WhoCard>
          ))}
        </WhoGrid>
      </SectionInner>
    </SectionWhite>

    <SectionGrey>
      <SectionInner>
        <CoverageLayout>
          <MapBox>
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
          </MapBox>
          <CoverageBody>
            <Eyebrow>National coverage</Eyebrow>
            <SectionH>Wherever the show is,<br />we'll get it there</SectionH>
            <p className="lead">We move freight to events and trade shows in every major Australian city — and plenty of regional venues too.</p>
            <p>Our carrier network covers metropolitan and regional routes, meaning we can coordinate collection and delivery whether your freight is coming from a suburban office in Melbourne, a warehouse in outer Sydney, or a supplier in Brisbane.</p>
            <CityPills>
              {['Sydney','Melbourne','Brisbane','Adelaide','Perth','Gold Coast','Canberra','Regional'].map(c => <CityPill key={c}>{c}</CityPill>)}
            </CityPills>
          </CoverageBody>
        </CoverageLayout>
      </SectionInner>
    </SectionGrey>

    <TechSection>
      <TechInner>
        <TechHeader>
          <Eyebrow style={{ color: '#00b050' }}>For the logistics people</Eyebrow>
          <h2>The specifics, if you need them</h2>
          <p>If you're the one who books freight regularly and wants to know the technical detail — here's how we operate.</p>
        </TechHeader>
        <TechGrid>
          <TechCard>
            <TcService><TcAbbrev>FTL</TcAbbrev><TcSlash>/</TcSlash><TcFull>Full Truckload</TcFull></TcService>
            <TcH4>Dedicated transport</TcH4>
            <TcP>Direct, unshared vehicles for time-critical or high-volume freight. Semis, b-doubles, and rigid trucks available. Suitable for large stand builds, bulk product runs, and anything that needs its own vehicle and schedule.</TcP>
          </TechCard>
          <TechCard>
            <TcService><TcAbbrev>OSOM</TcAbbrev><TcSlash>/</TcSlash><TcFull>Oversize &amp; Overmass</TcFull></TcService>
            <TcH4>Heavy &amp; oversized freight</TcH4>
            <TcP>We manage OSOM consignments including wide loads, non-stackable items, and freight requiring permit coordination. We work with specialist carriers for machinery, custom builds, and structural elements.</TcP>
          </TechCard>
          <TechCard>
            <TcService><TcAbbrev>Door-to-Stand</TcAbbrev></TcService>
            <TcH4>Origin to stand delivery</TcH4>
            <TcP>We coordinate pick-up from the origin address, manage carrier handoffs, handle all venue receiving requirements, and deliver to stand. Suitable for exhibitors who want one point of contact and clear communication throughout.</TcP>
          </TechCard>
          <TechCard>
            <TcService><TcAbbrev>Insurance</TcAbbrev></TcService>
            <TcH4>Freight insurance</TcH4>
            <TcP>General freight insurance is included across all domestic shipments. Additional coverage is available for high-value, fragile, or sensitive freight — just declare at the time of booking and we'll sort it.</TcP>
          </TechCard>
        </TechGrid>
        <TechNote>
          <strong>Also available:</strong> freight can be held between shows for exhibitors on a regular circuit rather than returning home each time, rail freight for select routes, and repackaging or relabelling on receipt. Talk to us about what you need.
        </TechNote>
      </TechInner>
    </TechSection>

    <CtaSection>
      <CtaInner>
        <CtaText>
          <h2>Ready to book your freight?</h2>
          <p>Whether you're sending a few boxes or a full truck — get in touch and we'll sort it out. Quotes are fast and there's no obligation.</p>
        </CtaText>
        <CtaBtns>
          <BtnSolid to="/contact">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width={15} height={15}><path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"/></svg>
            Get a Quote
          </BtnSolid>
          <BtnGhost as={Link} to="/services/international-freight">International Freight</BtnGhost>
        </CtaBtns>
      </CtaInner>
    </CtaSection>
  </>
);

export default FreightServicesPage;
