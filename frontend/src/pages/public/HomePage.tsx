import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;
const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.35; }
`;

// ── HERO ─────────────────────────────────────────────────────────────────────
const Hero = styled.section`
  padding-top: 64px;
  background: #1a1c1e;
  position: relative; overflow: hidden;

  &::before {
    content: ''; position: absolute; inset: 0; z-index: 0;
    background-image: radial-gradient(circle, rgba(0,176,80,0.06) 1px, transparent 1px);
    background-size: 38px 38px; pointer-events: none;
  }
`;
const HeroLines = styled.div`
  position: absolute; top: 0; right: 0; width: 55%; height: 100%;
  pointer-events: none; z-index: 1; overflow: hidden;
  svg { position: absolute; top: 0; right: 0; width: 100%; height: 100%; }
`;
const HeroInner = styled.div`
  max-width: 1200px; margin: 0 auto; position: relative; z-index: 2;
  display: grid; grid-template-columns: 50% 50%;
  min-height: 460px; align-items: center; padding: 0 40px;

  @media (max-width: 1080px) { grid-template-columns: 1fr; padding: 0 40px; }
  @media (max-width: 760px)  { padding: 0 20px; }
`;
const HeroContent = styled.div`
  padding: 60px 40px 60px 0;
  display: flex; flex-direction: column; justify-content: center;

  @media (max-width: 1080px) { padding: 48px 0; }
  @media (max-width: 760px)  { padding: 44px 0; }
