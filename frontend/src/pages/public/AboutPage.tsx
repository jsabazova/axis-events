import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const fadeUp = keyframes`from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}`;

const Eyebrow = styled.span`
  display:inline-block;font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#007a35;margin-bottom:12px;
`;
const SectionH = styled.h2`
  font-family:'Syne',sans-serif;font-weight:800;font-size:clamp(26px,2.8vw,38px);letter-spacing:-.022em;line-height:1.1;color:#141414;margin-bottom:16px;
`;
const Section = styled.section<{$bg?:string;$bordered?:boolean}>`
  padding:88px 40px;background:${p=>p.$bg||'#ffffff'};
  ${p=>p.$bordered?'border-top:1.5px solid #e5e5e3;border-bottom:1.5px solid #e5e5e3;':''}
  @media(max-width:760px){padding:60px 20px}
`;
const Inner = styled.div`max-width:1200px;margin:0 auto;`;

// HERO
const PageHero = styled.section`
  background:#1a1c1e;position:relative;overflow:hidden;padding-top:64px;
  &::before{content:'';position:absolute;inset:0;background-image:radial-gradient(circle,rgba(0,176,80,.055) 1px,transparent 1px);background-size:36px 36px;pointer-events:none}
  &::after{content:'';position:absolute;top:-80px;right:-120px;width:520px;height:520px;background:radial-gradient(ellipse at center,rgba(0,176,80,.08) 0%,transparent 70%);pointer-events:none}
`;
const HeroLines = styled.div`
  position:absolute;top:0;right:0;width:55%;height:100%;pointer-events:none;overflow:hidden;
  svg{position:absolute;top:0;right:0;width:100%;height:100%}
`;
const HeroInner = styled.div`
  max-width:1200px;margin:0 auto;padding:72px 40px 80px;position:relative;z-index:2;
  display:grid;grid-template-columns:1fr 360px;gap:60px;align-items:center;
  @media(max-width:1080px){grid-template-columns:1fr}
  @media(max-width:760px){padding:48px 20px 56px}
`;
const HeroTag = styled.div`
  display:inline-flex;align-items:center;gap:6px;font-size:10.5px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:#00b050;background:rgba(0,176,80,.12);border:1px solid rgba(0,176,80,.25);padding:4px 12px;border-radius:100px;margin-bottom:22px;
  &::before{content:'';width:5px;height:5px;background:#00b050;border-radius:50%}
`;
const H1 = styled.h1`
  font-family:'Syne',sans-serif;font-weight:800;font-size:clamp(32px,4vw,52px);line-height:1.04;color:#fff;letter-spacing:-.03em;margin-bottom:22px;
  animation:${fadeUp} .55s ease both;animation-delay:.14s;
  em{font-style:normal;color:#00b050}
`;
const HeroSub = styled.p`font-size:15.5px;line-height:1.75;color:rgba(255,255,255,.42);max-width:500px;margin-bottom:32px;animation:${fadeUp} .55s ease both;animation-delay:.24s;`;
const HeroTagline = styled.div`
  display:inline-flex;align-items:center;gap:10px;font-size:12.5px;font-weight:500;color:rgba(255,255,255,.26);letter-spacing:.02em;animation:${fadeUp} .55s ease both;animation-delay:.34s;
  &::before{content:'';width:28px;height:1px;background:#00b050;opacity:.55;flex-shrink:0}
`;
const HeroCircle = styled.div`
  width:300px;height:300px;border-radius:50%;overflow:hidden;flex-shrink:0;border:3px solid #111;outline:2px solid rgba(0,176,80,.3);outline-offset:7px;box-shadow:0 0 0 22px rgba(0,176,80,.04),0 32px 80px rgba(0,0,0,.5);
  img{width:100%;height:100%;object-fit:cover;display:block}
  @media(max-width:1080px){display:none}
`;

