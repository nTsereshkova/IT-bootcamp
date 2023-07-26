import React from 'react';
import { useSelector } from 'react-redux';
import { Footer } from '../../components/Footer';
import { CharactersList } from '../../components/CharactersList';
import './Main.css';

const Main = () => {
  const { isError, error, infiniteFetchMode } = useSelector(state => state.main);

  return (
    <div className="main">
      {!isError ? (
        <>
          <CharactersList />
        </>
      ) : (
        { error }
      )}

      {!infiniteFetchMode && <Footer />}
    </div>
  );
};
export default Main;
