import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MdExitToApp } from 'react-icons/md';
import { logoutHandler } from '../../store/actions/actions';
import rickLogo from '../../data/rick.png';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <div className="header_info">
        <p> Rick and Morty's funclub </p>
      </div>
      <div className="header_auth">
        <div className="header_auth_user">
          <img className="logoRick" src={rickLogo} alt="rick" />
        </div>
      </div>
    </div>
  );
};

export default Header;
