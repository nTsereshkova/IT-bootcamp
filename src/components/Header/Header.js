import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { infiniteFetchModeHandler } from '../../store/actions/actions';
import rickLogo from '../../data/rick.png';
import './Header.css';

const Header = () => {
  const { infiniteFetchMode } = useSelector(state => state.main);
  const dispatch = useDispatch();

  return (
    <div className="header">
      <div className="header_info">
        <p> Rick and Morty's funclub </p>
      </div>
      <div className="header_auth">
        <div className="header_auth_user">
          <input
            type="checkbox"
            defaultChecked={infiniteFetchMode}
            onClick={() => dispatch(infiniteFetchModeHandler())}
          />
          {infiniteFetchMode ? (
            <p> Press to turn off infinite scroll </p>
          ) : (
            <p> Press to turn on infinite scroll </p>
          )}
        </div>
        <img className="logoRick" src={rickLogo} alt="rick" />
      </div>
    </div>
  );
};

export default Header;