// WHO WE ARE
const WhoGrid = styled.div`
  display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start;
  @media(max-width:1080px){grid-template-columns:1fr;gap:44px}
`;
const IntroBody = styled.div`
  display:flex;flex-direction:column;gap:20px;
  p{font-size:15.5px;line-height:1.78;color:#6b7280;margin:0}
  p strong{color:#141414;font-weight:600}
`;
const LeadP = styled.p`font-size:17px!important;line-height:1.7!important;color:#141414!important;font-weight:500!important;`;
const IntroVisual = styled.div`display:flex;flex-direction:column;gap:16px;`;
const IntroImg = styled.div`width:100%;height:320px;border-radius:16px;overflow:hidden;img{width:100%;height:100%;object-fit:cover;display:block}`;
const IntroQuote = styled.div`
  background:#1a1c1e;border-radius:14px;padding:26px 28px;position:relative;overflow:hidden;
  &::before{content:'"';position:absolute;top:-10px;left:16px;font-family:'Syne',sans-serif;font-size:88px;color:#00b050;opacity:.14;line-height:1;pointer-events:none}
  p{font-size:14px;line-height:1.72;color:rgba(255,255,255,.5);font-style:italic;position:relative;z-index:1;margin:0}
`;

// MISSION & VISION
const MvGrid = styled.div`
  display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:48px;
  @media(max-width:1080px){grid-template-columns:1fr}
`;
const MvCard = styled.div<{$dark?:boolean}>`
  border-radius:18px;padding:40px 36px;position:relative;overflow:hidden;
  background:${p=>p.$dark?'#1f2123':'#ffffff'};
  border:1.5px solid ${p=>p.$dark?'rgba(255,255,255,.06)':'#e5e5e3'};
`;
const MvLabel = styled.div<{$dark?:boolean}>`
  display:inline-flex;align-items:center;gap:7px;font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;margin-bottom:18px;
  color:${p=>p.$dark?'#00b050':'#007a35'};
  &::before{content:'';width:5px;height:5px;background:#00b050;border-radius:50%}
`;
const MvTitle = styled.h3<{$dark?:boolean}>`
  font-family:'Syne',sans-serif;font-weight:700;font-size:19px;line-height:1.3;letter-spacing:-.01em;margin-bottom:14px;
  color:${p=>p.$dark?'#ffffff':'#141414'};
`;
const MvBody = styled.p<{$dark?:boolean}>`
  font-size:14.5px;line-height:1.75;color:${p=>p.$dark?'rgba(255,255,255,.38)':'#6b7280'};margin:0;
`;

// VALUES
const ValuesList = styled.div`margin-top:48px;border-top:1.5px solid #e5e5e3;`;
const ValueRow = styled.div`
  display:grid;grid-template-columns:200px 1fr auto;gap:32px;padding:22px 0;border-bottom:1.5px solid #e5e5e3;align-items:start;
  @media(max-width:760px){grid-template-columns:1fr;gap:6px}
`;
const ValueLabel = styled.div`
  display:flex;align-items:center;gap:8px;padding-top:2px;
  &::before{content:'';width:6px;height:6px;background:#00b050;border-radius:50%;flex-shrink:0}
  strong{font-family:'Syne',sans-serif;font-weight:700;font-size:13px;color:#141414;white-space:nowrap}
`;
const ValueDesc = styled.p`font-size:14.5px;line-height:1.72;color:#6b7280;margin:0;`;
const ValueNum = styled.span`
  font-family:'Syne',sans-serif;font-weight:800;font-size:11px;color:#e5e5e3;letter-spacing:.05em;padding-top:3px;
  @media(max-width:760px){display:none}
`;

// APART
const ApartLayout = styled.div`
  display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start;
  @media(max-width:1080px){grid-template-columns:1fr;gap:44px}
`;
const ApartImg = styled.div`
  width:100%;height:420px;border-radius:18px;overflow:hidden;position:relative;
  img{width:100%;height:100%;object-fit:cover;display:block}
  &::after{content:'';position:absolute;inset:0;border-radius:18px;border:2px solid rgba(0,176,80,.18);pointer-events:none}
`;
const ApartBody = styled.div`display:flex;flex-direction:column;gap:28px;`;
const ApartPoints = styled.div`display:flex;flex-direction:column;gap:14px;`;
const ApartPoint = styled.div`display:flex;align-items:flex-start;gap:12px;`;
const ApCheck = styled.div`
  width:20px;height:20px;background:#e8f9ef;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px;
  svg{width:10px;height:10px;color:#007a35}
`;

