import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const InternationalFreightWrapper = styled.div`
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

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: ${({ theme }) => theme.spacing['2xl']};
  margin-top: ${({ theme }) => theme.spacing['3xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

const ServiceCard = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing['2xl']};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border-top: 4px solid ${({ theme }) => theme.colors.primary};
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }

  h3 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: ${({ theme }) => theme.spacing.lg};

  li {
    padding: ${({ theme }) => theme.spacing.sm} 0;
    position: relative;
    padding-left: ${({ theme }) => theme.spacing.xl};

    &:before {
      content: '✈';
      position: absolute;
      left: 0;
      color: ${({ theme }) => theme.colors.primary};
      font-size: ${({ theme }) => theme.fontSizes.lg};
    }

    &.ocean:before {
      content: '🚢';
    }
  }
`;

const BenefitsSection = styled.section`
  background-color: ${({ theme }) => theme.colors.gray[50]};
  padding: ${({ theme }) => theme.spacing['4xl']} 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing['3xl']} 0;
  }
`;

const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing['2xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const BenefitItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};

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

const CTASection = styled.section`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing['4xl']} 0;
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing['3xl']} 0;
  }
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing['2xl']};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  text-decoration: none;
  transition: all 0.2s ease;
  box-shadow: ${({ theme }) => theme.shadows.md};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    text-decoration: none;
    color: ${({ theme }) => theme.colors.white};
  }
`;

const HighlightBox = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing['2xl']};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin: ${({ theme }) => theme.spacing['3xl']} 0;
  text-align: center;

  h3 {
    color: ${({ theme }) => theme.colors.white};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const InternationalFreightPage: React.FC = () => {
  return (
    <InternationalFreightWrapper>
      <HeroSection>
        <div className="container">
          <h1>International Freight</h1>
          <p style={{ fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto', opacity: 0.9 }}>
            Global Event Logistics
          </p>
          <p style={{ fontSize: '1.125rem', maxWidth: '900px', margin: '1.5rem auto 0', opacity: 0.85 }}>
            We specialise in international freight forwarding for exhibitions, trade shows, and live productions.
            Whether it's air freight for urgent shipments or ocean freight for larger containers, we manage
            the entire process to ensure your event materials arrive safely, on time, and in perfect condition.
          </p>
        </div>
      </HeroSection>

      <ContentSection>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2>International Freight Solutions</h2>
            <p style={{ fontSize: '1.125rem', maxWidth: '700px', margin: '1rem auto 0', lineHeight: '1.7' }}>
              From urgent air freight to cost-effective ocean shipping, we provide comprehensive
              international logistics solutions for events worldwide.
            </p>
          </div>

          <ServicesGrid>
            <ServiceCard>
              <h3>Air Freight Services</h3>
              <p style={{ marginBottom: '1.5rem' }}>
                When time is critical and your event materials need to reach their destination quickly,
                our air freight services provide the speed and reliability you need.
              </p>

              <FeatureList>
                <li>Rapid, time-critical delivery anywhere in the world</li>
                <li>Bespoke handling for sensitive or high-value cargo</li>
                <li>Expedited customs clearance and real-time tracking</li>
                <li>Coordinated through our dedicated in-house team and global agent network</li>
                <li>Temperature-controlled options for sensitive materials</li>
                <li>Hand-carry services for extremely urgent or valuable items</li>
              </FeatureList>
            </ServiceCard>

            <ServiceCard>
              <h3>Ocean Freight Services</h3>
              <p style={{ marginBottom: '1.5rem' }}>
                For larger shipments where cost efficiency is important, our ocean freight services
                provide reliable and economical international transport solutions.
              </p>

              <FeatureList>
                <li className="ocean">Full Container Load (FCL) for large shipments</li>
                <li className="ocean">Less Than Container Load (LCL) for smaller consignments</li>
                <li className="ocean">Roll-on/Roll-off (Ro/Ro) for vehicles and mobile displays</li>
                <li className="ocean">Breakbulk options for oversized or unusual cargo</li>
                <li className="ocean">Comprehensive service from booking to final delivery</li>
                <li className="ocean">Tailored shipping strategies for cost efficiency and reliability</li>
              </FeatureList>
            </ServiceCard>
          </ServicesGrid>

          <HighlightBox>
            <h3>Complete International Coverage</h3>
            <p style={{ fontSize: '1.125rem', lineHeight: '1.7', margin: '0' }}>
              Our global network of trusted partners ensures your event materials can reach any destination
              worldwide with the same high standards of service and reliability you expect from Axis Events.
            </p>
          </HighlightBox>
        </div>
      </ContentSection>

      <BenefitsSection>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2>Why Choose Axis Events for International Freight?</h2>
            <p style={{ fontSize: '1.125rem', maxWidth: '700px', margin: '1rem auto 0', lineHeight: '1.7' }}>
              Our expertise in event logistics combined with global partnerships ensures your international
              shipments are handled with the care and professionalism your event deserves.
            </p>
          </div>

          <BenefitsList>
            <BenefitItem>
              <span className="icon">🎯</span>
              <div>
                <strong>Event-industry expertise</strong> — we understand the critical timelines of shows
                and exhibitions, ensuring your materials arrive when and where they need to be.
              </div>
            </BenefitItem>

            <BenefitItem>
              <span className="icon">🌍</span>
              <div>
                <strong>Global network of trusted partners</strong> to reach any destination worldwide
                with consistent service standards and local expertise.
              </div>
            </BenefitItem>

            <BenefitItem>
              <span className="icon">📋</span>
              <div>
                <strong>Attention to detail</strong> in planning, documentation, and cargo handling,
                ensuring compliance with international regulations and customs requirements.
              </div>
            </BenefitItem>

            <BenefitItem>
              <span className="icon">⏰</span>
              <div>
                <strong>Reliable, timely delivery</strong> with complete visibility throughout the journey
                and proactive communication about any changes or delays.
              </div>
            </BenefitItem>

            <BenefitItem>
              <span className="icon">🤝</span>
              <div>
                <strong>Client-focused approach</strong> — our team integrates with your event operations
                to make international logistics seamless and stress-free.
              </div>
            </BenefitItem>

            <BenefitItem>
              <span className="icon">🛡️</span>
              <div>
                <strong>Safe handling of specialised cargo</strong> including oversized displays,
                sensitive equipment, and high-value materials with full insurance coverage.
              </div>
            </BenefitItem>
          </BenefitsList>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <div style={{
              backgroundColor: '#F3F4F6',
              padding: '2rem',
              borderRadius: '1rem',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              <h3 style={{ color: '#1F2937', marginBottom: '1rem' }}>
                International Documentation & Compliance
              </h3>
              <p style={{ color: '#4B5563', lineHeight: '1.7', margin: 0 }}>
                We handle all aspects of international shipping documentation, customs clearance,
                and regulatory compliance. From carnet processing to temporary import permits,
                our experienced team ensures your event materials clear customs smoothly and efficiently.
              </p>
            </div>
          </div>
        </div>
      </BenefitsSection>

      <CTASection>
        <div className="container">
          <h2 style={{ marginBottom: '1.5rem', color: '#1F2937' }}>
            Ready to Move Your Event Materials Internationally?
          </h2>
          <p style={{ fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto 2rem', color: '#4B5563' }}>
            Get a competitive quote for your international freight needs. Air, ocean, or combination
            solutions tailored to your event timeline and budget.
          </p>
          <CTAButton to="/quote">
            Request a Quote
          </CTAButton>
        </div>
      </CTASection>
    </InternationalFreightWrapper>
  );
};

export default InternationalFreightPage;