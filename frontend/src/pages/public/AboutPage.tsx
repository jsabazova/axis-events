import React from 'react';
import styled from 'styled-components';
import { images } from '../../utils/assets';

const AboutWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.primaryDark} 100%);
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing['4xl']} 0;
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing['3xl']} 0;
  }
`;

const ContentSection = styled.section`
  padding: ${({ theme }) => theme.spacing['4xl']} 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing['3xl']} 0;
  }
`;

const ValueGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing['2xl']};
  margin-top: ${({ theme }) => theme.spacing['3xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

const ValueCard = styled.div`
  background-color: ${({ theme }) => theme.colors.gray[50]};
  padding: ${({ theme }) => theme.spacing['2xl']};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border-left: 4px solid ${({ theme }) => theme.colors.primary};

  h3 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const TeamSection = styled.section`
  background-color: ${({ theme }) => theme.colors.gray[50]};
  padding: ${({ theme }) => theme.spacing['4xl']} 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing['3xl']} 0;
  }
`;

const TeamVisualGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing['3xl']};
  margin-top: ${({ theme }) => theme.spacing['3xl']};
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing['2xl']};
  }

  .team-image {
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    overflow: hidden;
    box-shadow: ${({ theme }) => theme.shadows.lg};

    img {
      width: 100%;
      height: auto;
      display: block;
    }
  }
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing['2xl']};
`;

const TeamMember = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.base};
  text-align: center;

  h4 {
    color: ${({ theme }) => theme.colors.gray[900]};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  .role {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const AboutPage: React.FC = () => {
  return (
    <AboutWrapper>
      <HeroSection>
        <div className="container">
          <h1>About Axis Events</h1>
          <p style={{ fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto', opacity: 0.9 }}>
            Australia's trusted logistics partner for events, exhibitions, and trade shows.
            Built around reliability, clear communication, and a deep understanding of how fast-paced event environments operate.
          </p>
        </div>
      </HeroSection>

      <ContentSection>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <p style={{ fontSize: '1.125rem', lineHeight: '1.7', marginBottom: '2rem' }}>
              Axis Events is an event logistics company specialising in freight, logistics, and on-site support
              for shows, exhibitions, and events across Australia. We're built around reliability, clear communication,
              and a deep understanding of how fast-paced event environments operate.
            </p>

            <p style={{ fontSize: '1.125rem', lineHeight: '1.7' }}>
              Whether it's a last minute shipment needing to clear customs arriving at dawn, specialised freight
              requiring cranes and unique equipment, or time sensitive deliveries — we make sure everything is
              achieved and with minimal stress for our clients.
            </p>
          </div>

          <div style={{ marginTop: '4rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2>Our Mission</h2>
              <p style={{ fontSize: '1.125rem', maxWidth: '700px', margin: '0 auto', lineHeight: '1.7' }}>
                To deliver dependable, professional logistics and site services that help exhibitors and organisers
                focus on what matters most — putting on a great show. We aim to simplify complex logistics, taking
                care of the planning, transport, and on-site support so our clients can concentrate on the creative
                and operational side of their events.
              </p>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2>Our Vision</h2>
              <p style={{ fontSize: '1.125rem', maxWidth: '700px', margin: '0 auto', lineHeight: '1.7' }}>
                To become Australia's most trusted logistics partner in the events and exhibition industry, known
                for reliability, adaptability, and clear communication. We envision a future where every event,
                large or small, is supported by a team that understands the pressures of live operations and can
                respond quickly, efficiently, and safely.
              </p>
            </div>
          </div>

          <ValueGrid>
            <ValueCard>
              <h3>Reliability</h3>
              <p>We do what we say we will. Every promise, every timeline, every commitment is met with unwavering dedication.</p>
            </ValueCard>

            <ValueCard>
              <h3>Communication</h3>
              <p>Clear updates, quick responses, no surprises. We keep you informed every step of the way.</p>
            </ValueCard>

            <ValueCard>
              <h3>Safety</h3>
              <p>Every site, every job, every time. Safety is never compromised in our operations.</p>
            </ValueCard>

            <ValueCard>
              <h3>Teamwork</h3>
              <p>Supporting clients and crew as one team. We're not just service providers, we're partners.</p>
            </ValueCard>

            <ValueCard>
              <h3>Professionalism</h3>
              <p>Consistent standards from the first booking to the final pack down. Excellence in every interaction.</p>
            </ValueCard>
          </ValueGrid>
        </div>
      </ContentSection>

      <TeamSection>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2>What Sets Us Apart</h2>
            <p style={{ fontSize: '1.125rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.7' }}>
              Axis Events was founded by people who've spent years on event sites — loading trucks, managing docks,
              and coordinating crews. We know the challenges first-hand and have built our systems around real-world
              needs: reliability, efficiency, and support that doesn't disappear once the truck leaves.
            </p>
            <p style={{ fontSize: '1.125rem', maxWidth: '800px', margin: '1.5rem auto 0', lineHeight: '1.7' }}>
              We operate across Australia, partnering with trusted carriers, suppliers, and warehousing providers
              to deliver a complete event logistics solution — wherever your next show takes you. Our goal is to
              make logistics invisible to clients, so they feel confident that everything will arrive, be set up,
              and run smoothly — no matter the scale of the event.
            </p>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2>Meet The <span className="green-accent">Green Team</span></h2>
            <p style={{ fontSize: '1.125rem', maxWidth: '700px', margin: '1rem auto 0', lineHeight: '1.7' }}>
              Our distinctive green team is built by people who've spent years on event sites.
              When you see green, you know that's professional logistics expertise you can trust.
            </p>
          </div>

          <TeamVisualGrid>
            <div className="team-image">
              <img src={images.team.working} alt="Axis Events team members in green high-vis discussing logistics" />
            </div>

            <div>
              <h3 style={{ color: '#1F2937', marginBottom: '1.5rem' }}>
                Experience You Can See
              </h3>
              <p style={{ fontSize: '1.125rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                Our team's green high-visibility gear isn't just about safety—it's about instant recognition
                and professional trust. When clients look across a busy loading dock or crowded show floor,
                they immediately know who their logistics team is.
              </p>
              <p style={{ fontSize: '1.125rem', lineHeight: '1.7' }}>
                This visual identity represents our commitment to being different, professional,
                and memorable in an industry where most companies blend into the background.
              </p>
            </div>
          </TeamVisualGrid>

          <TeamGrid>
            <TeamMember>
              <h4>Patrick Gallegos</h4>
              <div className="role">Founder</div>
            </TeamMember>

            <TeamMember>
              <h4>Paul Kenna</h4>
              <div className="role">Director</div>
            </TeamMember>

            <TeamMember>
              <h4>Joanne Law</h4>
              <div className="role">Managing Director</div>
            </TeamMember>

            <TeamMember>
              <h4>Nicole Miller</h4>
              <div className="role">Head of Operations</div>
            </TeamMember>

            <TeamMember>
              <h4>Caitilin Duncan</h4>
              <div className="role">Legal</div>
            </TeamMember>

            <TeamMember>
              <h4>Jamila</h4>
              <div className="role">Digital Lead</div>
            </TeamMember>

            <TeamMember>
              <h4>Dan F</h4>
              <div className="role">Site Operations</div>
            </TeamMember>

            <TeamMember>
              <h4>Andrew McHale</h4>
              <div className="role">Site Operations</div>
            </TeamMember>

            <TeamMember>
              <h4>Ignacio N</h4>
              <div className="role">Site Operations</div>
            </TeamMember>

            <TeamMember>
              <h4>Felipe F</h4>
              <div className="role">Site Operations</div>
            </TeamMember>
          </TeamGrid>
        </div>
      </TeamSection>
    </AboutWrapper>
  );
};

export default AboutPage;