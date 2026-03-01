import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HomeWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
`;

const HeroSection = styled.section`
  background:
    linear-gradient(135deg, rgba(168, 229, 51, 0.9) 0%, rgba(139, 198, 32, 0.9) 100%),
    url('/men working photo.png') center/cover;
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing['4xl']} 0;
  text-align: center;
  min-height: 70vh;
  display: flex;
  align-items: center;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(168, 229, 51, 0.85) 0%, rgba(139, 198, 32, 0.85) 100%);
    z-index: 1;
  }

  > * {
    position: relative;
    z-index: 2;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing['3xl']} 0;
    min-height: 60vh;
  }
`;

const HeroContent = styled.div`
  max-width: 900px;
  margin: 0 auto;

  h1 {
    font-size: ${({ theme }) => theme.fontSizes['5xl']};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    color: ${({ theme }) => theme.colors.white};

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.fontSizes['4xl']};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      font-size: ${({ theme }) => theme.fontSizes['3xl']};
    }
  }

  .subtitle {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    margin-bottom: ${({ theme }) => theme.spacing['2xl']};
    opacity: 0.9;
    line-height: 1.6;

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.fontSizes.lg};
    }
  }
`;

const CTAButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing['2xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const PrimaryButton = styled(Link)`
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing['2xl']};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  text-decoration: none;
  transition: all 0.2s ease;
  box-shadow: ${({ theme }) => theme.shadows.md};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }
`;

const SecondaryButton = styled(Link)`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing['2xl']};
  border: 2px solid ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
    text-decoration: none;
  }
`;

const ServicesSection = styled.section`
  padding: ${({ theme }) => theme.spacing['4xl']} 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing['3xl']} 0;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.spacing['2xl']};
  margin-top: ${({ theme }) => theme.spacing['3xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

const ServiceCard = styled(Link)`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing['2xl']};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border-left: 4px solid ${({ theme }) => theme.colors.primary};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    text-decoration: none;
    color: inherit;
  }

  h3 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }

  .learn-more {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    margin-top: ${({ theme }) => theme.spacing.lg};
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const GreenTeamSection = styled.section`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing['4xl']} 0;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing['3xl']} 0;
  }
`;

const TeamImageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing['2xl']};
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing['2xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
  }

  .image-content {
    position: relative;
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

const AboutSection = styled.section`
  background-color: ${({ theme }) => theme.colors.gray[50]};
  padding: ${({ theme }) => theme.spacing['4xl']} 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing['3xl']} 0;
  }
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing['3xl']};
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing['2xl']};
  }
`;

const AboutText = styled.div`
  h2 {
    color: ${({ theme }) => theme.colors.gray[900]};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    line-height: 1.7;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const FeatureList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};

  .icon {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    flex-shrink: 0;
    margin-top: 2px;
  }