// TEAM
const TeamGrid = styled.div`
  display:grid;grid-template-columns:repeat(5,1fr);gap:20px;margin-top:44px;
  @media(max-width:1080px){grid-template-columns:repeat(3,1fr)}
  @media(max-width:760px){grid-template-columns:repeat(2,1fr)}
`;
const TeamCard = styled.div`
  display:flex;flex-direction:column;align-items:center;text-align:center;gap:10px;padding:24px 12px;border-radius:14px;border:1.5px solid #e5e5e3;background:#fff;transition:border-color .2s,box-shadow .2s;
  &:hover{border-color:rgba(0,176,80,.22);box-shadow:0 6px 24px rgba(0,0,0,.06)}
`;
const TeamAvatar = styled.div`
  width:64px;height:64px;border-radius:50%;background:#1a1c1e;display:flex;align-items:center;justify-content:center;flex-shrink:0;
  svg{width:30px;height:30px;color:rgba(255,255,255,.15)}
`;

// TRACKING
const TrackSection = styled.section`
  background:#1a1c1e;padding:88px 40px;position:relative;overflow:hidden;border-top:1px solid rgba(255,255,255,.05);
  &::before{content:'';position:absolute;inset:0;background-image:radial-gradient(circle,rgba(0,176,80,.045) 1px,transparent 1px);background-size:32px 32px;pointer-events:none}
  &::after{content:'';position:absolute;top:-60px;right:-60px;width:400px;height:400px;background:radial-gradient(circle,rgba(0,176,80,.09) 0%,transparent 70%);pointer-events:none}
  @media(max-width:760px){padding:60px 20px}
`;
const TrackInner = styled.div`max-width:1200px;margin:0 auto;position:relative;z-index:1;`;
const TrackHeader = styled.div`display:flex;align-items:flex-start;justify-content:space-between;gap:40px;margin-bottom:40px;@media(max-width:900px){flex-direction:column;gap:16px}`;
const TrackBadge = styled.span`
  display:inline-flex;align-items:center;gap:6px;font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#00b050;background:rgba(0,176,80,.12);border:1px solid rgba(0,176,80,.25);padding:4px 10px;border-radius:100px;white-space:nowrap;flex-shrink:0;margin-top:6px;
  &::before{content:'';width:5px;height:5px;background:#00b050;border-radius:50%}
`;
const TrackPills = styled.div`
  display:grid;grid-template-columns:repeat(4,1fr);gap:12px;
  @media(max-width:900px){grid-template-columns:repeat(2,1fr)}
`;
const TrackPill = styled.div`
  background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:12px;padding:22px 20px;transition:border-color .2s;
  &:hover{border-color:rgba(0,176,80,.25)}
  strong{display:block;font-family:'Syne',sans-serif;font-weight:700;font-size:13px;color:rgba(255,255,255,.82);margin-bottom:6px}
  span{font-size:13px;color:rgba(255,255,255,.3);line-height:1.5}
`;

// CTA
const CtaSection = styled.section`
  background:#1a1c1e;padding:80px 40px;position:relative;overflow:hidden;
  &::before{content:'';position:absolute;inset:0;background-image:radial-gradient(circle,rgba(0,176,80,.055) 1px,transparent 1px);background-size:32px 32px;pointer-events:none}
  @media(max-width:760px){padding:60px 20px}
`;
const CtaInner = styled.div`
  max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:40px;position:relative;z-index:1;
  @media(max-width:900px){flex-direction:column;align-items:flex-start}
`;
const BtnSolid = styled(Link)`
  display:inline-flex;align-items:center;gap:7px;font-size:14px;font-weight:600;color:#1a1c1e;background:#00b050;border:1.5px solid #00b050;padding:12px 24px;border-radius:9px;text-decoration:none;white-space:nowrap;transition:background .18s;
  &:hover{background:#00c45a;border-color:#00c45a}
`;
const BtnGhost = styled(Link)`
  display:inline-flex;align-items:center;gap:7px;font-size:14px;font-weight:600;color:rgba(255,255,255,.55);background:transparent;border:1.5px solid rgba(255,255,255,.1);padding:12px 24px;border-radius:9px;text-decoration:none;white-space:nowrap;transition:border-color .18s,color .18s;
  &:hover{border-color:rgba(255,255,255,.28);color:#fff}
`;

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

