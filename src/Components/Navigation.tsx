import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Navigation() {
  const liStyle = { marginLeft: '10px', listStyle: 'none' };

  return (
    <div>
      <ul style={{ display: 'flex' }}>
        <Link to="/">
          <li style={liStyle}>Puissance 4</li>
        </Link>
        <Link to="/P4reducer">
          <li style={liStyle}>Puissance 4 reducer</li>
        </Link>
        <Link to="/Mastermind">
          <li style={liStyle}>Mastermind</li>
        </Link>
      </ul>
    </div>
  );
}

export default Navigation;
