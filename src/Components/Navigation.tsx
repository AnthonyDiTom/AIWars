import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { RoutePath } from '../Routes';
import NavButton from './styles/NavButton';

function Navigation() {
  const liStyle = { marginLeft: '10px', listStyle: 'none' };

  return (
    <div style={{ display: 'flex', backgroundColor: '#282c34' }}>
      <Link to={RoutePath.root}>
        <NavButton style={liStyle}>Puissance 4 |</NavButton>
      </Link>
      <Link to={RoutePath.p4Multiplayer}>
        <NavButton style={liStyle}>Puissance 4 multiplayer |</NavButton>
      </Link>
    </div>
  );
}

export default Navigation;
