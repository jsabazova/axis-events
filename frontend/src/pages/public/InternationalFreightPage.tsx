import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PageHero = styled.section`
  background: #1a1c1e; position: relative; overflow: hidden; padding-top: 64px;
  &::before {
    content: ''; position: absolute; inset: 0;
    background-image: radial-gradient(circle, rgba(0,176,80,0.055) 1px, transparent 1px);
    background-size: 36px 36px; pointer-events: none;
  }
  &::after {
    content: ''; position: absolute; top: -80px; right: -120px; width: 520px; height: 520px;
    background: radial-gradient(ellipse at center, rgba(0,176,80,0.08) 0%, transparent 70%);
    pointer-events: none;
  }
`;
const HeroInner = styled.div`
  max-width: 780px; margin: 0 auto; padding: 80px 40px 88px;
  position: relative; z-index: 2;
  @media (max-width: 900px) { padding: 48px 20px 60px; }
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
  font-size: clamp(32px, 4vw, 54px); line-height: 1.04;
  color: #fff; letter-spacing: -0.03em; margin-bottom: 22px;
  em { font-style: normal; color: #00b050; }
`;
const HeroSub = styled.p`
  font-size: 16px; line-height: 1.75; color: rgba(255,255,255,0.42); max-width: 560px; margin-bottom: 36px;
`;
const HeroBtns = styled.div`display: flex; gap: 12px; flex-wrap: wrap;`;
const BtnSolid = styled(Link)`
  display: inline-flex; align-items: center; gap: 7px;
  font-size: 14px; font-weight: 600; color: #1a1c1e;
  background: #00b050; border: 1.5px solid #00b050;
  padding: 12px 24px; border-radius: 9px; text-decoration: none; transition: background 0.18s;
  &:hover { background: #00c45a; border-color: #00c45a; }
`;
const BtnGhost = styled(Link)`
  display: inline-flex; align-items: center; gap: 7px;
  font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.55);
  background: transparent; border: 1.5px solid rgba(255,255,255,0.1);
  padding: 12px 24px; border-radius: 9px; text-decoration: none;
  transition: border-color 0.18s, color 0.18s;
  &:hover { border-color: rgba(255,255,255,0.28); color: #fff; }
`;

/* Honest strip */
const HonestStrip = styled.section`
  background: #222527;
  border-top: 1px solid rgba(255,255,255,0.05);
  border-bottom: 1px solid rgba(255,255,255,0.05);
  padding: 52px 40px;
  @media (max-width: 900px) { padding: 40px 20px; }
`;
const HonestInner = styled.div`
  max-width: 1200px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;
  @media (max-width: 900px) { grid-template-columns: 1fr; gap: 32px; }
`;
const HonestText = styled.div`
  h3 { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 18px; color: rgba(255,255,255,0.85); margin-bottom: 12px; line-height: 1.3; }
  p { font-size: 14px; line-height: 1.75; color: rgba(255,255,255,0.38); }
`;
const HonestPoints = styled.div`display: flex; flex-direction: column; gap: 0;`;
const HonestPoint = styled.div`
  display: flex; align-items: flex-start; gap: 12px;
  padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.05);
  &:last-child { border-bottom: none; }
`;
const HpDot = styled.span`width: 5px; height: 5px; background: #00b050; border-radius: 50%; flex-shrink: 0; margin-top: 6px; opacity: 0.7;`;
const HpText = styled.span`font-size: 13.5px; color: rgba(255,255,255,0.45); line-height: 1.6;`;

/* Shared */
const SectionWhite = styled.section`
  background: #fff; padding: 88px 40px;
  @media (max-width: 900px) { padding: 60px 20px; }
`;
const SectionGrey = styled.section`
  background: #f5f5f3; border-top: 1.5px solid #e5e5e3; border-bottom: 1.5px solid #e5e5e3;
  padding: 88px 40px;
  @media (max-width: 900px) { padding: 60px 20px; }
`;
const Inner = styled.div`max-width: 1200px; margin: 0 auto;`;
const Eyebrow = styled.span`
  display: inline-block; font-size: 11px; font-weight: 600;
  letter-spacing: 0.12em; text-transform: uppercase; color: #007a35; margin-bottom: 12px;
`;
const SectionH = styled.h2`
  font-family: 'Syne', sans-serif; font-weight: 800;
  font-size: clamp(26px, 2.8vw, 38px); letter-spacing: -0.022em;
  line-height: 1.1; color: #141414; margin-bottom: 16px;
`;
const SectionSub = styled.p`font-size: 15.5px; line-height: 1.75; color: #6b7280; max-width: 580px;`;

/* Mode cards */
const ModeGrid = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 48px;
  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;
