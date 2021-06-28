import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import NavButton from './styles/NavButton';

function Navigation() {
  const liStyle = { marginLeft: '10px', listStyle: 'none' };

  return (
    <div style={{ display: 'flex', backgroundColor: '#282c34' }}>
      <Link to="/">
        <NavButton style={liStyle}>Puissance 4</NavButton>
      </Link>
      <Link to="/P4reducer">
        <NavButton style={liStyle}>Puissance 4 reducer</NavButton>
      </Link>
      <Link to="/Test">
        <NavButton style={liStyle}>Tests</NavButton>
      </Link>
    </div>
  );
}

export default Navigation;
