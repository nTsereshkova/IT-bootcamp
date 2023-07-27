import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Footer } from '../../components/Footer';
import { Content } from '../../components/Content';
import './Main.css';

const Main = () => {
  const { isError, error, infiniteFetchMode } = useSelector(state => state.main);
  return (
    <div className="main">
      {!isError ? <Content /> : { error }}
      {!infiniteFetchMode && <Footer />} */
    </div>
  );
};
export default Main;
