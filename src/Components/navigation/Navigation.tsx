import React, { useState } from 'react';
import { IconContext } from 'react-icons';
import { FaBars, FaTimes } from 'react-icons/fa';
import '../../App.css';
import { RoutePath } from '../../Routes';

// eslint-disable-next-line object-curly-newline
import {
  MobileIcon,
  Nav,
  NavbarContainer,
  NavIcon,
  NavItem,
  NavLinks,
  NavLogo,
  NavMenu,
  NavItemBtn,
} from './Navigation.elements';

function Navigation() {
  const [click, setClick] = useState(false);
  const name = "Antho's Lab";
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
          <NavbarContainer>
            <NavLogo to="/" onClick={closeMobileMenu}>
              <NavIcon />
              {name}
            </NavLogo>
            <MobileIcon onClick={handleClick}>{click ? <FaTimes /> : <FaBars />}</MobileIcon>
            <NavMenu onClick={handleClick} click={click}>
              <NavItem>
                <NavLinks to={RoutePath.root}>
                  <NavItemBtn>Puissance 4</NavItemBtn>
                </NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to={RoutePath.p4Multiplayer}>
                  <NavItemBtn>Multiplayer</NavItemBtn>
                </NavLinks>
              </NavItem>
            </NavMenu>
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
}

export default Navigation;