const PersonIcon = ()=>(
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>
  </svg>
);
const CheckIcon = ()=>(
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
  </svg>
);

const AboutPage: React.FC = () => (
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
        <div>
          <HeroTag>About Axis Events</HeroTag>
          <H1>Built around the<br />demands of<br /><em>live events.</em></H1>
          <HeroSub>We started at the bottom — long days loading trucks, managing docks, learning the deep intricacies of the events world from the inside. That's what Axis Events is built on.</HeroSub>
          <HeroTagline>Your Trusted Partner in Event Logistics</HeroTagline>
        </div>
        <HeroCircle>
          <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80" alt="Axis Events team" />
        </HeroCircle>
      </HeroInner>
    </PageHero>

    {/* WHO WE ARE */}
    <Section>
      <Inner>
        <WhoGrid>
          <IntroBody>
            <Eyebrow>Who we are</Eyebrow>
            <SectionH>We know what it takes to run a live event.</SectionH>
            <LeadP>Axis Events was founded by people who started at the bottom — spending long, gruelling days loading trucks, managing docks, and learning the deep intricacies and special requirements of the events world.</LeadP>
            <p>From an individual freight booking for a single exhibitor to full site management for an entire show — we provide exactly the support the event requires. No more, no less.</p>
            <p>We've built strong working relationships with venues, carriers, and suppliers across Australia. That groundwork means fewer complications, quicker problem-solving, and smoother delivery on every job.</p>
            <p><strong>We do whatever it takes to get a successful show across the line for our clients.</strong></p>
            <p>We also keep our overheads lean — operating remotely where we can, maintaining competitive supplier partnerships — so our pricing reflects that without compromising on quality or service.</p>
          </IntroBody>
          <IntroVisual>
            <IntroImg><img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80" alt="Trade show floor" /></IntroImg>
            <IntroQuote><p>We don't just show up — we take pride in the work, build strong relationships, and keep things running smoothly. In a live, fast-changing environment, we stay agile and solve problems as they happen.</p></IntroQuote>
          </IntroVisual>
        </WhoGrid>
      </Inner>
    </Section>

    {/* MISSION & VISION */}
    <Section $bg="#f5f5f3" $bordered>
      <Inner>
        <Eyebrow>What drives us</Eyebrow>
        <SectionH>Our mission &amp; vision</SectionH>
        <MvGrid>
          <MvCard>
            <MvLabel>Mission</MvLabel>
            <MvTitle>Make logistics invisible — so organisers and exhibitors can focus on the event.</MvTitle>
            <MvBody>We provide reliable, professional logistics and site management tailored for exhibitions, trade shows, and events across Australia. Through clear communication, efficient operations, and practical technology, we deliver cost-effective solutions and a smoother, more transparent experience for everyone involved.</MvBody>
          </MvCard>
          <MvCard $dark>
            <MvLabel $dark>Vision</MvLabel>
            <MvTitle $dark>Australia's leading force in event logistics — on every major show floor.</MvTitle>
            <MvBody $dark>We're building toward a recognised position as the go-to partner for event freight and site services across Australia — known for our technology, our professionalism, and a friendly, capable presence on every site we touch.</MvBody>
          </MvCard>
        </MvGrid>
      </Inner>
    </Section>

    {/* CORE VALUES */}
    <Section>
      <Inner>
        <Eyebrow>Core values</Eyebrow>
        <SectionH>How we show up,<br />every time.</SectionH>
        <ValuesList>
          {values.map(v=>(
            <ValueRow key={v.num}>
              <ValueLabel><strong>{v.label}</strong></ValueLabel>
              <ValueDesc>{v.desc}</ValueDesc>
              <ValueNum>{v.num}</ValueNum>
            </ValueRow>
          ))}
        </ValuesList>
      </Inner>
    </Section>

    {/* WHAT SETS US APART */}
    <Section $bg="#f5f5f3" $bordered>
      <Inner>
        <ApartLayout>
          <ApartImg><img src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80" alt="On-site logistics" /></ApartImg>
          <ApartBody>
            <Eyebrow>What sets us apart</Eyebrow>
            <SectionH>Logistics that disappears into the background.</SectionH>
            <p style={{fontSize:'15.5px',lineHeight:1.78,color:'#6b7280',margin:0}}>Our goal is simple — make logistics invisible. No chaos, no chasing, no wondering where things are. Just confidence that everything is moving, on time, in order.</p>
            <ApartPoints>
              {[
                {strong:'Any size, any role.',body:"Individual freight for an exhibitor or full site operations for an organiser — we run it so you don't have to think about it."},
                {strong:'Experienced crew, above-rate pay.',body:'We handpick capable people and pay above standard — so the quality shows on site.'},
                {strong:'Straight communication.',body:"No fluff, no layers. You know what's happening with your freight — and someone always knows your event."},
                {strong:'Strong supplier and venue relationships.',body:'Years of groundwork with carriers, warehouses, and venues across Australia — fewer complications, faster resolution.'},
              ].map(p=>(
                <ApartPoint key={p.strong}>
                  <ApCheck><CheckIcon /></ApCheck>
                  <p style={{fontSize:'14.5px',lineHeight:1.65,color:'#6b7280',margin:0}}><strong style={{color:'#141414',fontWeight:600}}>{p.strong}</strong> {p.body}</p>
                </ApartPoint>
              ))}
            </ApartPoints>
          </ApartBody>
        </ApartLayout>
      </Inner>
    </Section>

    {/* TEAM */}
    <Section>
      <Inner>
        <Eyebrow>The team</Eyebrow>
        <SectionH>The people behind it.</SectionH>
        <TeamGrid>
          {team.map(t=>(
            <TeamCard key={t.name}>
              <TeamAvatar><PersonIcon /></TeamAvatar>
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:'12.5px',color:'#141414',lineHeight:1.3}}>{t.name}</div>
              <div style={{fontSize:'11px',color:'#a0a0a0',textTransform:'uppercase',letterSpacing:'.08em',fontWeight:600}}>{t.role}</div>
            </TeamCard>
          ))}
        </TeamGrid>
      </Inner>
    </Section>

    {/* TRACKING */}
    <TrackSection>
      <TrackInner>
        <TrackHeader>
          <div>
            <Eyebrow style={{color:'#00b050'}}>Freight visibility</Eyebrow>
            <h2 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:'clamp(24px,2.8vw,36px)',color:'#fff',letterSpacing:'-.025em',lineHeight:1.08,marginBottom:14}}>Every delivery. Tracked.<br />Confirmed. Visible.</h2>
            <p style={{fontSize:'15.5px',lineHeight:1.72,color:'rgba(255,255,255,.4)',maxWidth:560,margin:0}}>Every item that comes through — couriers, pallets, signage, boxes — is logged and itemised. Exhibitors get photo confirmations and automatic alerts on delivery to stand. Organisers get live admin access to all activity.</p>
          </div>
          <TrackBadge>Live now</TrackBadge>
        </TrackHeader>
        <TrackPills>
          {[
            {strong:'Live delivery log',span:'Every item in, itemised in real time'},
            {strong:'Photo confirmations',span:'Sent to exhibitors on delivery to stand'},
            {strong:'SMS & email alerts',span:'Exhibitors notified automatically — no chasing'},
            {strong:'Organiser dashboard',span:'Live access to all activity and data exports'},
          ].map(p=>(
            <TrackPill key={p.strong}><strong>{p.strong}</strong><span>{p.span}</span></TrackPill>
          ))}
        </TrackPills>
      </TrackInner>
    </TrackSection>

    {/* CTA */}
    <CtaSection>
      <CtaInner>
        <div>
          <h2 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:'clamp(22px,2.8vw,34px)',color:'#fff',letterSpacing:'-.02em',marginBottom:10}}>Want to know more about what we do?</h2>
          <p style={{fontSize:15,color:'rgba(255,255,255,.38)',lineHeight:1.65,maxWidth:460,margin:0}}>Explore our services — from individual freight bookings to full on-site operations.</p>
        </div>
        <div style={{display:'flex',gap:12,flexShrink:0,flexWrap:'wrap'}}>
          <BtnSolid to="/services/site-services">On-Site Services</BtnSolid>
          <BtnGhost to="/services/freight">Domestic Freight</BtnGhost>
          <BtnGhost to="/services/international-freight">International Freight</BtnGhost>
        </div>
      </CtaInner>
    </CtaSection>
  </>
);

export default AboutPage;
