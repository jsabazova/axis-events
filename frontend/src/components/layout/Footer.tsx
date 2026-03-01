import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background-color: ${({ theme }) => theme.colors.gray[900]};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing['3xl']} 0 ${({ theme }) => theme.spacing.xl};
`;

const FooterContainer = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.xl};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing['2xl']};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

const FooterSection = styled.div`
  h4 {
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const FooterLink = styled(Link)`
  display: block;
  color: ${({ theme }) => theme.colors.gray[300]};
  text-decoration: none;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }
`;

const ContactInfo = styled.div`
  p {
    color: ${({ theme }) => theme.colors.gray[300]};
    margin-bottom: ${({ theme }) => theme.spacing.md};

    strong {
      color: ${({ theme }) => theme.colors.white};
    }
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.gray[800]};
  padding-top: ${({ theme }) => theme.spacing.xl};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: ${({ theme }) => theme.colors.gray[400]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin: 0;
`;

const Logo = styled(Link)`
  display: inline-block;
  text-decoration: none;

  img {
    height: 32px;
    width: auto;
    transition: opacity 0.2s ease;
    filter: brightness(0) saturate(100%) invert(1);
  }

  &:hover {
    text-decoration: none;

    img {
      opacity: 0.8;
    }
  }
`;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterWrapper>
      <FooterContainer>
        <FooterContent>
          <FooterSection>
            <Logo to="/">
              <img src="/Axis Logo horizontal white background.png" alt="Axis Events Logo" />
            </Logo>
            <p style={{ color: '#9CA3AF', marginTop: '1rem', lineHeight: '1.6' }}>
              Australia's trusted logistics partner for events, exhibitions, and trade shows.
              Reliable, professional, and focused on making your logistics invisible.
            </p>
          </FooterSection>

          <FooterSection>
            <h4>Services</h4>
            <FooterLink to="/services/freight">Freight Services</FooterLink>
            <FooterLink to="/services/international-freight">International Freight</FooterLink>
            <FooterLink to="/services/site-services">Site Services</FooterLink>
            <FooterLink to="/quote">Get Quote</FooterLink>
          </FooterSection>

          <FooterSection>
            <h4>Company</h4>
            <FooterLink to="/about">About Us</FooterLink>
            <FooterLink to="/faq">FAQ</FooterLink>
            {/* Add more links as needed */}
          </FooterSection>

          <FooterSection>
            <h4>Contact</h4>
            <ContactInfo>
              <p>
                <strong>Email:</strong><br />
                info@axis-events.com.au
              </p>
              <p>
                <strong>Phone:</strong><br />
                +61 (0) 123 456 789
              </p>
              <p>
                <strong>Address:</strong><br />
                Melbourne, Australia
              </p>
            </ContactInfo>
          </FooterSection>
        </FooterContent>

        <FooterBottom>
          <Copyright>
            © {currentYear} Axis Events. All rights reserved.
          </Copyright>
          <div>
            {/* Add social media links or additional footer links here if needed */}
          </div>
        </FooterBottom>
      </FooterContainer>
    </FooterWrapper>
  );
};

export default Footer;