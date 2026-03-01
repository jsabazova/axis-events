import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { images } from '../../utils/assets';

const SiteServicesWrapper = styled.div`
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
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.spacing['2xl']};
  margin-top: ${({ theme }) => theme.spacing['3xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

const ServiceCard = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing['2xl']};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }

  h3 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.md};
  }

  .number {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    flex-shrink: 0;
  }
`;

const CTASection = styled.section`
  background-color: ${({ theme }) => theme.colors.gray[50]};
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

const EquipmentShowcase = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing['3xl']};
  margin: ${({ theme }) => theme.spacing['3xl']} 0;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing['2xl']};
  }

  .equipment-images {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${({ theme }) => theme.spacing.lg};

    .equipment-item {
      background-color: ${({ theme }) => theme.colors.white};
      padding: ${({ theme }) => theme.spacing.lg};
      border-radius: ${({ theme }) => theme.borderRadius.lg};
      box-shadow: ${({ theme }) => theme.shadows.md};
      text-align: center;

      img {
        width: 100%;
        max-width: 120px;
        height: auto;
        margin-bottom: ${({ theme }) => theme.spacing.md};
      }

      h4 {
        color: ${({ theme }) => theme.colors.primary};
        font-size: ${({ theme }) => theme.fontSizes.sm};
        margin: 0;
      }
    }
  }
`;

const HighlightBox = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing['2xl']};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin: ${({ theme }) => theme.spacing['2xl']} 0;

  h3 {
    color: ${({ theme }) => theme.colors.white};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      padding: ${({ theme }) => theme.spacing.sm} 0;
      position: relative;
      padding-left: ${({ theme }) => theme.spacing.xl};

      &:before {
        content: '✓';
        position: absolute;
        left: 0;
        color: ${({ theme }) => theme.colors.accent};
        font-weight: bold;
      }
    }
  }
`;

const SiteServicesPage: React.FC = () => {
  return (
    <SiteServicesWrapper>
      <HeroSection>
        <div className="container">
          <h1>On-Site Support & Venue Logistics</h1>
          <p style={{ fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto', opacity: 0.9 }}>
            Getting to the venue is only half the job — the real challenge is what happens on the floor.
            Our on-site services ensure your bump-in and bump-out happen seamlessly.
          </p>
        </div>
      </HeroSection>

      <ContentSection>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '1.125rem', lineHeight: '1.7', marginBottom: '2rem' }}>
              At Axis Events, we take complete control of on-site logistics, inward and outward freight,
              and manage any leftover equipment efficiently. Our experienced team ensures everything runs
              smoothly from arrival to departure.
            </p>
          </div>

          <ServicesGrid>
            <ServiceCard>
              <h3>
                <span className="number">1</span>
                Equipment Management
              </h3>
              <p>
                We provide and manage all necessary equipment for your event, including forklifts, cranes,
                elevated work platforms, pallet jacks, and trolleys — tailored to your specific requirements
                and venue constraints.
              </p>
            </ServiceCard>

            <ServiceCard>
              <h3>
                <span className="number">2</span>
                On-Site Teams
              </h3>
              <p>
                Our highly experienced on-site team handles any issues as they arise, providing immediate
                expertise and support. We can provide a small crew or a large team, depending on the scale
                and complexity of your event.
              </p>
            </ServiceCard>

            <ServiceCard>
              <h3>
                <span className="number">3</span>
                Scheduling
              </h3>
              <p>
                With our sophisticated, state-of-the-art scheduling system, we can plan full logistics for
                large shows, ensuring fast unload times, fewer delays on the loading dock, and a smooth,
                streamlined experience for everyone involved.
              </p>
            </ServiceCard>

            <ServiceCard>
              <h3>
                <span className="number">4</span>
                Live Updates & Tracking
              </h3>
              <p>
                Using our live tracking technology, clients and organisers are kept informed in real time
                about all deliveries to the site. Every item is tracked, providing a complete record of
                arrival and handling for peace of mind.
              </p>
            </ServiceCard>

            <ServiceCard>
              <h3>
                <span className="number">5</span>
                Customised Venue Support
              </h3>
              <p>
                We tailor our services to the unique requirements of your venue and event. Whether it's
                a large exhibition hall or a regional show site, we adapt to scale, timeline, and complexity
                to deliver exactly what you need.
              </p>
            </ServiceCard>

            <ServiceCard>
              <h3>
                <span className="number">6</span>
                Safety, Security & Venue Compliance
              </h3>
              <p>
                Safety is our top priority. We ensure materials, people, and the venue are protected,
                strictly following venue protocols and industry best practices. Every operation meets
                or exceeds safety standards.
              </p>
            </ServiceCard>
          </ServicesGrid>

          <EquipmentShowcase>
            <div>
              <h3 style={{ color: '#1F2937', marginBottom: '1.5rem' }}>
                The <span className="green-accent">Green Team</span> Equipment
              </h3>
              <p style={{ fontSize: '1.125rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                Our distinctive green equipment and high-visibility gear make us instantly recognizable
                on any show floor or loading dock. When you see green, you know that's professional
                logistics support you can trust.
              </p>
              <p style={{ fontSize: '1.125rem', lineHeight: '1.7' }}>
                From green pallet jacks to high-vis vests, every piece of our equipment reinforces
                our commitment to being different, visible, and professional in the events industry.
              </p>
            </div>

            <div className="equipment-images">
              <div className="equipment-item">
                <img src={images.equipment.greenVest} alt="Axis Events green high-visibility vest" />
                <h4>Green High-Vis Vests</h4>
              </div>
              <div className="equipment-item">
                <img src={images.equipment.greenCart} alt="Axis Events green moving cart equipment" />
                <h4>Green Equipment</h4>
              </div>
              <div className="equipment-item">
                <img src={images.equipment.limeVest} alt="Axis Events lime green high-visibility vest" />
                <h4>Lime Green Gear</h4>
              </div>
              <div className="equipment-item">
                <img src={images.equipment.limeCart} alt="Axis Events lime green moving equipment" />
                <h4>Branded Tools</h4>
              </div>
            </div>
          </EquipmentShowcase>

          <HighlightBox>
            <h3>Why Choose Axis Events for Site Services?</h3>
            <ul>
              <li>Experienced team with years of on-site event logistics experience</li>
              <li>State-of-the-art scheduling and tracking systems</li>
              <li>Complete equipment management and provision</li>
              <li>Real-time updates and communication</li>
              <li>Strict safety and compliance protocols</li>
              <li>Flexible team sizes to match your event scale</li>
              <li>Customised solutions for unique venue requirements</li>
            </ul>
          </HighlightBox>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <h2>Ready for Seamless Site Operations?</h2>
            <p style={{ fontSize: '1.125rem', maxWidth: '600px', margin: '1rem auto 2rem', lineHeight: '1.7' }}>
              Let our experienced team handle your on-site logistics while you focus on delivering an
              exceptional event experience.
            </p>
          </div>
        </div>
      </ContentSection>

      <CTASection>
        <div className="container">
          <h2 style={{ marginBottom: '1.5rem', color: '#1F2937' }}>Get Started Today</h2>
          <p style={{ fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto 2rem', color: '#4B5563' }}>
            Contact us for a customised quote for your site services needs.
          </p>
          <CTAButton to="/quote">
            Request Site Services Quote
          </CTAButton>
        </div>
      </CTASection>
    </SiteServicesWrapper>
  );
};

export default SiteServicesPage;