const ModeCardLight = styled.div`
  background: #fff; border: 1.5px solid #e5e5e3;
  border-radius: 18px; padding: 40px 36px; position: relative; overflow: hidden;
`;
const ModeCardDark = styled.div`
  background: #1f2123; border: 1.5px solid rgba(255,255,255,0.06);
  border-radius: 18px; padding: 40px 36px; position: relative; overflow: hidden;
  &::after {
    content: ''; position: absolute; bottom: -30px; right: -30px;
    width: 200px; height: 200px;
    background: radial-gradient(circle, rgba(0,176,80,0.1) 0%, transparent 70%);
    pointer-events: none;
  }
`;
const ModeLabel = styled.div<{ dark?: boolean }>`
  display: inline-flex; align-items: center; gap: 7px;
  font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
  margin-bottom: 18px;
  color: ${p => p.dark ? '#00b050' : '#007a35'};
`;
const ModeDot = styled.span`width: 5px; height: 5px; background: #00b050; border-radius: 50%;`;
const ModeH3Light = styled.h3`font-family: 'Syne', sans-serif; font-weight: 700; font-size: 22px; line-height: 1.2; letter-spacing: -0.01em; margin-bottom: 12px; color: #141414;`;
const ModeH3Dark = styled.h3`font-family: 'Syne', sans-serif; font-weight: 700; font-size: 22px; line-height: 1.2; letter-spacing: -0.01em; margin-bottom: 12px; color: #fff;`;
const ModePLight = styled.p`font-size: 14.5px; line-height: 1.75; margin-bottom: 28px; color: #6b7280;`;
const ModePDark = styled.p`font-size: 14.5px; line-height: 1.75; margin-bottom: 28px; color: rgba(255,255,255,0.38);`;
const ModeRowsLight = styled.div`border-top: 1px solid #e5e5e3;`;
const ModeRowsDark = styled.div`border-top: 1px solid rgba(255,255,255,0.07);`;
const ModeRowLight = styled.div`
  display: flex; align-items: flex-start; gap: 10px; padding: 13px 0;
  border-bottom: 1px solid #e5e5e3; &:last-child { border-bottom: none; }
`;
const ModeRowDark = styled.div`
  display: flex; align-items: flex-start; gap: 10px; padding: 13px 0;
  border-bottom: 1px solid rgba(255,255,255,0.05); &:last-child { border-bottom: none; }
`;
const MrDot = styled.span`width: 5px; height: 5px; background: #00b050; border-radius: 50%; flex-shrink: 0; margin-top: 6px;`;
const MrTextLight = styled.span`font-size: 13.5px; line-height: 1.55; color: #6b7280; strong { font-weight: 600; color: #141414; }`;
const MrTextDark = styled.span`font-size: 13.5px; line-height: 1.55; color: rgba(255,255,255,0.38); strong { font-weight: 600; color: rgba(255,255,255,0.75); }`;

/* Manage rows */
const ManageRows = styled.div`border-top: 1.5px solid #e5e5e3; margin-top: 48px;`;
const ManageRow = styled.div`
  display: grid; grid-template-columns: 200px 1fr auto; gap: 32px;
  padding: 20px 0; border-bottom: 1.5px solid #e5e5e3; align-items: start;
  @media (max-width: 900px) { grid-template-columns: 160px 1fr; }
  @media (max-width: 600px) { grid-template-columns: 1fr; gap: 6px; }
`;
const MrLabel = styled.div`display: flex; align-items: flex-start; gap: 8px; padding-top: 2px;`;
const MrlDot = styled.span`width: 6px; height: 6px; background: #00b050; border-radius: 50%; flex-shrink: 0; margin-top: 4px;`;
const MrlName = styled.span`font-family: 'Syne', sans-serif; font-weight: 700; font-size: 13px; color: #141414; line-height: 1.35;`;
const MrDesc = styled.p`font-size: 13.5px; line-height: 1.68; color: #6b7280;`;
const MrNum = styled.span`
  font-family: 'Syne', sans-serif; font-weight: 800; font-size: 11px;
  color: #e5e5e3; letter-spacing: 0.05em; padding-top: 3px; white-space: nowrap;
  @media (max-width: 900px) { display: none; }
`;

/* Approach */
const ApproachLayout = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start;
  @media (max-width: 900px) { grid-template-columns: 1fr; gap: 40px; }
