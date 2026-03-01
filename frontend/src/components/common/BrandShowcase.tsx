import React from 'react';
import styled from 'styled-components';
import OptimizedImage from './OptimizedImage';

interface BrandShowcaseProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  features?: string[];
  reverse?: boolean;
}

const ShowcaseContainer = styled.div<{ reverse: boolean }>`
  display: grid;
  grid-template-columns: ${({ reverse }) => reverse ? '1fr 1fr' : '1fr 1fr'};
  gap: ${({ theme }) => theme.spacing['3xl']};
  align-items: center;
  margin: ${({ theme }) => theme.spacing['3xl']} 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing['2xl']};
  }

  .content {
    order: ${({ reverse }) => reverse ? 2 : 1};

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      order: 1;
    }
  }

  .image {
    order: ${({ reverse }) => reverse ? 1 : 2};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    overflow: hidden;
    box-shadow: ${({ theme }) => theme.shadows.lg};

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      order: 2;
    }
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
    font-size: 1.1rem;

    &:before {
      content: '✓';
      position: absolute;
      left: 0;
      color: ${({ theme }) => theme.colors.primary};
      font-weight: bold;
    }
  }
`;

const BrandShowcase: React.FC<BrandShowcaseProps> = ({
  title,
  description,
  imageSrc,
  imageAlt,
  features,
  reverse = false
}) => {
  return (
    <ShowcaseContainer reverse={reverse}>
      <div className="content">
        <h3 style={{ marginBottom: '1.5rem', color: '#1F2937' }}>
          {title}
        </h3>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
          {description}
        </p>
        {features && features.length > 0 && (
          <FeatureList>
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </FeatureList>
        )}
      </div>

      <OptimizedImage
        src={imageSrc}
        alt={imageAlt}
        className="image"
        loading="lazy"
      />
    </ShowcaseContainer>
  );
};

export default BrandShowcase;