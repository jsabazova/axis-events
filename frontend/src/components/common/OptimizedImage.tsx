import React, { useState } from 'react';
import styled from 'styled-components';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  style?: React.CSSProperties;
}

const ImageContainer = styled.div<{ isLoaded: boolean }>`
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
    display: block;
    transition: opacity 0.3s ease;
    opacity: ${({ isLoaded }) => (isLoaded ? 1 : 0)};
  }
`;

const LoadingPlaceholder = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.gray[200]} 25%, ${({ theme }) => theme.colors.gray[100]} 50%, ${({ theme }) => theme.colors.gray[200]} 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.3s ease;

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  loading = 'lazy',
  sizes,
  style
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  if (hasError) {
    return (
      <div className={className} style={{ ...style, backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
        <span>Image not available</span>
      </div>
    );
  }

  return (
    <ImageContainer isLoaded={isLoaded} className={className} style={style}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        sizes={sizes}
        onLoad={handleLoad}
        onError={handleError}
      />
      <LoadingPlaceholder isVisible={!isLoaded} />
    </ImageContainer>
  );
};

export default OptimizedImage;