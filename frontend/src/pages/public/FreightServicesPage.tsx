import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FreightServicesWrapper = styled.div`
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

const CapabilitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing['2xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const CapabilityCard = styled.div`
  background-color: ${({ theme }) => theme.colors.gray[50]};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  h4 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.fontSizes.lg};
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

const FreightServicesPage: React.FC = () => {
  return (
    <FreightServicesWrapper>
      <HeroSection>
        <div className="container">
          <h1>Freight & Transport Services</h1>
          <p style={{ fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto', opacity: 0.9 }}>
            Event Freight Forwarding Across Australia
          </p>
          <p style={{ fontSize: '1.125rem', maxWidth: '900px', margin: '1.5rem auto 0', opacity: 0.85 }}>
            We specialise in freight forwarding for exhibitions, trade shows, and live productions.
            From small crates and pallets to full shipping containers, we deliver Australia-wide
            with the precision and flexibility your event demands.
          </p>
        </div>
      </HeroSection>

      <ContentSection>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2>Our Capabilities</h2>
            <p style={{ fontSize: '1.125rem', maxWidth: '700px', margin: '1rem auto 0', lineHeight: '1.7' }}>
              From small shipments to large-scale logistics operations, we have the expertise and
              infrastructure to handle your freight forwarding needs.
            </p>
          </div>

          <CapabilitiesGrid>
            <CapabilityCard>
              <h4>Consolidated Transport</h4>
              <p>
                Cost-effective movement of smaller loads between venues. Perfect for multiple exhibitors
                sharing transport costs while maintaining individual shipment tracking and handling.
              </p>
            </CapabilityCard>

            <CapabilityCard>
              <h4>Full Truck Load & Dedicated Vehicles</h4>
              <p>
                For large exhibits, exclusive use, or tight timelines — we handle the entire load with
                dedicated vehicles and drivers committed to your schedule and requirements.
              </p>
            </CapabilityCard>

            <CapabilityCard>
              <h4>Oversize & Specialised Freight</h4>
              <p>
                Large displays, machinery, or display models — we plan for size, weight, and site constraints.
                Our team handles permits, escorts, and specialized equipment as needed.
              </p>
            </CapabilityCard>

            <CapabilityCard>
              <h4>Express & Time-Critical Solutions</h4>
              <p>
                Running late or need urgent re-delivery? Our fast-track options have you covered with
                expedited handling and priority scheduling to meet your deadlines.
              </p>
            </CapabilityCard>

            <CapabilityCard>
              <h4>Customised Forwarding for Events</h4>
              <p>
                From warehousing to last-mile venue delivery, multi-leg transport, and event-specific
                routing — we tailor the logistics chain to your exact needs and timeline.
              </p>
            </CapabilityCard>
          </CapabilitiesGrid>

          <HighlightBox>
            <h3>Complete Australia-Wide Coverage</h3>
            <p style={{ fontSize: '1.125rem', lineHeight: '1.7', margin: '0' }}>
              Our nationwide network covers all major cities and regional venues, ensuring your
              freight reaches its destination safely and on time, wherever your event takes you.
            </p>
          </HighlightBox>
        </div>
      </ContentSection>

      <BenefitsSection>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2>Why Choose Axis Events</h2>
            <p style={{ fontSize: '1.125rem', maxWidth: '700px', margin: '1rem auto 0', lineHeight: '1.7' }}>
              We understand the unique challenges of event logistics and provide solutions
              tailored to the fast-paced exhibition and trade show environment.
            </p>
          </div>

          <BenefitsList>
            <BenefitItem>
              <span className="icon">✓</span>
              <div>
                <strong>Event-industry specialists</strong> who understand bump-in, bump-out,
                show days, and the critical timelines that make or break events.
              </div>
            </BenefitItem>

            <BenefitItem>
              <span className="icon">✓</span>
              <div>
                <strong>Nationwide network</strong> covering all major cities and regional venues
                with trusted partners and reliable service standards.
              </div>
            </BenefitItem>

            <BenefitItem>
              <span className="icon">✓</span>
              <div>
                <strong>Transparent communication</strong> with updates and a dedicated point of
                contact throughout your shipping process.
              </div>
            </BenefitItem>

            <BenefitItem>
              <span className="icon">✓</span>
              <div>
                <strong>Safe, compliant, and professional</strong> handling of your materials,
                displays, and equipment with full insurance coverage.
              </div>
            </BenefitItem>

            <BenefitItem>
              <span className="icon">✓</span>
              <div>
                <strong>Flexible solutions</strong> from same-day express to consolidated shipments,
                tailored to your budget and timeline requirements.
              </div>
            </BenefitItem>

            <BenefitItem>
              <span className="icon">✓</span>
              <div>
                <strong>Real-time tracking</strong> and updates so you always know where your
                freight is and when it will arrive.
              </div>
            </BenefitItem>
          </BenefitsList>
        </div>
      </BenefitsSection>

      <CTASection>
        <div className="container">
          <h2 style={{ marginBottom: '1.5rem', color: '#1F2937' }}>Ready to Move Your Event Freight?</h2>
          <p style={{ fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto 2rem', color: '#4B5563' }}>
            Get a competitive quote for your freight forwarding needs. Fast, reliable,
            and tailored to your event requirements.
          </p>
          <CTAButton to="/quote">
            Request a Quote
          </CTAButton>
        </div>
      </CTASection>
    </FreightServicesWrapper>
  );
};

export default FreightServicesPage;