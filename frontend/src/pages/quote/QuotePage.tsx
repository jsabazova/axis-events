import React from 'react';
import styled from 'styled-components';

const QuoteWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.gray[50]};
  min-height: calc(100vh - 80px);
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.primaryDark} 100%);
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing['3xl']} 0;
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing['2xl']} 0;
  }
`;

const ContentSection = styled.section`
  padding: ${({ theme }) => theme.spacing['4xl']} 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing['3xl']} 0;
  }
`;

const QuoteContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  padding: ${({ theme }) => theme.spacing['3xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin: 0 ${({ theme }) => theme.spacing.md};
    padding: ${({ theme }) => theme.spacing['2xl']};
  }
`;

const ComingSoonBanner = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};

  h3 {
    color: ${({ theme }) => theme.colors.white};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const ContactOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing['2xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const ContactCard = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  border: 2px solid ${({ theme }) => theme.colors.gray[200]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  text-align: center;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  .icon {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${({ theme }) => theme.fontSizes.xl};
    margin: 0 auto ${({ theme }) => theme.spacing.lg};
  }

  h4 {
    color: ${({ theme }) => theme.colors.gray[900]};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    font-weight: ${({ theme }) => theme.fontWeights.semibold};

    &:hover {
      text-decoration: underline;
    }
  }
`;

const InfoSection = styled.div`
  background-color: ${({ theme }) => theme.colors.gray[50]};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-top: ${({ theme }) => theme.spacing['2xl']};

  h4 {
    color: ${({ theme }) => theme.colors.gray[900]};
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
        content: '•';
        position: absolute;
        left: 0;
        color: ${({ theme }) => theme.colors.primary};
        font-weight: bold;
      }
    }
  }
`;

const QuotePage: React.FC = () => {
  return (
    <QuoteWrapper>
      <HeroSection>
        <div className="container">
          <h1>Get Your Quote</h1>
          <p style={{ fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto', opacity: 0.9 }}>
            Professional logistics solutions tailored to your event needs
          </p>
        </div>
      </HeroSection>

      <ContentSection>
        <div className="container">
          <QuoteContainer>
            <ComingSoonBanner>
              <h3>Online Quote System Coming Soon!</h3>
              <p>
                We're building an advanced quote system with real-time pricing calculation.
                In the meantime, our team is ready to provide you with a personalized quote.
              </p>
            </ComingSoonBanner>

            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h2>Get Your Quote Today</h2>
              <p style={{ fontSize: '1.125rem', lineHeight: '1.7', color: '#4B5563' }}>
                Contact our team directly for a fast, competitive quote tailored to your specific requirements.
              </p>
            </div>

            <ContactOptions>
              <ContactCard>
                <div className="icon">📧</div>
                <h4>Email Quote</h4>
                <p>Send us your requirements and we'll get back to you within 2 hours during business hours.</p>
                <a href="mailto:info@axis-events.com.au?subject=Quote Request">
                  info@axis-events.com.au
                </a>
              </ContactCard>

              <ContactCard>
                <div className="icon">📞</div>
                <h4>Call for Quote</h4>
                <p>Speak directly with our logistics experts for immediate assistance and quotes.</p>
                <a href="tel:+61123456789">
                  +61 (0) 123 456 789
                </a>
              </ContactCard>
            </ContactOptions>

            <InfoSection>
              <h4>To Help Us Provide an Accurate Quote, Please Include:</h4>
              <ul>
                <li>Pickup location (suburb/address)</li>
                <li>Delivery location (venue/suburb)</li>
                <li>Event dates and timeline requirements</li>
                <li>Approximate volume (cubic meters) and weight</li>
                <li>Type of goods being shipped</li>
                <li>Any special requirements (fragile, oversized, etc.)</li>
                <li>Whether you need on-site services</li>
              </ul>
            </InfoSection>

            <div style={{
              textAlign: 'center',
              marginTop: '2rem',
              padding: '1.5rem',
              backgroundColor: '#F0FDF4',
              borderRadius: '0.5rem',
              border: '1px solid #BBF7D0'
            }}>
              <h4 style={{ color: '#166534', marginBottom: '0.5rem' }}>
                Fast Response Guarantee
              </h4>
              <p style={{ color: '#166534', margin: 0 }}>
                We respond to all quote requests within 2 hours during business hours,
                often much faster for urgent requirements.
              </p>
            </div>
          </QuoteContainer>
        </div>
      </ContentSection>
    </QuoteWrapper>
  );
};

export default QuotePage;