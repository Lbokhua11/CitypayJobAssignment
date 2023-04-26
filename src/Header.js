import React from 'react'
import "./Header.css";
import GiteIcon from '@mui/icons-material/Gite';

import { Link } from 'react-router-dom';
import WifiIcon from '@mui/icons-material/Wifi';
function Header() {
  return (
    <div className='header'>
      <div className='header__left'>
      <img src={require('./images/logo.png')} alt=""/>
      </div>
    
      <div className='header__middle'>
        <div className='header__option'>
        <Link to="/"  className="link-style"><GiteIcon fontSize='large'/></Link>
        </div>
      </div>
      <div className='header__right'>

        <WifiIcon fontSize='large' />
      

      </div>

    </div>
  )
}

export default Header
