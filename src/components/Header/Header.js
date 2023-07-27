import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { infiniteFetchModeHandler } from '../../store/actions/actions';
import './Header.css';

const Header = () => {
  const { infiniteFetchMode } = useSelector(state => state.main);
  const dispatch = useDispatch();

  return (
    <div className="header">
      <div className="header_info">
        <p> Rick and Morty's funclub </p>
      </div>
      <div className="header_switch">
        <input
          type="checkbox"
          defaultChecked={infiniteFetchMode}
          className="header_switch_input"
          onClick={() => dispatch(infiniteFetchModeHandler())}
        />
        {infiniteFetchMode ? (
          <p> Press to turn off infinite scroll </p>
        ) : (
          <p> Press to turn on infinite scroll </p>
        )}
      </div>
    </div>
  );
};

export default Header;
