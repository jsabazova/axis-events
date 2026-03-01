import React from 'react';
import styled from 'styled-components';
import FreightQuoteForm from '../../components/forms/FreightQuoteForm';

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
          <FreightQuoteForm />
        </div>
      </ContentSection>
    </QuoteWrapper>
  );
};

export default QuotePage;