`;
const ApproachLeft = styled.div`
  display: flex; flex-direction: column; gap: 20px;
  p { font-size: 15.5px; line-height: 1.78; color: #6b7280; }
  p.lead { font-size: 17px; line-height: 1.7; color: #141414; font-weight: 500; }
  p strong { color: #141414; font-weight: 600; }
`;
const ApproachRight = styled.div`display: flex; flex-direction: column; gap: 24px;`;
const ApproachPoint = styled.div`display: flex; align-items: flex-start; gap: 16px;`;
const ApNum = styled.span`font-family: 'Syne', sans-serif; font-weight: 800; font-size: 11px; color: #00b050; letter-spacing: 0.08em; padding-top: 3px; flex-shrink: 0; min-width: 22px;`;
const ApBody = styled.div`
  h4 { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 14px; color: #141414; margin-bottom: 5px; }
  p { font-size: 13.5px; line-height: 1.65; color: #6b7280; }
`;

/* CTA */
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
  h2 { font-family: 'Syne', sans-serif; font-weight: 800; font-size: clamp(22px, 2.8vw, 34px); color: #fff; letter-spacing: -0.02em; margin-bottom: 10px; }
  p { font-size: 15px; color: rgba(255,255,255,0.38); line-height: 1.65; max-width: 460px; }
`;
const CtaBtns = styled.div`display: flex; gap: 12px; flex-shrink: 0; flex-wrap: wrap;`;

const InternationalFreightPage: React.FC = () => (
  <>
    <PageHero>
      <HeroInner>
        <HeroTag>International Freight</HeroTag>
        <H1>Your freight.<br />Any country.<br /><em>We'll sort it.</em></H1>
        <HeroSub>We handle international freight for exhibitors and event organisers — air and sea, inbound and outbound. Customs, documentation, coordination with overseas agents. It's complex, but that's our job. Just get in touch and we'll take it from there.</HeroSub>
        <HeroBtns>
          <BtnSolid to="/contact">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width={15} height={15}><path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"/></svg>
            Get in Touch
          </BtnSolid>
          <BtnGhost to="/services/freight">Domestic Freight</BtnGhost>
        </HeroBtns>
      </HeroInner>
    </PageHero>

    <HonestStrip>
      <HonestInner>
        <HonestText>
          <h3>International freight isn't a form.<br />It's a conversation.</h3>
          <p>Every international shipment is different — different countries, different customs rules, different timelines, different carriers. There's no one-size-fits-all process here. So rather than making you fill out a complex form, we'd rather you just contact us, tell us what you're moving and where, and we'll come back with exactly what you need.</p>
        </HonestText>
        <HonestPoints>
          {[
            'Every country has different import and customs requirements — we navigate them for you',
            'Timelines vary significantly between air and sea — we help you plan around show dates',
            'Temporary importation, carnets, and permits are standard for us — not exceptions',
            'We work with a network of international agents to handle the on-the-ground side wherever your show is',
          ].map(t => (
            <HonestPoint key={t}><HpDot /><HpText>{t}</HpText></HonestPoint>
          ))}
        </HonestPoints>
      </HonestInner>
    </HonestStrip>

    <SectionWhite>
      <Inner>
        <Eyebrow>How we move it</Eyebrow>
        <SectionH>Air freight or sea freight —<br />we handle both</SectionH>
        <ModeGrid>
          <ModeCardLight>
            <ModeLabel><ModeDot />Air Freight</ModeLabel>
            <ModeH3Light>Fast. When timing is everything.</ModeH3Light>
            <ModePLight>Air freight is the right call when your show is close, your freight is time-sensitive, or you simply can't afford the risk of a longer transit. We coordinate with airlines and freight handlers globally to get your materials where they need to be.</ModePLight>
            <ModeRowsLight>
              {[
                <><strong>Express and standard air options</strong> — matched to your show dates and budget</>,
                <><strong>Customs clearance</strong> at origin and destination, managed end-to-end</>,
                <><strong>Sensitive and high-value cargo</strong> handled with appropriate care and documentation</>,
                <><strong>Inbound to Australia</strong> or outbound — we work both directions</>,
              ].map((t, i) => (
                <ModeRowLight key={i}><MrDot /><MrTextLight>{t}</MrTextLight></ModeRowLight>
              ))}
            </ModeRowsLight>
          </ModeCardLight>
          <ModeCardDark>
            <ModeLabel dark><ModeDot />Sea Freight</ModeLabel>
            <ModeH3Dark>Cost-effective for larger loads.</ModeH3Dark>
            <ModePDark>When you have more time and more volume, sea freight is often the smarter choice. Full container or shared — we coordinate the booking, documentation, and delivery at both ends through our international agent network.</ModePDark>
            <ModeRowsDark>
              {[
                <><strong>FCL (Full Container Load)</strong> for larger or dedicated shipments</>,
                <><strong>LCL (Less Than Container Load)</strong> when you don't need the whole box</>,
                <><strong>Ro/Ro and breakbulk</strong> for oversized, wheeled, or non-standard cargo</>,
                <><strong>Full documentation</strong> — bills of lading, packing lists, customs paperwork handled</>,
              ].map((t, i) => (
                <ModeRowDark key={i}><MrDot /><MrTextDark>{t}</MrTextDark></ModeRowDark>
              ))}
            </ModeRowsDark>
          </ModeCardDark>
        </ModeGrid>
      </Inner>
    </SectionWhite>

    <SectionGrey>
      <Inner>
        <div style={{ maxWidth: 560 }}>
          <Eyebrow>What we manage</Eyebrow>
          <SectionH>The paperwork, the compliance,<br />the coordination</SectionH>
          <SectionSub>International freight involves a lot of moving parts beyond the transport itself. Here's what we take off your plate.</SectionSub>
        </div>
        <ManageRows>
          {[
            { num: '01', name: 'Customs clearance', desc: 'Import and export customs at both ends — declarations, duties, compliance with local regulations. We handle this as standard, not as an add-on.' },
            { num: '02', name: 'ATA Carnets', desc: 'Temporary importation for goods that will be returned after the show — display items, equipment, samples. We coordinate carnet documentation and ensure everything is returned correctly.' },
            { num: '03', name: 'Shipping documentation', desc: 'Bills of lading, airway bills, commercial invoices, packing lists, certificates of origin — all prepared and verified before freight moves.' },
            { num: '04', name: 'International agent network', desc: 'We work with trusted freight agents in key markets worldwide. They handle the local side — we handle your side. One point of contact for the whole journey.' },
            { num: '05', name: 'Freight insurance', desc: 'General coverage included. Additional insurance available for high-value, fragile, or sensitive items — declare at the time of booking and we\'ll arrange it.' },
            { num: '06', name: 'Return freight', desc: 'We coordinate the outbound and the return. After the show, freight is collected and shipped back — or held if needed for the next event.' },
          ].map(r => (
            <ManageRow key={r.num}>
              <MrLabel><MrlDot /><MrlName>{r.name}</MrlName></MrLabel>
              <MrDesc>{r.desc}</MrDesc>
              <MrNum>{r.num}</MrNum>
            </ManageRow>
          ))}
        </ManageRows>
      </Inner>
    </SectionGrey>

    <SectionWhite>
      <Inner>
        <ApproachLayout>
          <ApproachLeft>
            <Eyebrow>How we work</Eyebrow>
            <SectionH>Event freight specialists, not general forwarders</SectionH>
            <p className="lead">There's a meaningful difference between a general freight forwarder and someone who specialises in events and exhibitions.</p>
            <p>General forwarders move boxes. We move exhibition freight — which means we understand tight bump-in windows, venue receiving requirements, temporary importation, and what it means when something goes wrong the day before a show opens.</p>
            <p>We've built our international operation around event timelines, not standard transit schedules. And because we handle the domestic side too, we can manage the full journey — from overseas origin to your stand — without handing off to someone who doesn't know the show.</p>
          </ApproachLeft>
          <ApproachRight>
            {[
              { n: '01', h: 'You tell us what you need', p: 'Origin, destination, what you\'re shipping, how much, and when the show is. That\'s all we need to start working on a plan.' },
              { n: '02', h: 'We come back with a plan', p: 'Air or sea recommendation, timeline, documentation requirements, customs considerations — laid out clearly so you know exactly what\'s happening.' },
              { n: '03', h: 'We manage the whole thing', p: 'Booking, collection, paperwork, agent coordination, customs clearance, delivery to venue. You stay informed — we handle the complexity.' },
              { n: '04', h: 'And we bring it home', p: 'Return freight coordinated the same way. Carnet goods returned correctly. Nothing left behind, nothing left to chance.' },
            ].map(p => (
              <ApproachPoint key={p.n}>
                <ApNum>{p.n}</ApNum>
                <ApBody><h4>{p.h}</h4><p>{p.p}</p></ApBody>
              </ApproachPoint>
            ))}
          </ApproachRight>
        </ApproachLayout>
      </Inner>
    </SectionWhite>

    <CtaSection>
      <CtaInner>
        <CtaText>
          <h2>Moving freight internationally?<br />Let's talk.</h2>
          <p>Tell us where it's going, what you're shipping, and when the show is. We'll take it from there.</p>
        </CtaText>
        <CtaBtns>
          <BtnSolid to="/contact">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width={15} height={15}><path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"/></svg>
            Get in Touch
          </BtnSolid>
          <BtnGhost to="/services/freight">Domestic Freight</BtnGhost>
        </CtaBtns>
      </CtaInner>
    </CtaSection>
  </>
);

export default InternationalFreightPage;
