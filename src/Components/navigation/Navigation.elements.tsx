import styled from 'styled-components';
import { SiElectron } from 'react-icons/si';
import { Link } from 'react-router-dom';
import { Container } from '../styles/globalStyles';
import { device } from '../styles/deviceSizes';
import { color } from '../styles/colors';

export const Nav = styled.nav`
  background: ${color.navigationBar};
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  position: sticky;
  top: 0;
  z-index: 999;
`;

export const NavbarContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  height: 80px;

  ${Container}
`;

export const NavLogo = styled(Link)`
  color: #fff;
  justify-self: flex-start;
  cursor: pointer;
  text-decoration: none;
  font-size: 2rem;
  display: flex;
  align-items: center;
`;

export const NavIcon = styled(SiElectron)`
  margin-right: 0.5rem;
`;

export const MobileIcon = styled.div`
  display: none;

  @media ${device.tablet} {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

interface NavMenuProps {
  click: boolean;
}

export const NavMenu = styled.ul<NavMenuProps>`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;

  @media ${device.tablet} {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 90vh;
    position: absolute;
    top: 80px;
    left: ${({ click }) => (click ? 0 : '-100%')};
    opacity: 1;
    transition: all 0.5s ease;
    background: ${color.navigationBar};
  }
`;

export const NavItem = styled.li`
  height: 80px;
  border-bottom: 2px solid transparent;

  &:hover {
    border-bottom: 2px solid ${color.navButtonBottom};
  }

  @media ${device.tablet} {
    width: 100%;

    &:hover {
      border: none;
    }
  }
`;

export const NavItemBtn = styled.div`
  @media ${device.tablet} {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 120px;
  }
`;

export const NavLinks = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0.5rem 1rem;
  height: 100%;

  @media ${device.tablet} {
    text-align: center;
    padding: 2rem;
    width: 100%;
    display: table;

    &:hover {
      color: ${color.navButtonBottom};
      transition: all 0.3s ease;
    }
  }
`;

export const NavBtnLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  padding: 8px 16px;
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
`;
