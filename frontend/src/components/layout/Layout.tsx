import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
`;

const Main = styled.main`
  flex: 1;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
`;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutWrapper>
      <Header />
      <Main>
        {children}
      </Main>
      <Footer />
    </LayoutWrapper>
  );
};

export default Layout;