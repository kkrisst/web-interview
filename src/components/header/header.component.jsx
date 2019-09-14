import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../logo.png'

import './header.styles.scss';

const Header = () => {
  return (
    <div className='header'>
      <div className="app-header">
        <div className='hamburger-icon'>
          <FontAwesomeIcon icon="bars" />
        </div>
        <div className='logo-container'>
          <img src={logo} className="app-logo" alt="Babylon Health" />
        </div>
      </div>
    </div>
  )
};

export default Header;