`;
const H1 = styled.h1`
  font-family: 'Syne', sans-serif; font-weight: 800;
  font-size: clamp(34px, 3.8vw, 52px); line-height: 1.06;
  color: #ffffff; letter-spacing: -0.028em; margin-bottom: 18px;
  animation: ${fadeUp} 0.55s ease both; animation-delay: 0.04s;
  em { font-style: normal; color: #00b050; }
`;
const HeroSub = styled.p`
  font-size: 15.5px; line-height: 1.72; color: rgba(255,255,255,0.45);
  max-width: 400px; margin-bottom: 32px;
  animation: ${fadeUp} 0.55s ease both; animation-delay: 0.13s;
`;
const HeroCtas = styled.div`
  display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
  animation: ${fadeUp} 0.55s ease both; animation-delay: 0.22s;
`;
const BtnSolid = styled(Link)`
  display: inline-flex; align-items: center; gap: 7px;
  font-size: 14px; font-weight: 600; color: #ffffff;
  background: #00b050; border: 1.8px solid #00b050;
  padding: 12px 22px; border-radius: 8px; text-decoration: none;
  transition: background 0.18s, transform 0.15s;
  &:hover { background: #009140; border-color: #009140; transform: translateY(-1px); }
  svg { width: 13px; height: 13px; }
`;
const BtnOutline = styled(Link)`
  display: inline-flex; align-items: center; gap: 7px;
  font-size: 14px; font-weight: 600; color: #ffffff;
  background: transparent; border: 1.8px solid rgba(255,255,255,0.3);
  padding: 12px 22px; border-radius: 8px; text-decoration: none;
  transition: border-color 0.18s, background 0.18s;
  &:hover { border-color: rgba(255,255,255,0.7); background: rgba(255,255,255,0.05); }
`;

const HeroImgWrap = styled.div`
  display: flex; align-items: center; justify-content: center; padding: 40px 0;
  @media (max-width: 1080px) { display: none; }
`;
const HeroCircle = styled.div`
  width: 390px; height: 390px; border-radius: 50%; overflow: hidden; flex-shrink: 0;
  border: 4px solid #111;
  outline: 2px solid rgba(0,176,80,0.35); outline-offset: 6px;
  box-shadow: 0 0 0 20px rgba(0,176,80,0.04), 0 32px 80px rgba(0,0,0,0.55);
  img { width: 100%; height: 100%; object-fit: cover; display: block; }
`;

// ── TRUST BAR ──────────────────────────────────────────────────────────────────
const TrustBar = styled.div`
  background: #f5f5f3; border-bottom: 1.5px solid #e5e5e3; padding: 14px 40px;
  @media (max-width: 760px) { padding: 12px 20px; }
`;
const TrustInner = styled.div`
  max-width: 1200px; margin: 0 auto;
  display: flex; align-items: center; gap: 14px; flex-wrap: wrap;
`;
const TrustLabel = styled.span`
  font-size: 10.5px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
  color: #a0a0a0; white-space: nowrap;
`;
const TrustDiv = styled.span`
  width: 1px; height: 14px; background: #e5e5e3;
`;
const TrustItems = styled.div`
  display: flex; align-items: center; gap: 6px; flex-wrap: wrap;
`;
const TrustPill = styled.span`
  display: inline-flex; align-items: center; gap: 5px; font-size: 12px; font-weight: 500;
  color: #6b7280; background: #ffffff; border: 1.5px solid #e5e5e3;
  padding: 4px 10px; border-radius: 100px;
`;
const TrustDot = styled.span`
  width: 5px; height: 5px; background: #00b050; border-radius: 50%; flex-shrink: 0;
`;

// ── WHO WE SERVE ──────────────────────────────────────────────────────────────
const Paths = styled.section`
  background: #ffffff; border-bottom: 2px solid #e5e5e3;
  position: relative;
  &::before {
    content: ''; position: absolute; top: 0; left: 0;
    width: 3px; height: 100%;
    background: linear-gradient(to bottom, #00b050, transparent);
  }
`;
const PathsGrid = styled.div`
  max-width: 1200px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1fr;
  @media (max-width: 760px) { grid-template-columns: 1fr; }
`;
const PathCard = styled(Link)`
  padding: 48px; text-decoration: none; color: inherit;
  border-right: 1.5px solid #e5e5e3; transition: background 0.2s; display: block;
  &:last-child { border-right: none; }
  &:hover { background: #fafafa; }
  @media (max-width: 760px) {
    border-right: none; border-bottom: 1.5px solid #e5e5e3; padding: 36px 24px;
    &:last-child { border-bottom: none; }
  }
`;
const PathTag = styled.div`
  display: inline-flex; align-items: center; gap: 6px; font-size: 10.5px; font-weight: 600;
  letter-spacing: 0.1em; text-transform: uppercase; color: #007a35;
  background: #e8f9ef; border: 1px solid rgba(0,176,80,0.22);
  padding: 4px 11px; border-radius: 100px; margin-bottom: 16px;
`;
const PathTitle = styled.h3`
  font-family: 'Syne', sans-serif; font-weight: 700; font-size: 21px;
  color: #141414; margin-bottom: 10px; letter-spacing: -0.015em;
`;
const PathDesc = styled.p`
  font-size: 14px; line-height: 1.68; color: #6b7280; margin-bottom: 20px; max-width: 340px;
`;
const PathFeatures = styled.ul`
  list-style: none; padding: 0; margin: 0 0 28px;
  display: flex; flex-direction: column; gap: 8px;
  li {
    display: flex; align-items: center; gap: 9px; font-size: 13px; color: #6b7280;
    &::before { content: ''; width: 5px; height: 5px; background: #00b050; border-radius: 50%; flex-shrink: 0; }
  }
`;
const PathActions = styled.div`
  display: flex; align-items: center; gap: 16px;
`;
const PathBtn = styled(Link)`
  display: inline-flex; align-items: center; gap: 6px; font-size: 13.5px; font-weight: 600;
  color: #ffffff; background: #00b050; padding: 10px 18px; border-radius: 8px;
  text-decoration: none; transition: background 0.18s, transform 0.15s;
  &:hover { background: #009140; transform: translateY(-1px); }
  svg { width: 12px; height: 12px; }
`;
const PathMore = styled(Link)`
  font-size: 13.5px; font-weight: 500; color: #6b7280; text-decoration: none;
  transition: color 0.18s; display: inline-flex; align-items: center; gap: 4px;
  &:hover { color: #007a35; }
  svg { width: 12px; height: 12px; }
`;

// ── SERVICES SECTION ───────────────────────────────────────────────────────────
const Section = styled.section<{ $bg?: string }>`
  padding: 80px 40px;
  background: ${p => p.$bg || '#ffffff'};
  @media (max-width: 760px) { padding: 60px 20px; }
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
  font-size: clamp(26px, 3vw, 38px); letter-spacing: -0.02em; line-height: 1.1;
  color: #141414; margin-bottom: 12px;
`;
const SectionP = styled.p`
  font-size: 15.5px; line-height: 1.68; color: #6b7280; max-width: 480px;
`;

const ServicesGrid = styled.div`
  display: grid; grid-template-columns: repeat(3,1fr); gap: 18px; margin-top: 44px;
  @media (max-width: 1080px) { grid-template-columns: 1fr 1fr; }
  @media (max-width: 640px)  { grid-template-columns: 1fr; }
`;
const SvcCard = styled(Link)<{ $dark?: boolean }>`
  background: ${p => p.$dark ? '#222527' : '#ffffff'};
  border: 1.5px solid ${p => p.$dark ? '#2a2d30' : '#e5e5e3'};
  border-radius: 18px; overflow: hidden; text-decoration: none; color: inherit;
  display: flex; flex-direction: column;
  transition: border-color 0.22s, transform 0.2s, box-shadow 0.22s;
  &:hover {
    border-color: #00b050; transform: translateY(-4px);
    box-shadow: ${p => p.$dark ? '0 12px 40px rgba(0,0,0,0.3)' : '0 12px 40px rgba(0,176,80,0.1)'};
  }
`;
const SvcImg = styled.div`
  width: 100%; height: 185px; overflow: hidden;
  img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.4s; }
  ${SvcCard}:hover & img { transform: scale(1.05); }
`;
const SvcBody = styled.div`
  padding: 22px 22px 24px; flex: 1; display: flex; flex-direction: column;
`;
const SvcIcon = styled.div<{ $dark?: boolean }>`
  width: 38px; height: 38px;
  background: ${p => p.$dark ? 'rgba(0,176,80,0.1)' : '#e8f9ef'};
  border: 1.5px solid ${p => p.$dark ? 'rgba(0,176,80,0.18)' : 'rgba(0,176,80,0.22)'};
  border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 13px;
  svg { width: 19px; height: 19px; color: #007a35; }
`;
const SvcTitle = styled.h3<{ $dark?: boolean }>`
  font-family: 'Syne', sans-serif; font-weight: 700; font-size: 15.5px;
  color: ${p => p.$dark ? '#ffffff' : '#141414'}; margin-bottom: 8px;
`;
const SvcDesc = styled.p<{ $dark?: boolean }>`
  font-size: 13px; line-height: 1.65;
  color: ${p => p.$dark ? 'rgba(255,255,255,0.36)' : '#6b7280'};
  flex: 1; margin-bottom: 16px;
`;
const SvcLink = styled.span<{ $dark?: boolean }>`
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 13px; font-weight: 600;
  color: ${p => p.$dark ? '#00b050' : '#007a35'}; margin-top: auto;
  svg { width: 12px; height: 12px; transition: transform 0.18s; }
  ${SvcCard}:hover & svg { transform: translateX(3px); }
`;

// ── WHY AXIS ──────────────────────────────────────────────────────────────────
const Why = styled.section`
  background: #f5f5f3; border-top: 1.5px solid #e5e5e3; border-bottom: 1.5px solid #e5e5e3;
  padding: 80px 40px;
  @media (max-width: 760px) { padding: 60px 20px; }
`;
const WhyLayout = styled.div`
  max-width: 1200px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: start;
  @media (max-width: 1080px) { grid-template-columns: 1fr; gap: 36px; }
`;
const WhyPoints = styled.div`
  display: flex; flex-direction: column; gap: 22px; margin-top: 32px;
`;
const WhyPoint = styled.div`
  display: flex; gap: 14px; align-items: flex-start;
`;
const WhyTick = styled.div`
  width: 22px; height: 22px; background: #e8f9ef; border: 1.5px solid rgba(0,176,80,0.22);
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; margin-top: 2px;
  svg { width: 11px; height: 11px; color: #007a35; }
`;
const WhyPtBody = styled.div`
  h4 { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 14.5px; color: #141414; margin-bottom: 4px; }
  p  { font-size: 13px; line-height: 1.58; color: #6b7280; }
`;
const WhyVisual = styled.div`
  display: flex; flex-direction: column; gap: 12px;
`;
const WhyImg = styled.div`
  width: 100%; height: 260px; border-radius: 16px; overflow: hidden;
  img { width: 100%; height: 100%; object-fit: cover; display: block; }
`;
const CoveragePanel = styled.div`
  background: #ffffff; border: 1.5px solid #e5e5e3; border-radius: 16px; padding: 22px 24px;
`;
const CoverageHeader = styled.div`
  display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;
  h4 { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 14px; color: #141414; }
`;
const LivePill = styled.span`
  display: inline-flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 600;
  color: #007a35; background: #e8f9ef; border: 1px solid rgba(0,176,80,0.22);
  padding: 3px 10px; border-radius: 100px;
  &::before {
    content: ''; width: 5px; height: 5px; background: #00b050; border-radius: 50%;
    animation: ${pulse} 2s infinite;
  }
`;
const CovRow = styled.div`
  display: flex; align-items: center; justify-content: space-between;
  padding: 9px 0; border-bottom: 1px solid #e5e5e3; font-size: 13px;
  &:last-child { border-bottom: none; padding-bottom: 0; }
`;
const CovCity = styled.span`font-weight: 500; color: #141414;`;
const CovStatus = styled.span`
  display: flex; align-items: center; gap: 5px; font-size: 12px; color: #007a35; font-weight: 500;
  &::before { content: ''; width: 5px; height: 5px; background: #00b050; border-radius: 50%; }
`;

// ── BAND ──────────────────────────────────────────────────────────────────────
const Band = styled.section`
  background: #2d3135; padding: 68px 40px;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  @media (max-width: 760px) { padding: 52px 20px; }
`;
const BandInner = styled.div`
  max-width: 1200px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 2fr; gap: 72px; align-items: center;
  @media (max-width: 1080px) { grid-template-columns: 1fr; gap: 36px; }
`;
const BandIntro = styled.div`
  h2 { font-family: 'Syne', sans-serif; font-weight: 800; font-size: clamp(22px,2.8vw,32px); color: #ffffff; letter-spacing: -0.02em; line-height: 1.12; margin-bottom: 10px; }
  p  { font-size: 14px; color: rgba(255,255,255,0.35); line-height: 1.65; }
`;
const BandLinks = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
  @media (max-width: 760px) { grid-template-columns: 1fr; }
`;
const BandLink = styled(Link)`
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
  padding: 18px 20px; border: 1.5px solid rgba(255,255,255,0.09); border-radius: 14px;
  text-decoration: none; transition: border-color 0.18s, background 0.18s;
  background: rgba(255,255,255,0.02);
  &:hover { border-color: #00b050; background: rgba(0,176,80,0.07); }
`;
const BandLinkText = styled.div`
  display: flex; flex-direction: column; gap: 3px;
`;
const BandLinkLabel = styled.span`
  font-family: 'Syne', sans-serif; font-weight: 600; font-size: 13.5px; color: rgba(255,255,255,0.82);
`;
const BandLinkSub = styled.span`
  font-size: 12px; color: rgba(255,255,255,0.28);
`;

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
    <Hero>
      <HeroLines>
        <svg viewBox="0 0 600 480" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMaxYMid meet">
          <path d="M 600 40 L 480 40 Q 460 40 460 60 L 460 160" stroke="#00b050" strokeWidth="1.5" strokeOpacity="0.3" fill="none"/>
          <path d="M 600 160 L 520 160 Q 500 160 500 180 L 500 280 Q 500 300 480 300 L 380 300" stroke="#00b050" strokeWidth="1.5" strokeOpacity="0.18" fill="none"/>
          <path d="M 600 80 L 550 80" stroke="#00b050" strokeWidth="1.5" strokeOpacity="0.5" fill="none"/>
          <path d="M 600 260 L 540 260 Q 520 260 520 240 L 520 220" stroke="#00b050" strokeWidth="1" strokeOpacity="0.15" fill="none"/>
        </svg>
      </HeroLines>
      <HeroInner>
        <HeroContent>
          <H1>Event Logistics<br />that <em>disappears</em><br />into the background.</H1>
          <HeroSub>From warehouse to stand, bump-in to bump-out — we handle every part of the logistics so you can focus on what matters: the show.</HeroSub>
          <HeroCtas>
            <BtnSolid to="/quote">
              Get a Quote
              <ArrowSvg />
            </BtnSolid>
            <BtnOutline to="/about">About us</BtnOutline>
          </HeroCtas>
        </HeroContent>
        <HeroImgWrap>
          <HeroCircle>
            <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80" alt="Event floor" />
          </HeroCircle>
        </HeroImgWrap>
      </HeroInner>
    </Hero>

    {/* TRUST BAR */}
    <TrustBar>
      <TrustInner>
        <TrustLabel>Covering</TrustLabel>
        <TrustDiv />
        <TrustItems>
          {['Sydney','Melbourne','Brisbane','Adelaide','Perth','Gold Coast','Canberra'].map(city => (
            <TrustPill key={city}><TrustDot />{city}</TrustPill>
          ))}
        </TrustItems>
      </TrustInner>
    </TrustBar>

    {/* WHO WE SERVE */}
    <Paths>
      <PathsGrid>
        <PathCard to="/services/freight">
          <PathTag>For Exhibitors</PathTag>
          <PathTitle>Getting your freight to the show.</PathTitle>
          <PathDesc>From a few boxes and a banner bag to full pallet loads — we move it, track it, and get it to your stand.</PathDesc>
          <PathFeatures>
            <li>Domestic freight, door-to-stand</li>
            <li>International freight — air &amp; sea</li>
            <li>On-site handling services</li>
          </PathFeatures>
          <PathActions>
            <PathBtn to="/quote">
              Get a quote <ArrowSvg />
            </PathBtn>
            <PathMore to="/services/freight">
              Learn more
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/></svg>
            </PathMore>
          </PathActions>
        </PathCard>

        <PathCard to="/services/onsite-logistics">
          <PathTag>For Organisers</PathTag>
          <PathTitle>Running the logistics side of your show.</PathTitle>
          <PathDesc>From dock management and crew to exhibitor freight tracking — we build the operation around your event.</PathDesc>
          <PathFeatures>
            <li>Forklift operators, spotters &amp; site managers</li>
            <li>Dock management &amp; truck scheduling</li>
            <li>Live freight tracking for exhibitors</li>
          </PathFeatures>
          <PathActions>
            <PathBtn to="/quote">
              Request a quote <ArrowSvg />
            </PathBtn>
            <PathMore to="/services/onsite-logistics">
              Learn more
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/></svg>
            </PathMore>
          </PathActions>
        </PathCard>
      </PathsGrid>
    </Paths>

    {/* SERVICES */}
    <Section>
      <SectionInner>
        <Eyebrow>What we do</Eyebrow>
        <SectionH>Everything that moves<br />before, during, and after the show.</SectionH>
        <SectionP>Comprehensive logistics for exhibitions, trade shows, and live events. Whether you need one service or all of them.</SectionP>
        <ServicesGrid>
          <SvcCard to="/services/freight">
            <SvcImg>
              <img src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80" alt="Domestic Freight" />
            </SvcImg>
            <SvcBody>
              <SvcIcon>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/></svg>
              </SvcIcon>
              <SvcTitle>Domestic Freight</SvcTitle>
              <SvcDesc>Door-to-stand delivery for exhibitors across Australia. Boxes, pallets, oversized loads — we move it all.</SvcDesc>
              <SvcLink>Learn more <ArrowSvg /></SvcLink>
            </SvcBody>
          </SvcCard>

          <SvcCard to="/services/international-freight">
            <SvcImg>
              <img src="https://images.unsplash.com/photo-1494961104209-3c223057bd26?w=800&q=80" alt="International Freight" />
            </SvcImg>
            <SvcBody>
              <SvcIcon>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253"/></svg>
              </SvcIcon>
              <SvcTitle>International Freight</SvcTitle>
              <SvcDesc>Air and sea freight, customs clearance, ATA carnets. We handle every step so you don't have to.</SvcDesc>
              <SvcLink>Learn more <ArrowSvg /></SvcLink>
            </SvcBody>
          </SvcCard>

          <SvcCard to="/services/onsite-logistics" $dark>
            <SvcImg>
              <img src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80" alt="On-Site Logistics" style={{ opacity: 0.6 }} />
            </SvcImg>
            <SvcBody>
              <SvcIcon $dark>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"/></svg>
              </SvcIcon>
              <SvcTitle $dark>On-Site Logistics &amp; Management</SvcTitle>
              <SvcDesc $dark>Full show floor management for organisers. Crew, equipment, dock management, and live freight tracking.</SvcDesc>
              <SvcLink $dark>Learn more <ArrowSvg /></SvcLink>
            </SvcBody>
          </SvcCard>
        </ServicesGrid>
      </SectionInner>
    </Section>

    {/* WHY AXIS */}
    <Why>
      <WhyLayout>
        <div>
          <Eyebrow>Why Axis Events</Eyebrow>
          <SectionH>Built by people who've worked the floor.</SectionH>
          <SectionP style={{ marginBottom: 0 }}>We know what it's like because we've done it — loading trucks, managing docks, running shows from the inside. That experience is in everything we do.</SectionP>
          <WhyPoints>
            {[
              { title: 'Reliable',         body: 'We do what we say. If something comes up, we communicate immediately — no surprises.' },
              { title: 'Straight talkers', body: 'No jargon, no layers. You know what\'s happening with your freight and someone always knows your event.' },
              { title: 'Strong relationships', body: 'Years of groundwork with venues, carriers, and warehouses across Australia.' },
              { title: 'Value-driven',     body: 'Lean overheads, competitive supplier partnerships — strong pricing without cutting corners.' },
            ].map(p => (
              <WhyPoint key={p.title}>
                <WhyTick><CheckSvg /></WhyTick>
                <WhyPtBody>
                  <h4>{p.title}</h4>
                  <p>{p.body}</p>
                </WhyPtBody>
              </WhyPoint>
            ))}
          </WhyPoints>
        </div>
        <WhyVisual>
          <WhyImg>
            <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80" alt="Trade show" />
          </WhyImg>
          <CoveragePanel>
            <CoverageHeader>
              <h4>National coverage</h4>
              <LivePill>Active</LivePill>
            </CoverageHeader>
            {[
              { city: 'Sydney',       status: 'Active' },
              { city: 'Melbourne',    status: 'Active' },
              { city: 'Brisbane',     status: 'Active' },
              { city: 'Adelaide',     status: 'Active' },
              { city: 'Perth',        status: 'Active' },
              { city: 'Gold Coast',   status: 'Active' },
            ].map(r => (
              <CovRow key={r.city}>
                <CovCity>{r.city}</CovCity>
                <CovStatus>{r.status}</CovStatus>
              </CovRow>
            ))}
          </CoveragePanel>
        </WhyVisual>
      </WhyLayout>
    </Why>

    {/* BOTTOM BAND */}
    <Band>
      <BandInner>
        <BandIntro>
          <h2>Not sure where<br />to start?</h2>
          <p>Every show is different. Tell us what you need and we'll put the right solution together.</p>
        </BandIntro>
        <BandLinks>
          {[
            { to: '/services/freight',              label: 'Domestic Freight',         sub: 'Door-to-stand, Australia-wide' },
            { to: '/services/international-freight', label: 'International Freight',    sub: 'Air, sea & customs clearance' },
            { to: '/services/site-services',         label: 'On-Site Services',         sub: 'Porters, unboxing & pack-down' },
            { to: '/services/onsite-logistics',      label: 'Organiser Logistics',      sub: 'Full show floor management' },
          ].map(l => (
            <BandLink key={l.to} to={l.to}>
              <BandLinkText>
                <BandLinkLabel>{l.label}</BandLinkLabel>
                <BandLinkSub>{l.sub}</BandLinkSub>
              </BandLinkText>
              <ArrowSvg />
            </BandLink>
          ))}
        </BandLinks>
      </BandInner>
    </Band>
  </>
);

export default HomePage;
