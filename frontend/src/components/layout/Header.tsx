import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[100]};
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const HeaderContainer = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.xl};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0 ${({ theme }) => theme.spacing.md};
    height: 70px;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;

  img {
    height: 40px;
    width: auto;
    transition: opacity 0.2s ease;
  }

  &:hover {
    text-decoration: none;

    img {
      opacity: 0.8;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    img {
      height: 32px;
    }
  }
`;

const Nav = styled.nav<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    background-color: ${({ theme }) => theme.colors.white};
    flex-direction: column;
    padding: ${({ theme }) => theme.spacing.xl};
    box-shadow: ${({ theme }) => theme.shadows.lg};
    transform: translateY(${({ isOpen }) => (isOpen ? '0' : '-100%')});
    transition: transform 0.3s ease;
    z-index: 999;
  }
`;

const NavLink = styled(Link)<{ isActive: boolean }>`
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.primary : theme.colors.gray[700]};
  text-decoration: none;
  font-weight: ${({ theme, isActive }) =>
    isActive ? theme.fontWeights.semibold : theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.base};
  transition: color 0.2s ease;
  position: relative;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }

  ${({ isActive, theme }) =>
    isActive && `
      &:after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 0;
        right: 0;
        height: 2px;
        background-color: ${theme.colors.primary};
      }
    `}

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    padding: ${({ theme }) => theme.spacing.md} 0;
  }
`;

const Dropdown = styled.div`
  position: relative;

  &:hover .dropdown-content {
    display: block;
  }
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: ${({ theme }) => theme.colors.white};
  min-width: 250px;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  z-index: 1001;
`;

const DropdownLink = styled(Link)`
  display: block;
  padding: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.gray[700]};
  text-decoration: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[50]};
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }
`;

const QuoteButton = styled(Link)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.base};
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.md};
    text-decoration: none;
    color: ${({ theme }) => theme.colors.white};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  flex-direction: column;
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  span {
    display: block;
    height: 2px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.gray[600]};
    margin: 2px 0;
    transition: all 0.3s ease;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: flex;
  }
`;

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActivePath = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <Logo to="/">
          <img src="/Axis Logo horizontal white background.png" alt="Axis Events Logo" />
        </Logo>

        <Nav isOpen={isMenuOpen}>
          <NavLink to="/" isActive={isActivePath('/')}>
            Home
          </NavLink>

          <NavLink to="/about" isActive={isActivePath('/about')}>
            About
          </NavLink>

          <Dropdown>
            <NavLink to="/services/freight" isActive={isActivePath('/services')}>
              Services
            </NavLink>
            <DropdownContent className="dropdown-content">
              <DropdownLink to="/services/freight">
                Freight Services
              </DropdownLink>
              <DropdownLink to="/services/international-freight">
                International Freight
              </DropdownLink>
              <DropdownLink to="/services/site-services">
                Site Services
              </DropdownLink>
            </DropdownContent>
          </Dropdown>

          <NavLink to="/faq" isActive={isActivePath('/faq')}>
            FAQ
          </NavLink>

          <QuoteButton to="/quote">
            Get Quote
          </QuoteButton>
        </Nav>

        <MobileMenuButton onClick={toggleMenu}>
          <span />
          <span />
          <span />
        </MobileMenuButton>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default Header;