`;

const HomePage: React.FC = () => {
  return (
    <HomeWrapper>
      <HeroSection>
        <div className="container">
          <HeroContent>
            <h1>Professional Event Logistics Across Australia</h1>
            <p className="subtitle">
              From freight forwarding to on-site support, we make complex logistics simple
              so you can focus on delivering exceptional events.
            </p>
            <CTAButtons>
              <PrimaryButton to="/quote">
                Get Instant Quote
              </PrimaryButton>
              <SecondaryButton to="/about">
                Learn More
              </SecondaryButton>
            </CTAButtons>
          </HeroContent>
        </div>
      </HeroSection>

      <ServicesSection>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2>Our Services</h2>
            <p style={{ fontSize: '1.125rem', maxWidth: '700px', margin: '1rem auto 0', lineHeight: '1.7' }}>
              Comprehensive logistics solutions tailored for exhibitions, trade shows, and live events.
            </p>
          </div>

          <ServicesGrid>
            <ServiceCard to="/services/freight">
              <h3>Freight Services</h3>
              <p>
                Australia-wide freight forwarding for exhibitions and trade shows. From small crates
                to full shipping containers, we deliver with precision and flexibility.
              </p>
              <div className="learn-more">
                Learn More →
              </div>
            </ServiceCard>

            <ServiceCard to="/services/international-freight">
              <h3>International Freight</h3>
              <p>
                Global logistics solutions with air and ocean freight options. Complete customs
                clearance and documentation handling for worldwide destinations.
              </p>
              <div className="learn-more">
                Learn More →
              </div>
            </ServiceCard>

            <ServiceCard to="/services/site-services">
              <h3>Site Services</h3>
              <p>
                On-site support and venue logistics. Complete equipment management, scheduling,
                and live tracking for seamless bump-in and bump-out operations.
              </p>
              <div className="learn-more">
                Learn More →
              </div>
            </ServiceCard>
          </ServicesGrid>
        </div>
      </ServicesSection>

      <GreenTeamSection>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2>The <span className="green-accent">Green Team</span> Difference</h2>
            <p style={{ fontSize: '1.125rem', maxWidth: '700px', margin: '1rem auto 0', lineHeight: '1.7' }}>
              When you see green across the loading dock or show floor, you know that's your team.
              Professional, different, and easy to spot in the busiest environments.
            </p>
          </div>

          <TeamImageContainer>
            <div>
              <h3 style={{ marginBottom: '1.5rem' }}>Professional Excellence</h3>
              <p style={{ fontSize: '1.125rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                Our team stands out with distinctive green high-visibility gear, making us instantly
                recognizable on busy show floors. This isn't just about visibility—it's about building
                trust and professional recognition.
              </p>
              <ul style={{ listStyle: 'none', padding: '0' }}>
                <li style={{
                  padding: '0.5rem 0',
                  position: 'relative',
                  paddingLeft: '1.5rem',
                  fontSize: '1.1rem'
                }}>
                  <span style={{
                    position: 'absolute',
                    left: '0',
                    color: '#A8E533',
                    fontWeight: 'bold'
                  }}>✓</span>
                  Instantly recognizable green team
                </li>
                <li style={{
                  padding: '0.5rem 0',
                  position: 'relative',
                  paddingLeft: '1.5rem',
                  fontSize: '1.1rem'
                }}>
                  <span style={{
                    position: 'absolute',
                    left: '0',
                    color: '#A8E533',
                    fontWeight: 'bold'
                  }}>✓</span>
                  Professional but not corporate
                </li>
                <li style={{
                  padding: '0.5rem 0',
                  position: 'relative',
                  paddingLeft: '1.5rem',
                  fontSize: '1.1rem'
                }}>
                  <span style={{
                    position: 'absolute',
                    left: '0',
                    color: '#A8E533',
                    fontWeight: 'bold'
                  }}>✓</span>
                  Easy to spot in crowded venues
                </li>
              </ul>
            </div>

            <div className="image-content">
              <img src="/men working in logistics.png" alt="Axis Events green team working at exhibition" />
            </div>
          </TeamImageContainer>
        </div>
      </GreenTeamSection>

      <AboutSection>
        <div className="container">
          <AboutContent>
            <AboutText>
              <h2>Why Choose Axis Events?</h2>
              <p>
                Built by people who've spent years on event sites, we understand the challenges
                first-hand. Our systems are built around real-world needs: reliability,
                efficiency, and support that doesn't disappear once the truck leaves.
              </p>
              <p>
                We operate across Australia with trusted partners to deliver complete event
                logistics solutions — making logistics invisible so you can focus on your event.
              </p>
            </AboutText>

            <FeatureList>
              <FeatureItem>
                <span className="icon">✓</span>
                <div>
                  <strong>Reliability</strong><br />
                  We do what we say we will, every time.
                </div>
              </FeatureItem>

              <FeatureItem>
                <span className="icon">✓</span>
                <div>
                  <strong>Clear Communication</strong><br />
                  Quick responses, no surprises.
                </div>
              </FeatureItem>

              <FeatureItem>
                <span className="icon">✓</span>
                <div>
                  <strong>Safety First</strong><br />
                  Every site, every job, every time.
                </div>
              </FeatureItem>

              <FeatureItem>
                <span className="icon">✓</span>
                <div>
                  <strong>Professional Standards</strong><br />
                  Consistent excellence throughout.
                </div>
              </FeatureItem>
            </FeatureList>
          </AboutContent>
        </div>
      </AboutSection>
    </HomeWrapper>
  );
};

export default HomePage;